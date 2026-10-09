// Reading & Storytelling Room — Hindi + English stories with narration
// (play / pause / resume / stop / rate), word highlighting during speech,
// vocabulary help, comprehension quiz, and saved progress. Text fallback:
// every story is fully readable without audio; a note appears if TTS missing.
import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { speechSupported } from '../utils/speech';
import { recordLessonCompletion } from '../utils/rewards';

interface StoryQ { q: string; options: string[]; answer: string; }
interface Story {
  id: string; title: string; emoji: string; lang: 'en-IN' | 'hi-IN'; level: 'easy' | 'medium';
  moral: string; words: { w: string; meaning: string }[]; paragraphs: string[]; questions: StoryQ[];
}

const STORIES: Story[] = [
  {
    id: 'st-thirsty-crow', title: 'The Thirsty Crow', emoji: '🐦', lang: 'en-IN', level: 'easy',
    moral: 'Where there is a will, there is a way! Problem-solving works. 🧠',
    words: [{ w: 'parched', meaning: 'very, very thirsty' }, { w: 'pebbles', meaning: 'small stones' }, { w: 'drooped', meaning: 'hung down sadly' }],
    paragraphs: [
      'On a hot summer day, a crow was very thirsty. He flew here and there looking for water.',
      'At last he found a pot with a little water at the bottom. His beak could not reach it!',
      'The clever crow picked up small pebbles and dropped them into the pot, one by one.',
      'Slowly the water rose to the top. The happy crow drank the water and flew away smiling.',
    ],
    questions: [
      { q: 'Why was the crow flying around?', options: ['He was thirsty 💧', 'He was sleeping 😴', 'He was singing 🎵'], answer: 'He was thirsty 💧' },
      { q: 'What did the crow drop into the pot?', options: ['Pebbles 🪨', 'Leaves 🍃', 'Biscuits 🍪'], answer: 'Pebbles 🪨' },
      { q: 'What does the story teach us?', options: ['To give up', 'To think and solve problems 🧠', 'To fly fast'], answer: 'To think and solve problems 🧠' },
    ],
  },
  {
    id: 'st-lion-mouse', title: 'The Lion and the Mouse', emoji: '🦁', lang: 'en-IN', level: 'easy',
    moral: 'Kindness never goes wasted — even small friends can help big! 💛',
    words: [{ w: 'spare', meaning: 'to let go, not hurt' }, { w: 'roared', meaning: 'made a big loud sound' }, { w: 'gnawed', meaning: 'bit and cut with teeth' }],
    paragraphs: [
      'A tiny mouse accidentally woke up a sleeping lion. The lion caught him and roared!',
      '"Please spare me," squeaked the mouse. "Maybe one day I can help you." The lion laughed but let him go.',
      'Days later, the lion got caught in a hunter\'s net. He roared and roared for help.',
      'The little mouse heard him and gnawed through the ropes with his sharp teeth. The lion was free!',
      'From that day, the lion and the mouse were the best of friends.',
    ],
    questions: [
      { q: 'Who helped the lion from the net?', options: ['The mouse 🐭', 'The elephant 🐘', 'The hunter 👱'], answer: 'The mouse 🐭' },
      { q: 'How did the mouse set the lion free?', options: ['By biting the ropes 🪢', 'By asking the hunter', 'By pulling with hands'], answer: 'By biting the ropes 🪢' },
      { q: 'Why did the lion let the mouse go?', options: ['He was kind 💛', 'He was hungry', 'He lost the mouse'], answer: 'He was kind 💛' },
    ],
  },
  {
    id: 'st-pyar-bhediya', title: 'प्यारा भेड़िया 🐺', emoji: '🐺', lang: 'hi-IN', level: 'easy',
    moral: 'सच्ची दोस्ती में कोई छोटा-बड़ा नहीं होता। 🤝',
    words: [{ w: 'उदास', meaning: 'दुखी, खुश नहीं' }, { w: 'झुर्रियाँ', meaning: 'तरंग जैसी लकीरें' }],
    paragraphs: [
      'एक जंगल में एक भेड़िया रहता था। वह बहुत उदास था क्योंकि उसका कोई दोस्त नहीं था।',
      'एक दिन उसने देखा कि एक छोटी गिलहरी पेड़ पर अकेली बैठी है। भेड़िये ने पूछा, "क्या तुम मेरी दोस्त बनोगी?"',
      'गिलहरी मुस्कुराई और बोली, "हाँ!" फिर दोनों ने मिलकर जंगल में आम खेले।',
      'उस दिन के बाद भेड़िया कभी उदास नहीं रहा। सच्चा दोस्त मिल गया था!',
    ],
    questions: [
      { q: 'भेड़िया क्यों उदास था?', options: ['दोस्त नहीं था 🤝', 'भूखा था', 'बीमार था'], answer: 'दोस्त नहीं था 🤝' },
      { q: 'किसने उसकी दोस्त बनना स्वीकार किया?', options: ['गिलहरी 🐿️', 'खरगोश 🐰', 'तोता 🦜'], answer: 'गिलहरी 🐿️' },
    ],
  },
  {
    id: 'st-sachai', title: 'सच की जीत 🌟', emoji: '🌟', lang: 'hi-IN', level: 'medium',
    moral: 'ईमानदारी सबसे अच्छी नीति है! honesty is the best policy ✨',
    words: [{ w: 'इनाम', meaning: 'पुरुस्कार, prize' }, { w: 'परीक्षा', meaning: 'test' }],
    paragraphs: [
      'राजू गरीब लेकिन बहुत ईमानदार लड़का था। एक दिन स्कूल से लौटते समय उसे एक बटुआ मिला।',
      'बटुए में कई पैसे थे। राजू ने सोचा — "इसे खोने वाले को कितनी तकलीफ होगी!"',
      'वह तुरंत बटुआ लेकर पास के पुलिस थाने गया और सबको सच बताया।',
      'अगले दिन स्कूल में राजू की ईमानदारी की बात हुई। प्रधानाध्यापक ने उसे इनाम दिया। सबने तालियाँ बजाई! 👏',
    ],
    questions: [
      { q: 'राजू को रास्ते में क्या मिला?', options: ['बटुआ 👛', 'खिलौना', 'किताब'], answer: 'बटुआ 👛' },
      { q: 'राजू ने बटुआ क्या किया?', options: ['थाने में जमा किया 🏢', 'घर ले गया', 'फेंक दिया'], answer: 'थाने में जमा किया 🏢' },
      { q: 'कहानी का सीख क्या है?', options: ['ईमानदारी सबसे अच्छी ✨', 'तेज़ दौड़ना', 'पैसे बचाना'], answer: 'ईमानदारी सबसे अच्छी ✨' },
    ],
  },
];

export default function StoryRoom({ onBack }: { onBack: () => void }) {
  const [storyId, setStoryId] = useState<string | null>(null);
  const story = useMemo(() => STORIES.find(s => s.id === storyId) || null, [storyId]);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(0.85);
  const [highlight, setHighlight] = useState<number>(-1); // paragraph index being read
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [phase, setPhase] = useState<'read' | 'quiz' | 'done'>('read');

  // Reading progress: which stories were finished (persisted)
  const [readList, setReadList] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('kpz_stories_read') || '[]'); } catch { return []; }
  });
  const markRead = (id: string) => setReadList(l => {
    const n = [...new Set([...l, id])];
    try { localStorage.setItem('kpz_stories_read', JSON.stringify(n)); } catch {}
    return n;
  });
  const doneRef = { list: readList, add: markRead };

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const speakParagraphs = (from: number) => {
    if (!story || !speechSupported()) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    const utts = story.paragraphs.slice(from).map((p, i) => {
      const u = new SpeechSynthesisUtterance(p.replace(/[^\p{L}\p{N}\s.,!?:;'"-]/gu, ''));
      u.lang = story.lang; u.rate;
      u.onstart = () => setHighlight(from + i);
      return u;
    });
    utts[utts.length - 1].onend = () => { setSpeaking(false); setHighlight(-1); };
    utts.forEach(u => { u.rate = rate; window.speechSynthesis.speak(u); });
  };

  const stopSpeak = () => { window.speechSynthesis?.cancel(); setSpeaking(false); setHighlight(-1); };
  const pauseResume = () => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.paused) { window.speechSynthesis.resume(); setSpeaking(true); }
    else if (window.speechSynthesis.speaking) { window.speechSynthesis.pause(); setSpeaking(false); }
    else speakParagraphs(0);
  };

  const startQuiz = () => { stopSpeak(); setPhase('quiz'); setQuizIdx(0); setPicked(null); setCorrect(0); };

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (story && opt === story.questions[quizIdx].answer) { setCorrect(c => c + 1); soundManager.correct(); }
    else soundManager.wrong();
  };
  const nextQ = () => {
    if (!story) return;
    setPicked(null);
    if (quizIdx + 1 < story.questions.length) setQuizIdx(i => i + 1);
    else {
      setPhase('done');
      const pct = Math.round((correct / story.questions.length) * 100);
      recordLessonCompletion(`story-${story.id}`, Math.max(60, pct));
      doneRef.add(story.id);
      soundManager.celebrate();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  // ---------- LIST SCREEN ----------
  if (!story) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => { soundManager.click(); onBack(); }} aria-label="Go back"
            className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">📚 Story Room</h2>
        </div>
        {!speechSupported() && (
          <p className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-sm text-amber-800">🔇 Audio narration isn't available on this device — but every story can still be read below!</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORIES.map(s => (
            <button key={s.id} onClick={() => { soundManager.click(); setStoryId(s.id); setPhase('read'); setHighlight(-1); }}
              className={`text-left rounded-3xl p-5 shadow-lg cursor-pointer active:scale-[0.98] transition-transform ${s.lang === 'hi-IN' ? 'bg-gradient-to-br from-orange-400 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-cyan-500'} text-white`}>
              <div className="text-5xl mb-2">{s.emoji}</div>
              <h3 className="text-xl font-black mb-1">{s.title}</h3>
              <p className="text-white/90 text-sm line-clamp-2">{s.moral}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-black">
                <span className="bg-white/25 rounded-full px-2.5 py-1">{s.level}</span>
                <span className="bg-white/25 rounded-full px-2.5 py-1">{s.lang === 'hi-IN' ? 'हिंदी' : 'English'}</span>
                {doneRef.list.includes(s.id) && <span className="bg-green-500 rounded-full px-2.5 py-1">✅ Read</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---------- READING SCREEN ----------
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => { stopSpeak(); soundManager.click(); setStoryId(null); }} aria-label="Back to stories"
          className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <h2 className="text-xl sm:text-2xl font-black text-gray-800 flex-1">{story.emoji} {story.title}</h2>
      </div>

      {phase === 'read' && (
        <>
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-5 space-y-3 max-h-[46vh] overflow-y-auto">
            {story.paragraphs.map((p, i) => (
              <p key={i} className={`text-base sm:text-lg leading-relaxed rounded-xl px-3 py-2 transition-colors ${highlight === i ? 'bg-yellow-100 ring-2 ring-yellow-300' : ''}`}
                style={{ fontFamily: story.lang === 'hi-IN' ? "'Noto Sans Devanagari', sans-serif" : undefined }}>
                {p.split(' ').map((word, wi) => {
                  const vw = story.words.find(x => p.toLowerCase().includes(x.w.toLowerCase()) && x.w.toLowerCase() === word.toLowerCase().replace(/[^a-zऀ-ॿ]/g, ''));
                  return <span key={wi} className={vw ? 'underline decoration-wavy decoration-purple-400 cursor-help' : ''} title={vw ? `💡 ${vw.meaning}` : undefined}>{word} </span>;
                })}
              </p>
            ))}
          </div>

          {/* Vocabulary */}
          <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-3">
            <p className="font-black text-purple-700 text-sm mb-1">💡 New words:</p>
            <div className="flex flex-wrap gap-2">
              {story.words.map(w => (
                <button key={w.w} onClick={() => { soundManager.click(); if (speechSupported()) { const u = new SpeechSynthesisUtterance(w.w); u.lang = story.lang; window.speechSynthesis.speak(u); } }}
                  className="bg-white rounded-full px-3 py-1.5 text-sm shadow cursor-pointer active:scale-95 transition-transform">
                  <b>{w.w}</b> = {w.meaning} 🔊
                </button>
              ))}
            </div>
          </div>

          {/* Player controls */}
          {speechSupported() && (
            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2 flex-wrap">
              <button onClick={pauseResume} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black cursor-pointer active:scale-95 transition-transform">
                {speaking ? '⏸ Pause' : '▶️ Play / Resume'}
              </button>
              <button onClick={stopSpeak} className="px-4 py-2.5 rounded-xl bg-gray-100 font-black text-gray-700 cursor-pointer active:scale-95 transition-transform">⏹ Stop</button>
              <button onClick={() => { stopSpeak(); speakParagraphs(0); }} className="px-4 py-2.5 rounded-xl bg-sky-100 font-black text-sky-700 cursor-pointer active:scale-95 transition-transform">🔁 Replay</button>
              <label className="ml-auto flex items-center gap-2 text-sm font-bold text-gray-600">
                🐢
                <input type="range" min={0.5} max={1.3} step={0.05} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24 accent-purple-500" aria-label="Narration speed" />
                🐇
              </label>
            </div>
          )}

          <button onClick={startQuiz} className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black text-lg shadow-lg cursor-pointer active:scale-[0.98] transition-transform">
            ❓ Answer the story questions →
          </button>
        </>
      )}

      {phase === 'quiz' && story.questions[quizIdx] && (
        <div className="bg-white rounded-3xl shadow-lg p-5 space-y-4">
          <p className="text-sm font-black text-purple-500">Question {quizIdx + 1} of {story.questions.length}</p>
          <h3 className="text-xl font-black text-gray-800">{story.questions[quizIdx].q}</h3>
          <div className="grid gap-2">
            {story.questions[quizIdx].options.map(o => {
              const isAns = o === story.questions[quizIdx].answer;
              const state = picked ? (isAns ? 'ok' : (o === picked ? 'bad' : 'dim')) : 'idle';
              return (
                <button key={o} onClick={() => pick(o)} disabled={!!picked}
                  className={`py-3.5 px-4 rounded-2xl font-black text-left text-lg cursor-pointer active:scale-[0.99] transition-all ${state === 'ok' ? 'bg-green-500 text-white' : state === 'bad' ? 'bg-red-400 text-white' : state === 'dim' ? 'bg-gray-100 text-gray-400' : 'bg-purple-50 text-gray-800 hover:bg-purple-100'}`}>
                  {o} {state === 'ok' && '✅'} {state === 'bad' && '❌'}
                </button>
              );
            })}
          </div>
          {picked && (
            <button onClick={nextQ} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-lg cursor-pointer active:scale-[0.98] transition-transform">
              {quizIdx + 1 < story.questions.length ? 'Next question →' : 'Finish 🎉'}
            </button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center space-y-3">
          <div className="text-6xl">{correct === story.questions.length ? '🏆' : correct > 0 ? '🌟' : '📖'}</div>
          <h3 className="text-2xl font-black text-gray-800">Great reading, Nitya!</h3>
          <p className="text-gray-600 font-bold">You got {correct}/{story.questions.length} answers right.</p>
          <p className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-amber-800 font-bold">💛 Story lesson: {story.moral}</p>
          <div className="flex gap-2">
            <button onClick={() => { setPhase('read'); setQuizIdx(0); setPicked(null); }} className="flex-1 py-3 rounded-2xl bg-purple-100 font-black text-purple-700 cursor-pointer active:scale-95 transition-transform">🔁 Read again</button>
            <button onClick={() => { soundManager.click(); setStoryId(null); setPhase('read'); }} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black cursor-pointer active:scale-95 transition-transform">📚 More stories</button>
          </div>
        </div>
      )}
    </div>
  );
}
