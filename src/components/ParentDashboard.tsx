// 👨‍👩‍👧 Parent Dashboard — private area (simple local gate, not for the child flow).
// Shows per-subject completion, accuracy, revision needs, weekly summary, stars,
// badges, time spent, next suggestions, and export/reset controls. All data is
// local-only (localStorage) — nothing is uploaded or exposed.
import { useMemo, useState } from 'react';
import { soundManager } from '../utils/sounds';
import { loadRewards, resetRewards, BADGES, RewardsState } from '../utils/rewards';
import { loadState, getWeaknesses, getSubjectProgress } from '../utils/store';
import { ALL_LESSONS } from '../utils/store';
import { Subject } from '../types';

const SUBJECTS: { key: Subject; name: string; emoji: string }[] = [
  { key: 'hindi', name: 'Hindi', emoji: '✏️' },
  { key: 'english', name: 'English', emoji: '📖' },
  { key: 'maths', name: 'Maths', emoji: '🔢' },
  { key: 'evs', name: 'EVS', emoji: '🌱' },
  { key: 'gk', name: 'GK', emoji: '🌍' },
];

export default function ParentDashboard({ onBack }: { onBack: () => void }) {
  const [unlocked, setUnlocked] = useState(sessionStorage.getItem('kpz_parent_ok') === '1');
  const [answer, setAnswer] = useState('');
  const [question] = useState(() => ({ a: 2 + Math.floor(Math.random() * 7), b: 1 + Math.floor(Math.random() * 6) }));
  const [r, setR] = useState<RewardsState>(() => loadRewards());
  const app = useMemo(() => loadState(), []);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4 text-center">
          <div className="text-5xl">🔒</div>
          <h2 className="text-2xl font-black text-gray-800">Parent Area</h2>
          <p className="text-gray-600 font-bold">Ask a grown-up to answer this:</p>
          <p className="text-xl font-black bg-purple-50 rounded-2xl py-3">What is {question.a} + {question.b}?</p>
          <input value={answer} onChange={e => setAnswer(e.target.value)} inputMode="numeric" placeholder="Answer"
            className="w-full text-center text-2xl font-black py-3 rounded-2xl border-4 border-purple-200 focus:border-purple-400 outline-none" />
          <button onClick={() => {
            if (Number(answer) === question.a + question.b) { sessionStorage.setItem('kpz_parent_ok', '1'); setUnlocked(true); soundManager.correct(); }
            else { soundManager.wrong(); setAnswer(''); }
          }} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-lg cursor-pointer active:scale-[0.98] transition-transform">Unlock 👨‍👩‍👧</button>
          <button onClick={onBack} className="text-gray-400 font-bold cursor-pointer">← Back to app</button>
        </div>
      </div>
    );
  }

  const totalLessons = ALL_LESSONS.length;
  const completedLessons = Object.keys(r.lessonsCompleted).length;
  const accuracy = r.totalActivities > 0 ? undefined : undefined; // placeholder removed below
  const weekAgo = Date.now() - 7 * 86400000;
  const thisWeek = Object.values(r.lessonsCompleted).filter(v => new Date(v.date).getTime() >= weekAgo).length
    + Object.values(r.gameStats).filter(g => g.plays > 0).length;
  const minutes = Math.round((app.totalQuestionsAnswered * 0.5) + completedLessons * 4 + Object.values(r.gameStats).reduce((s, g) => s + g.plays * 3, 0));
  const weaknesses = getWeaknesses(app);
  const nextLesson = ALL_LESSONS.find(l => !r.lessonsCompleted[l.id]);
  const gamePlaysTotal = Object.values(r.gameStats).reduce((s, g) => s + g.plays, 0);

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ rewards: r, progress: app.progress, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const aEl = document.createElement('a');
    aEl.href = url; aEl.download = `nitya-progress-${new Date().toISOString().split('T')[0]}.json`;
    aEl.click(); URL.revokeObjectURL(url);
  };

  const doReset = () => {
    resetRewards();
    try { localStorage.removeItem('class1_learning_buddy'); localStorage.removeItem('kpz_stories_read'); } catch {}
    setR(loadRewards()); setConfirmReset(false); soundManager.click();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => { soundManager.click(); onBack(); }} aria-label="Go back"
          className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 flex-1">👨‍👩‍👧 Parent Dashboard</h2>
        <span className="text-xs font-black bg-indigo-100 text-indigo-700 rounded-full px-3 py-1">local data only 🔐</span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { v: `⭐ ${r.stars}`, l: 'Stars earned' },
          { v: `${completedLessons}/${totalLessons}`, l: 'Lessons done' },
          { v: `${gamePlaysTotal}`, l: 'Game plays' },
          { v: `~${minutes}m`, l: 'Est. learning time' },
        ].map(c => (
          <div key={c.l} className="bg-white rounded-2xl shadow p-4 text-center">
            <div className="text-2xl font-black text-purple-600">{c.v}</div>
            <div className="text-xs font-bold text-gray-500">{c.l}</div>
          </div>
        ))}
      </div>

      {/* Per-subject progress */}
      <div className="bg-white rounded-3xl shadow p-5 space-y-3">
        <h3 className="font-black text-lg text-gray-800">📊 Progress by subject</h3>
        {SUBJECTS.map(s => {
          const pct = getSubjectProgress(app, s.key);
          const doneCount = ALL_LESSONS.filter(l => l.subject === s.key && r.lessonsCompleted[l.id]).length;
          const total = ALL_LESSONS.filter(l => l.subject === s.key).length;
          return (
            <div key={s.key}>
              <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                <span>{s.emoji} {s.name}</span><span>{doneCount}/{total} lessons • mastery {pct}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all" style={{ width: `${Math.max(pct, (doneCount / Math.max(total, 1)) * 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly summary + revision */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-3xl shadow p-5">
          <h3 className="font-black text-lg text-gray-800 mb-2">🗓️ This week</h3>
          <p className="text-4xl font-black text-blue-600">{thisWeek}</p>
          <p className="text-sm font-bold text-gray-500">activities in the last 7 days</p>
          <p className="mt-2 text-sm font-bold text-orange-600">🔥 Current streak: {r.streak} day{r.streak === 1 ? '' : 's'}</p>
        </div>
        <div className="bg-white rounded-3xl shadow p-5">
          <h3 className="font-black text-lg text-gray-800 mb-2">🔁 Needs revision</h3>
          {weaknesses.length === 0 ? (
            <p className="text-sm font-bold text-green-600">No weak topics yet — wonderful! 🌟</p>
          ) : weaknesses.slice(0, 4).map(w => (
            <p key={w.topic} className="text-sm font-bold text-gray-600 mb-1">⚠️ {w.subject}: {w.topic} (score {w.score}%)</p>
          ))}
          {nextLesson && <p className="text-sm font-bold text-purple-600 mt-2">➡️ Suggested next: {nextLesson.title}</p>}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-3xl shadow p-5">
        <h3 className="font-black text-lg text-gray-800 mb-3">🏅 Achievements</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {BADGES.map(b => {
            const earned = r.badges.includes(b.id);
            return (
              <div key={b.id} className={`rounded-2xl p-3 text-center ${earned ? 'bg-amber-50 border-2 border-amber-300' : 'bg-gray-50 opacity-50'}`}>
                <div className="text-3xl">{b.icon}</div>
                <div className="text-xs font-black text-gray-700 mt-1">{b.name}</div>
                <div className="text-[10px] text-gray-500">{b.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data controls */}
      <div className="bg-white rounded-3xl shadow p-5 space-y-3">
        <h3 className="font-black text-lg text-gray-800">🗄️ Learning data</h3>
        <p className="text-xs text-gray-500">All progress is stored only on this device. No account, no ads, no uploads.</p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportData} className="px-4 py-2.5 rounded-xl bg-blue-50 font-black text-blue-700 cursor-pointer active:scale-95 transition-transform">⬇️ Export JSON backup</button>
          {!confirmReset
            ? <button onClick={() => setConfirmReset(true)} className="px-4 py-2.5 rounded-xl bg-red-50 font-black text-red-600 cursor-pointer active:scale-95 transition-transform">🗑️ Reset all progress</button>
            : <div className="flex gap-2 items-center">
                <span className="font-black text-red-600 text-sm">Are you sure?</span>
                <button onClick={doReset} className="px-4 py-2 rounded-xl bg-red-500 text-white font-black cursor-pointer">Yes, reset</button>
                <button onClick={() => setConfirmReset(false)} className="px-4 py-2 rounded-xl bg-gray-100 font-black text-gray-600 cursor-pointer">Cancel</button>
              </div>}
        </div>
      </div>
    </div>
  );
}
