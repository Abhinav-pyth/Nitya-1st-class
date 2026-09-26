import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { AppState, Page, Subject, Lesson, QuizQuestion, DailyPlan } from './types';
import {
  loadState, saveState, generateDailyPlan, updateProgress,
  getWeaknesses, getSubjectProgress, getLessonsBySubject,
  getGreeting, speak, speakHindi, checkBadges
} from './utils/store';
import { allHindiLessons, hindiSwar, hindiVyanjan, hindiMatras } from './data/hindi';
import { allEnglishLessons, englishVocabulary, speakingConversations } from './data/english';
import { allMathsLessons } from './data/maths';
import { allEvsLessons } from './data/evs';
import { classroomConfig, announcements, assignments, classwork, schedule, upcomingEvents } from './data/classroom';

// Celebration effect
const celebrate = (type: 'small' | 'big' = 'small') => {
  if (type === 'big') {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'] });
  } else {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  }
};

// ==================== MAIN APP ====================
export default function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [page, setPage] = useState<Page>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('hindi');
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [childMode, setChildMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [classroomTab, setClassroomTab] = useState<'stream' | 'classwork' | 'people'>('stream');

  useEffect(() => { saveState(state); }, [state]);
  useEffect(() => { setDailyPlan(generateDailyPlan(state)); }, [state]);

  const updateState = useCallback((newState: AppState) => {
    setState({ ...newState, badges: checkBadges(newState) });
  }, []);

  const completeLesson = (lessonId: string, score: number) => {
    let newState = updateProgress(state, lessonId, score);
    const today = new Date().toISOString().split('T')[0];
    if (state.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      newState = {
        ...newState,
        streak: state.lastActiveDate === yesterday ? state.streak + 1 : 1,
        lastActiveDate: today,
        totalLessonsCompleted: state.totalLessonsCompleted + 1,
      };
    }
    updateState(newState);
    if (score >= 85) celebrate('big');
    else if (score >= 70) celebrate('small');
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setPage('lesson');
  };

  if (childMode) {
    return <ChildModeView state={state} setChildMode={setChildMode} openLesson={openLesson} setPage={setPage} />;
  }

  return (
    <div className="min-h-screen bg-fun-pattern">
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Floating Decorations */}
        <div className="fixed top-20 left-4 text-4xl animate-float opacity-30 pointer-events-none hidden md:block">📚</div>
        <div className="fixed top-40 right-8 text-3xl animate-bounce-slow opacity-30 pointer-events-none hidden md:block">⭐</div>
        <div className="fixed bottom-20 left-8 text-3xl animate-float opacity-30 pointer-events-none hidden md:block">🌈</div>
        <div className="fixed bottom-40 right-4 text-4xl animate-bounce-slow opacity-30 pointer-events-none hidden md:block">🎨</div>

        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-4 border-purple-200">
          <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
            <button onClick={() => setPage('home')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                📚
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Learning Buddy</h1>
                <p className="text-xs text-gray-500 -mt-1">Class 1 • {classroomConfig.schoolName.split(',')[0]}</p>
              </div>
            </button>
            <div className="flex items-center gap-1">
              <NavBtn active={page === 'home'} onClick={() => setPage('home')} emoji="🏠" label="Home" />
              <NavBtn active={page === 'daily'} onClick={() => setPage('daily')} emoji="📅" label="Today" />
              <NavBtn active={page === 'subjects'} onClick={() => setPage('subjects')} emoji="📚" label="Learn" />
              <NavBtn active={page === 'classroom'} onClick={() => setPage('classroom')} emoji="🎓" label="Classroom" />
              <NavBtn active={page === 'progress'} onClick={() => setPage('progress')} emoji="🏆" label="Progress" />
              <button onClick={() => setChildMode(true)} className="ml-1 px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md kid-btn hover:shadow-lg">
                👶 Kid Mode
              </button>
            </div>
          </div>
        </nav>

        {showSettings && <SettingsModal state={state} updateState={updateState} onClose={() => setShowSettings(false)} />}

        <main className="max-w-7xl mx-auto px-3 py-4 md:py-6">
          {page === 'home' && <HomePage state={state} dailyPlan={dailyPlan} setPage={setPage} openLesson={openLesson} />}
          {page === 'daily' && <DailyPlanPage dailyPlan={dailyPlan} state={state} openLesson={openLesson} />}
          {page === 'subjects' && <SubjectsPage selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} state={state} openLesson={openLesson} setPage={setPage} />}
          {page === 'lesson' && selectedLesson && <LessonPage lesson={selectedLesson} state={state} onComplete={completeLesson} onBack={() => setPage('subjects')} />}
          {page === 'progress' && <ProgressPage state={state} setPage={setPage} />}
          {page === 'hindi-write' && <HindiWriterPage state={state} onComplete={completeLesson} onBack={() => setPage('subjects')} />}
          {page === 'quiz' && dailyPlan && <QuizPage questions={dailyPlan.quiz} state={state} onComplete={completeLesson} onBack={() => setPage('home')} />}
          {page === 'matra' && <MatraPage state={state} openLesson={openLesson} onBack={() => setPage('subjects')} />}
          {page === 'speak' && <SpeakPage />}
          {page === 'vocabulary' && <VocabularyPage />}
          {page === 'foundation' && <FoundationPage state={state} openLesson={openLesson} onBack={() => setPage('home')} />}
          {page === 'weekly-report' && <WeeklyReportPage state={state} onBack={() => setPage('progress')} />}
          {page === 'classroom' && <ClassroomPage tab={classroomTab} setTab={setClassroomTab} state={state} openLesson={openLesson} />}
          {page === 'games' && <GamesPage state={state} onComplete={completeLesson} onBack={() => setPage('home')} />}
        </main>
      </div>
    </div>
  );
}

// ==================== NAV BUTTON ====================
function NavBtn({ active, onClick, emoji, label }: { active: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button onClick={onClick} className={`px-2 py-1.5 md:px-3 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${active ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}>
      <span className="mr-1">{emoji}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

// ==================== HOME PAGE ====================
function HomePage({ state, dailyPlan, setPage, openLesson }: { state: AppState; dailyPlan: DailyPlan | null; setPage: (p: Page) => void; openLesson: (l: Lesson) => void }) {
  const greeting = getGreeting();
  const todayProgress = dailyPlan ? Math.round((dailyPlan.lessons.filter(l => state.progress[l.lessonId]?.status === 'mastered').length / Math.max(dailyPlan.lessons.length, 1)) * 100) : 0;
  const hour = new Date().getHours();
  const bgGradient = hour < 12 ? 'from-yellow-300 via-orange-300 to-pink-400' : hour < 17 ? 'from-blue-300 via-cyan-300 to-purple-400' : 'from-indigo-400 via-purple-400 to-pink-500';

  return (
    <div className="space-y-5 animate-slide-in">
      {/* Greeting Card */}
      <div className={`bg-gradient-to-r ${bgGradient} rounded-3xl p-5 md:p-8 text-white shadow-2xl relative overflow-hidden`}>
        <div className="absolute top-2 right-4 text-5xl md:text-7xl animate-bounce-slow opacity-80">
          {hour < 12 ? '🌞' : hour < 17 ? '☀️' : '🌙'}
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black drop-shadow-md">{greeting}! 🌟</h2>
          <p className="text-white/90 mt-1 text-sm md:text-lg">Welcome back, <span className="font-bold">{state.profile.name}</span>! Let's learn something awesome today!</p>
          
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex justify-between text-xs md:text-sm mb-2 font-bold">
              <span>🎯 Today's Progress</span>
              <span>{todayProgress}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
              <div className="progress-fun h-4 rounded-full transition-all duration-1000" style={{ width: `${todayProgress}%` }} />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs md:text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full font-bold">🔥 {state.streak} day streak!</span>
            <span className="bg-white/20 px-3 py-1 rounded-full font-bold">⭐ {state.totalLessonsCompleted} lessons</span>
            <span className="bg-white/20 px-3 py-1 rounded-full font-bold">🏆 {state.badges.filter(b => b.earned).length} badges</span>
          </div>
        </div>
      </div>

      {/* Today's Learning Plan */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-purple-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl animate-wiggle">📅</span>
          <h3 className="text-lg md:text-xl font-black text-gray-800">Today's Learning Adventure</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dailyPlan?.lessons.map((item, i) => (
            <button key={i} onClick={() => {
              const allLessons = [...allHindiLessons, ...allEnglishLessons, ...allMathsLessons, ...allEvsLessons];
              const lesson = allLessons.find(l => l.id === item.lessonId);
              if (lesson) openLesson(lesson);
            }} className="fun-card p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-300 text-left bg-gradient-to-br from-white to-purple-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.subject === 'hindi' ? '✏️' : item.subject === 'maths' ? '🔢' : item.subject === 'english' ? '📖' : '🌱'}</span>
                <span className="font-black text-gray-700 text-sm">{item.subject.toUpperCase()}</span>
                <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{item.duration}m</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{item.topic}</p>
              {state.progress[item.lessonId]?.status === 'mastered' && <span className="text-xs text-green-600 mt-1 font-bold">✅ Done!</span>}
            </button>
          ))}
        </div>
        <button onClick={() => setPage('daily')} className="mt-4 w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl font-black text-lg shadow-lg kid-btn animate-pulse-glow hover:animate-none">
          🚀 START TODAY'S ADVENTURE!
        </button>
      </div>

      {/* Priorities */}
      {dailyPlan && dailyPlan.priorities.length > 0 && (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-5 border-2 border-amber-200 shadow-md">
          <h3 className="text-lg font-black text-amber-800 mb-3 flex items-center gap-2">
            <span className="animate-wiggle">⚡</span> Super Focus Areas
          </h3>
          <div className="space-y-2">
            {dailyPlan.priorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-800 bg-white/60 rounded-xl p-2">
                <span className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-xs font-black text-white">{i + 1}</span>
                <span className="font-bold">{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickAction icon="✍️" label="Hindi Writing" color="from-orange-300 to-red-400" onClick={() => setPage('hindi-write')} />
        <QuickAction icon="📝" label="Matra Practice" color="from-red-300 to-pink-400" onClick={() => setPage('matra')} />
        <QuickAction icon="🗣️" label="Speak English" color="from-blue-300 to-cyan-400" onClick={() => setPage('speak')} />
        <QuickAction icon="📖" label="Vocabulary" color="from-green-300 to-emerald-400" onClick={() => setPage('vocabulary')} />
        <QuickAction icon="🎯" label="Daily Quiz" color="from-purple-300 to-indigo-400" onClick={() => setPage('quiz')} />
        <QuickAction icon="🎓" label="Classroom" color="from-yellow-300 to-orange-400" onClick={() => setPage('classroom')} />
        <QuickAction icon="🎮" label="Fun Games" color="from-pink-300 to-rose-400" onClick={() => setPage('games')} />
        <QuickAction icon="🌟" label="30-Day Plan" color="from-indigo-300 to-purple-400" onClick={() => setPage('foundation')} />
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-blue-100">
        <h3 className="text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
          <span>📆</span> Upcoming at School
        </h3>
        <div className="space-y-2">
          {upcomingEvents.slice(0, 3).map((e, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-blue-50 rounded-xl">
              <span className="text-xl">{e.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-700 text-sm">{e.title}</p>
                <p className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }: { icon: string; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`fun-card bg-gradient-to-br ${color} rounded-2xl p-4 text-center shadow-md kid-btn`}>
      <div className="text-3xl md:text-4xl mb-1 animate-bounce-slow">{icon}</div>
      <div className="text-xs md:text-sm font-black text-white drop-shadow">{label}</div>
    </button>
  );
}

// ==================== DAILY PLAN PAGE ====================
function DailyPlanPage({ dailyPlan, state, openLesson }: { dailyPlan: DailyPlan | null; state: AppState; openLesson: (l: Lesson) => void }) {
  if (!dailyPlan) return <div>Loading...</div>;
  const allLessons = [...allHindiLessons, ...allEnglishLessons, ...allMathsLessons, ...allEvsLessons];

  return (
    <div className="space-y-5 animate-slide-in">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-black">📅 Today's Learning Plan</h2>
        <p className="text-white/90 mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="space-y-3">
        {dailyPlan.lessons.map((item, i) => {
          const lesson = allLessons.find(l => l.id === item.lessonId);
          const progress = state.progress[item.lessonId];
          const colors = ['from-orange-100 to-red-100', 'from-blue-100 to-cyan-100', 'from-green-100 to-emerald-100', 'from-yellow-100 to-orange-100'];
          return (
            <div key={i} className={`bg-gradient-to-r ${colors[i % 4]} rounded-2xl p-4 shadow-md fun-card border-2 border-white`}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{item.subject === 'hindi' ? '✏️' : item.subject === 'maths' ? '🔢' : item.subject === 'english' ? '📖' : '🌱'}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-gray-800">{item.subject.toUpperCase()}</h3>
                    {progress?.status === 'mastered' && <span className="text-green-500">✅</span>}
                    {progress?.status === 'practicing' && <span className="text-yellow-500">🔄</span>}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{item.topic}</p>
                  {lesson && (
                    <div className="mt-2 bg-white/70 rounded-xl p-2">
                      <p className="text-xs font-bold text-gray-600 mb-1">👨‍👩‍👧 Parent Guide:</p>
                      <ul className="text-xs text-gray-700 space-y-0.5">
                        {lesson.parentGuide.slice(0, 2).map((g, j) => <li key={j}>• {g}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
                {lesson && (
                  <button onClick={() => openLesson(lesson)} className="px-4 py-2 bg-white rounded-xl text-sm font-black text-purple-600 shadow kid-btn">
                    Start →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== SUBJECTS PAGE ====================
function SubjectsPage({ selectedSubject, setSelectedSubject, state, openLesson, setPage }: {
  selectedSubject: Subject; setSelectedSubject: (s: Subject) => void; state: AppState; openLesson: (l: Lesson) => void; setPage: (p: Page) => void;
}) {
  const subjects: { id: Subject; name: string; icon: string; color: string; bg: string }[] = [
    { id: 'hindi', name: 'Hindi', icon: '✏️', color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
    { id: 'english', name: 'English', icon: '📖', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
    { id: 'maths', name: 'Maths', icon: '🔢', color: 'from-green-400 to-emerald-500', bg: 'bg-green-50' },
    { id: 'evs', name: 'EVS', icon: '🌱', color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-50' },
    { id: 'safety', name: 'Safety', icon: '🛡️', color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
    { id: 'art', name: 'Art', icon: '🎨', color: 'from-pink-400 to-rose-500', bg: 'bg-pink-50' },
  ];
  const lessons = getLessonsBySubject(selectedSubject);
  const current = subjects.find(s => s.id === selectedSubject)!;

  return (
    <div className="space-y-5 animate-slide-in">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {subjects.map(s => (
          <button key={s.id} onClick={() => setSelectedSubject(s.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap font-black text-sm transition-all kid-btn ${selectedSubject === s.id ? `bg-gradient-to-r ${s.color} text-white shadow-lg scale-105` : 'bg-white text-gray-600 shadow'}`}>
            <span className="text-xl">{s.icon}</span> {s.name}
            <span className="text-xs opacity-80">({getSubjectProgress(state, s.id)}%)</span>
          </button>
        ))}
      </div>

      {selectedSubject === 'hindi' && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setPage('hindi-write')} className="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-xl text-sm font-black shadow kid-btn">✍️ Writing Canvas</button>
          <button onClick={() => setPage('matra')} className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl text-sm font-black shadow kid-btn">📝 Matra Practice</button>
        </div>
      )}
      {selectedSubject === 'english' && (
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setPage('speak')} className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl text-sm font-black shadow kid-btn">🗣️ Speak English</button>
          <button onClick={() => setPage('vocabulary')} className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-xl text-sm font-black shadow kid-btn">📖 Vocabulary</button>
        </div>
      )}

      <div className="space-y-2">
        {lessons.map((lesson, i) => {
          const progress = state.progress[lesson.id];
          return (
            <button key={lesson.id} onClick={() => openLesson(lesson)}
              className="fun-card w-full text-left bg-white rounded-2xl p-4 shadow-md border-2 border-gray-50 hover:border-purple-200 animate-slide-in" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white font-black shadow`}>
                  {progress?.status === 'mastered' ? '⭐' : progress?.status === 'practicing' ? '🔄' : progress?.score ? '📚' : (i + 1)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase">{lesson.unit}</p>
                  <h4 className="font-black text-gray-800">{lesson.title}</h4>
                  <p className="text-xs text-gray-500">{lesson.duration} min • {lesson.difficulty}</p>
                </div>
                {progress && (
                  <div className="text-right">
                    <div className="text-lg font-black text-purple-600">{progress.score}%</div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==================== LESSON PAGE ====================
function LessonPage({ lesson, state, onComplete, onBack }: { lesson: Lesson; state: AppState; onComplete: (id: string, score: number) => void; onBack: () => void }) {
  const [step, setStep] = useState<'learn' | 'practice' | 'quiz' | 'done'>('learn');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState(0);

  const handleAnswer = (qId: string, answer: string) => setAnswers(prev => ({ ...prev, [qId]: answer }));
  const checkAnswer = (q: QuizQuestion) => {
    const isCorrect = (answers[q.id] || '').trim().toLowerCase() === q.answer.trim().toLowerCase();
    setShowResult(prev => ({ ...prev, [q.id]: isCorrect }));
    return isCorrect;
  };
  const submitQuiz = () => {
    let correct = 0;
    lesson.questions.forEach(q => { if (checkAnswer(q)) correct++; });
    const score = Math.round((correct / lesson.questions.length) * 100);
    setQuizScore(score);
    onComplete(lesson.id, score);
    setStep('done');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <div className="flex-1">
          <h2 className="text-xl font-black text-gray-800">{lesson.title}</h2>
          <p className="text-xs text-gray-500">{lesson.unit} • {lesson.duration} min • {lesson.difficulty}</p>
        </div>
      </div>

      <div className="flex gap-1">
        {['learn', 'practice', 'quiz', 'done'].map((s, i) => (
          <div key={s} className={`flex-1 h-2 rounded-full transition-all ${['learn', 'practice', 'quiz', 'done'].indexOf(step) >= i ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 'learn' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4 border-2 border-blue-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce-slow">📖</span>
            <h3 className="text-xl font-black text-blue-700">Let's Learn!</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{lesson.explanation}</p>
          <div className="space-y-2">
            <h4 className="font-black text-gray-700">✨ Examples:</h4>
            {lesson.examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <button onClick={() => speak(ex)} className="text-blue-500 hover:scale-125 transition">🔊</button>
                <span className="text-gray-700 font-medium">{ex}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-black text-gray-700">🎯 Activities:</h4>
            {lesson.activities.map((a, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">{a}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStep('practice')} className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-black text-lg shadow-lg kid-btn">
            Next: Practice →
          </button>
        </div>
      )}

      {step === 'practice' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4 border-2 border-amber-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-wiggle">👨‍👩‍👧</span>
            <h3 className="text-xl font-black text-amber-700">How Parent Should Teach</h3>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
            <ol className="space-y-3">
              {lesson.parentGuide.map((guide, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-400 text-white rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">{i + 1}</span>
                  <span className="text-amber-900 font-medium">{guide}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
            <h4 className="font-black text-blue-800 mb-2">💡 Pro Tips:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>🎯 Keep lessons short and fun</li>
              <li>🧸 Use real objects when possible</li>
              <li>🌟 Praise effort, not just results</li>
              <li>🐢 Don't rush - let the child learn at their pace</li>
            </ul>
          </div>
          <button onClick={() => setStep('quiz')} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-lg kid-btn">
            Next: Quiz Time! 🎯
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4 border-2 border-purple-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce-slow">🎯</span>
            <h3 className="text-xl font-black text-purple-700">Quiz Time!</h3>
          </div>
          {lesson.questions.map((q, i) => (
            <div key={q.id} className="border-2 border-gray-100 rounded-2xl p-4 bg-gradient-to-br from-white to-purple-50">
              <p className="font-black text-gray-800 mb-3 text-lg">Q{i + 1}: {q.question}</p>
              {q.type === 'mcq' && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <button key={j} onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left p-3 rounded-xl border-2 font-medium transition-all kid-btn ${answers[q.id] === opt ? (showResult[q.id] === true ? 'border-green-400 bg-green-50' : showResult[q.id] === false ? 'border-red-400 bg-red-50' : 'border-purple-400 bg-purple-50') : 'border-gray-100 hover:border-purple-200'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {(q.type === 'fill' || q.type === 'write' || q.type === 'oral') && (
                <input type="text" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder="Type your answer..." className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none font-medium" />
              )}
              {showResult[q.id] !== undefined && (
                <p className={`mt-2 text-sm font-black ${showResult[q.id] ? 'text-green-600' : 'text-red-600'}`}>
                  {showResult[q.id] ? '🌟 Correct! Amazing!' : `💪 The answer is: ${q.answer}`}
                </p>
              )}
            </div>
          ))}
          <button onClick={submitQuiz} className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg kid-btn">
            ✅ Submit Answers
          </button>
        </div>
      )}

      {step === 'done' && (
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center space-y-4 border-2 border-green-100 animate-pop-in">
          <div className="text-7xl animate-bounce-slow">{quizScore >= 85 ? '🏆' : quizScore >= 70 ? '🌟' : '💪'}</div>
          <h3 className="text-3xl font-black text-gray-800">
            {quizScore >= 85 ? 'AMAZING!' : quizScore >= 70 ? 'Great Job!' : 'Keep Practicing!'}
          </h3>
          <p className="text-xl text-gray-600">Score: <span className="font-black text-purple-600">{quizScore}%</span></p>
          <div className="flex gap-3 justify-center pt-4">
            <button onClick={onBack} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black kid-btn">← Back</button>
            <button onClick={() => { setStep('learn'); setAnswers({}); setShowResult({}); }} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black kid-btn">Try Again 🔄</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== HINDI WRITER PAGE ====================
function HindiWriterPage({ state, onComplete, onBack }: { state: AppState; onComplete: (id: string, score: number) => void; onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedChar, setSelectedChar] = useState(0);
  const [mode, setMode] = useState<'trace' | 'write'>('trace');
  const [isDrawing, setIsDrawing] = useState(false);
  const chars = [...hindiSwar.slice(0, 5), ...hindiVyanjan.slice(0, 5)];

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    const lineY1 = canvas.height * 0.3;
    const lineY2 = canvas.height * 0.7;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, lineY1); ctx.lineTo(canvas.width, lineY1);
    ctx.moveTo(0, lineY2); ctx.lineTo(canvas.width, lineY2);
    ctx.setLineDash([]);
    ctx.strokeStyle = '#d1d5db';
    ctx.beginPath();
    ctx.moveTo(0, lineY1 - 10); ctx.lineTo(canvas.width, lineY1 - 10);
    ctx.stroke();
    if (mode === 'trace') {
      ctx.font = `${canvas.height * 0.5}px serif`;
      ctx.fillStyle = 'rgba(147, 51, 234, 0.15)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(chars[selectedChar].letter, canvas.width / 2, canvas.height / 2);
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.strokeText(chars[selectedChar].letter, canvas.width / 2, canvas.height / 2);
      ctx.setLineDash([]);
    }
  }, [selectedChar, mode, chars]);

  useEffect(() => { drawGuide(); }, [drawGuide]);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
    ctx.stroke();
  };
  const endDraw = () => setIsDrawing(false);
  const clearCanvas = () => drawGuide();

  const currentChar = chars[selectedChar] as typeof hindiSwar[number];

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">✍️ Hindi Writing Magic</h2>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-5 shadow-lg border-2 border-orange-200">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl flex items-center justify-center text-6xl md:text-7xl font-hindi text-orange-600 shadow-inner animate-bounce-slow">
            {currentChar.letter}
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-black text-orange-800 font-hindi">{currentChar.letter} से {currentChar.word}</h3>
            <p className="text-orange-600 font-medium">{currentChar.emoji} {'meaning' in currentChar ? (currentChar as typeof hindiSwar[number]).meaning : ''}</p>
            <button onClick={() => speakHindi(`${currentChar.letter} से ${currentChar.word}`)} className="mt-2 px-4 py-1.5 bg-white rounded-full text-sm font-bold text-blue-600 shadow kid-btn">
              🔊 Listen
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => { setMode('trace'); clearCanvas(); }} className={`flex-1 py-3 rounded-2xl font-black kid-btn ${mode === 'trace' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'bg-white text-gray-600 shadow'}`}>
          ✏️ Trace
        </button>
        <button onClick={() => { setMode('write'); clearCanvas(); }} className={`flex-1 py-3 rounded-2xl font-black kid-btn ${mode === 'write' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'bg-white text-gray-600 shadow'}`}>
          📝 Free Write
        </button>
        <button onClick={clearCanvas} className="px-4 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-2xl font-black shadow kid-btn">
          🗑️
        </button>
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-lg border-2 border-purple-100">
        <canvas ref={canvasRef} width={600} height={300}
          className="w-full border-2 border-purple-200 rounded-2xl cursor-crosshair touch-none bg-gradient-to-br from-white to-purple-50"
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-lg">
        <h4 className="font-black text-gray-700 mb-3">🎨 Pick a Character:</h4>
        <div className="flex flex-wrap gap-2">
          {chars.map((c, i) => (
            <button key={i} onClick={() => { setSelectedChar(i); setTimeout(clearCanvas, 50); }}
              className={`w-12 h-12 rounded-xl text-xl font-hindi font-bold flex items-center justify-center transition-all kid-btn ${i === selectedChar ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110' : 'bg-gray-100 text-gray-700 hover:bg-purple-100'}`}>
              {c.letter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-4 shadow-lg border-2 border-blue-100">
        <h4 className="font-black text-blue-800 mb-2">Practice Word: <span className="font-hindi text-xl">{currentChar.word}</span></h4>
        <div className="flex gap-4 text-3xl font-hindi text-blue-200">
          <span>{currentChar.word}</span>
          <span>{currentChar.word}</span>
          <span>{currentChar.word}</span>
        </div>
      </div>

      <button onClick={() => { onComplete('hindi_write_' + selectedChar, 80); celebrate('small'); onBack(); }} className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg kid-btn">
        ✅ Done! Great Writing! 🌟
      </button>
    </div>
  );
}

// ==================== MATRA PAGE ====================
function MatraPage({ state, openLesson, onBack }: { state: AppState; openLesson: (l: Lesson) => void; onBack: () => void }) {
  const [selectedMatra, setSelectedMatra] = useState(0);
  const matra = hindiMatras[selectedMatra];

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">📝 Matra Magic</h2>
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {hindiMatras.map((m, i) => (
            <button key={m.id} onClick={() => setSelectedMatra(i)}
              className={`px-3 py-2 rounded-xl text-sm font-black transition-all kid-btn ${i === selectedMatra ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-red-100'}`}>
              <span className="font-hindi">{m.symbol}</span> {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-6 shadow-lg border-2 border-red-100 space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-black text-red-700 font-hindi">{matra.name}</h3>
          <div className="mt-4 flex items-center justify-center gap-3 text-4xl md:text-5xl font-hindi">
            <span className="text-gray-400">{matra.base}</span>
            <span className="text-red-400">+</span>
            <span className="text-red-600 font-black">{matra.symbol}</span>
            <span className="text-red-400">=</span>
            <span className="text-purple-700 font-black animate-pop-in">{matra.result}</span>
          </div>
        </div>

        <div className="bg-white/70 rounded-2xl p-4">
          <h4 className="font-black text-red-800 mb-2">✨ Examples:</h4>
          <div className="flex flex-wrap gap-2 text-2xl font-hindi">
            {matra.examples.map((ex, i) => (
              <button key={i} onClick={() => speakHindi(ex)} className="px-4 py-2 bg-white rounded-xl border-2 border-red-200 hover:bg-red-50 transition kid-btn font-black">
                {ex} 🔊
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/70 rounded-2xl p-4">
          <h4 className="font-black text-purple-800 mb-2">📚 Words:</h4>
          <div className="flex flex-wrap gap-2">
            {matra.words.map((w, i) => (
              <button key={i} onClick={() => speakHindi(w)} className="px-4 py-2 bg-white rounded-xl border-2 border-purple-200 hover:bg-purple-50 transition kid-btn text-lg font-hindi font-bold">
                {w} 🔊
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-200">
          <h4 className="font-black text-amber-800 mb-1">💡 Parent Tip:</h4>
          <p className="text-sm text-amber-700">Show the base letter first, then add the matra. Let the child trace with their finger first. Compare with other matras to avoid confusion.</p>
        </div>
      </div>

      {(() => {
        const relatedLesson = allHindiLessons.find(l => l.topic.includes(matra.name.split(' ')[0]) || l.topic.includes(matra.symbol));
        if (relatedLesson) {
          return (
            <button onClick={() => openLesson(relatedLesson)} className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black shadow-lg kid-btn">
              📚 Open Full Lesson
            </button>
          );
        }
        return null;
      })()}
    </div>
  );
}

// ==================== GOOGLE CLASSROOM PAGE ====================
function ClassroomPage({ tab, setTab, state, openLesson }: { tab: 'stream' | 'classwork' | 'people'; setTab: (t: 'stream' | 'classwork' | 'people') => void; state: AppState; openLesson: (l: Lesson) => void }) {
  return (
    <div className="space-y-5 animate-slide-in">
      {/* Classroom Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">🎓</div>
            <div>
              <h2 className="text-2xl font-black">{classroomConfig.className}</h2>
              <p className="text-white/90 text-sm">{classroomConfig.schoolName}</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">Teacher: {classroomConfig.teacher} • Code: <span className="bg-white/20 px-2 py-0.5 rounded font-mono">{classroomConfig.classCode}</span></p>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {classroomConfig.subjects.map((s, i) => (
          <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 text-white shadow-lg fun-card`}>
            <div className="text-3xl mb-1">{s.emoji}</div>
            <h3 className="font-black text-sm">{s.name}</h3>
            <p className="text-xs text-white/80">{s.teacher}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
        {(['stream', 'classwork', 'people'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-black text-sm capitalize transition-all ${tab === t ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
            {t === 'stream' ? '📢 Stream' : t === 'classwork' ? '📝 Classwork' : '👥 People'}
          </button>
        ))}
      </div>

      {/* Stream */}
      {tab === 'stream' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-blue-400">
            <h3 className="font-black text-gray-800 mb-2">📅 Today's Schedule</h3>
            <div className="flex flex-wrap gap-2">
              {(schedule[new Date().getDay() === 0 ? 5 : new Date().getDay() - 1]?.subjects || []).map((s, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">{s}</span>
              ))}
            </div>
          </div>

          {announcements.map(a => (
            <div key={a.id} className="bg-white rounded-2xl p-4 shadow-md classroom-card border-l-purple-400 fun-card">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-lg shadow">
                  {a.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-gray-800">{a.title}</h4>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{a.subject}</span>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{a.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>{a.teacher}</span>
                    <span>•</span>
                    <span>{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  {a.attachments && (
                    <div className="mt-2 flex gap-2">
                      {a.attachments.map((att, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs font-bold">📎 {att}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Classwork */}
      {tab === 'classwork' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-black text-gray-800 mb-3 text-lg">📋 Assignments</h3>
            <div className="space-y-2">
              {assignments.map(a => (
                <div key={a.id} className="bg-white rounded-2xl p-4 shadow-md fun-card border-l-4 border-purple-400">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{a.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-gray-800">{a.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${a.status === 'graded' ? 'bg-green-100 text-green-700' : a.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {a.status === 'graded' ? `✅ ${a.grade}/${a.points}` : a.status === 'submitted' ? '📤 Submitted' : '⏳ Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{a.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>📅 Due: {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                        <span>⭐ {a.points} pts</span>
                      </div>
                      {a.materials.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {a.materials.map(m => (
                            <span key={m.id} className="px-2 py-1 bg-gray-50 rounded text-xs font-bold">
                              {m.emoji} {m.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-gray-800 mb-3 text-lg">📚 Class Materials</h3>
            <div className="space-y-2">
              {classwork.filter(c => c.type === 'material').map(c => (
                <div key={c.id} className="bg-white rounded-2xl p-4 shadow-md fun-card">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{c.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-800">{c.title}</h4>
                      <p className="text-xs text-gray-500">{c.subject}</p>
                    </div>
                  </div>
                  {c.content && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700 whitespace-pre-line font-hindi">
                      {c.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-gray-800 mb-3 text-lg">🎯 Quizzes</h3>
            <div className="space-y-2">
              {classwork.filter(c => c.type === 'quiz').map(c => (
                <div key={c.id} className="bg-white rounded-2xl p-4 shadow-md fun-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{c.emoji}</div>
                    <div>
                      <h4 className="font-black text-gray-800">{c.title}</h4>
                      <p className="text-xs text-gray-500">{c.description}</p>
                    </div>
                  </div>
                  {c.questions && (
                    <div className="space-y-2">
                      {c.questions.map((q, i) => (
                        <div key={i} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <p className="font-bold text-gray-800 text-sm">{q.q}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {q.options?.map((opt, j) => (
                              <span key={j} className={`px-2 py-1 rounded-lg text-xs font-bold ${opt === q.a ? 'bg-green-100 text-green-700' : 'bg-white text-gray-600'}`}>
                                {opt} {opt === q.a && '✓'}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* People */}
      {tab === 'people' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="font-black text-gray-800 mb-3">👩‍🏫 Teachers</h3>
            <div className="space-y-2">
              {classroomConfig.subjects.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-full flex items-center justify-center text-white shadow`}>
                    {s.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{s.teacher}</p>
                    <p className="text-xs text-gray-500">{s.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="font-black text-gray-800 mb-3">👨‍👩‍👧 Guardians</h3>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl shadow">
                👨‍👩‍👧
              </div>
              <div>
                <p className="font-black text-gray-800">Parent of {state.profile.name}</p>
                <p className="text-xs text-gray-500">Class 1 • Ideal Academy</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
            <p className="text-sm text-amber-800">
              💡 <strong>Note:</strong> This is a simulated view of your Google Classroom. In a real integration, this would connect to your school's actual Google Classroom account with live assignments, grades, and announcements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SPEAK PAGE ====================
function SpeakPage() {
  const [selectedConv, setSelectedConv] = useState(0);
  const conv = speakingConversations[selectedConv];
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">🗣️ Speak English Fun!</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {speakingConversations.map((c, i) => (
          <button key={i} onClick={() => setSelectedConv(i)}
            className={`px-4 py-2 rounded-2xl whitespace-nowrap text-sm font-black kid-btn ${i === selectedConv ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'bg-white text-gray-600 shadow'}`}>
            {c.emoji} {c.title}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-blue-100 space-y-3">
        <h3 className="text-xl font-black text-blue-700">{conv.emoji} {conv.title}</h3>
        {conv.conversations.map((c, i) => (
          <div key={i} className="border-2 border-gray-100 rounded-2xl p-4 space-y-2 bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-black">Q:</span>
              <span className="text-gray-800 font-medium flex-1">{c.q}</span>
              <button onClick={() => speak(c.q)} className="text-blue-500 hover:scale-125 transition">🔊</button>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3 border-2 border-green-200">
              <span className="text-green-600 font-black">A:</span>
              <span className="text-gray-700 font-medium flex-1">{c.a}</span>
              <button onClick={() => speak(c.a)} className="text-green-500 hover:scale-125 transition">🔊</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== VOCABULARY PAGE ====================
function VocabularyPage() {
  const [category, setCategory] = useState<keyof typeof englishVocabulary>('fruits');
  const categories = Object.keys(englishVocabulary) as (keyof typeof englishVocabulary)[];
  const words = englishVocabulary[category];
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={() => window.history.back()} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">📖 Word Magic!</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-2xl whitespace-nowrap text-sm font-black capitalize kid-btn ${c === category ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'bg-white text-gray-600 shadow'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {words.map((w, i) => (
          <button key={i} onClick={() => speak(w.word)}
            className="fun-card bg-white rounded-2xl p-4 text-center shadow-md border-2 border-gray-50 hover:border-green-200">
            <div className="text-4xl mb-2 animate-bounce-slow" style={{ animationDelay: `${i * 100}ms` }}>{w.emoji}</div>
            <div className="font-black text-gray-800">{w.word}</div>
            <div className="text-xs text-gray-500 font-hindi">{w.hindi}</div>
            <div className="mt-2 text-blue-500 text-xs font-bold">🔊 Tap to hear!</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== QUIZ PAGE ====================
function QuizPage({ questions, state, onComplete, onBack }: { questions: QuizQuestion[]; state: AppState; onComplete: (id: string, score: number) => void; onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[current];

  const submit = () => {
    const userAns = (answers[q.id] || '').trim().toLowerCase();
    const correct = q.answer.trim().toLowerCase();
    const isCorrect = userAns === correct;
    if (isCorrect) { setFeedback('🌟 Amazing!'); setScore(s => s + 1); celebrate('small'); }
    else setFeedback(`💪 Answer: ${q.answer}`);
    setTimeout(() => {
      setFeedback(null);
      if (current < questions.length - 1) setCurrent(c => c + 1);
      else {
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
        onComplete('daily_quiz', finalScore);
        setDone(true);
        if (finalScore >= 80) celebrate('big');
      }
    }, 1500);
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 text-center shadow-2xl border-2 border-purple-100 animate-pop-in">
        <div className="text-7xl mb-4 animate-bounce-slow">🎉</div>
        <h2 className="text-3xl font-black text-gray-800">Quiz Complete!</h2>
        <p className="text-xl text-gray-600 mt-2">Score: <span className="font-black text-purple-600">{score}/{questions.length}</span></p>
        <button onClick={onBack} className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black shadow-lg kid-btn">← Back Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">←</button>
        <span className="text-sm font-bold text-gray-500">Question {current + 1} of {questions.length}</span>
      </div>
      <div className="flex gap-1">
        {questions.map((_, i) => (<div key={i} className={`flex-1 h-2 rounded-full ${i <= current ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'}`} />))}
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-purple-100">
        <p className="text-xl font-black text-gray-800 mb-4">{q.question}</p>
        {q.type === 'mcq' && q.options && (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={`w-full text-left p-4 rounded-2xl border-2 font-bold transition-all kid-btn ${answers[q.id] === opt ? 'border-purple-400 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
        {(q.type === 'fill' || q.type === 'write') && (
          <input type="text" value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            placeholder="Type your answer..." className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none font-bold text-lg" />
        )}
        {feedback && <p className={`mt-4 text-center font-black text-xl ${feedback.includes('Amazing') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
        <button onClick={submit} disabled={!answers[q.id]} className="w-full mt-4 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-lg disabled:opacity-50 kid-btn">
          {current < questions.length - 1 ? 'Next →' : 'Finish 🏁'}
        </button>
      </div>
    </div>
  );
}

// ==================== PROGRESS PAGE ====================
function ProgressPage({ state, setPage }: { state: AppState; setPage: (p: Page) => void }) {
  const weaknesses = getWeaknesses(state);
  const accuracy = state.totalQuestionsAnswered > 0 ? Math.round((state.totalCorrectAnswers / state.totalQuestionsAnswered) * 100) : 0;

  return (
    <div className="space-y-5 animate-slide-in">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-3xl p-6 text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2">🏆 Achievement Center</h2>
        <p className="text-white/90 mt-1">Look how much you've learned!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Lessons" value={state.totalLessonsCompleted} icon="📚" color="from-blue-400 to-cyan-400" />
        <StatCard label="Questions" value={state.totalQuestionsAnswered} icon="❓" color="from-green-400 to-emerald-400" />
        <StatCard label="Accuracy" value={`${accuracy}%`} icon="🎯" color="from-purple-400 to-pink-400" />
        <StatCard label="Streak" value={`${state.streak} 🔥`} icon="🔥" color="from-orange-400 to-red-400" />
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-lg">
        <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">📊 Subject Progress</h3>
        <div className="space-y-3">
          {(['hindi', 'english', 'maths', 'evs', 'safety', 'art'] as Subject[]).map(subject => {
            const progress = getSubjectProgress(state, subject);
            const colors: Record<Subject, string> = { hindi: 'from-orange-400 to-red-400', english: 'from-blue-400 to-cyan-400', maths: 'from-green-400 to-emerald-400', evs: 'from-yellow-400 to-orange-400', safety: 'from-purple-400 to-pink-400', art: 'from-pink-400 to-rose-400' };
            const icons: Record<Subject, string> = { hindi: '✏️', english: '📖', maths: '🔢', evs: '🌱', safety: '🛡️', art: '🎨' };
            return (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-black text-gray-700 capitalize">{icons[subject]} {subject}</span>
                  <span className="font-bold text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className={`bg-gradient-to-r ${colors[subject]} h-4 rounded-full transition-all duration-1000 progress-fun`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {weaknesses.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-5 border-2 border-red-200 shadow-lg">
          <h3 className="font-black text-red-800 mb-3 flex items-center gap-2">⚠️ Needs Practice</h3>
          <div className="space-y-2">
            {weaknesses.slice(0, 8).map((w, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl">
                <span className="text-sm text-gray-700 font-medium capitalize">{w.topic}</span>
                <span className="text-xs text-red-600 font-black">{w.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-5 shadow-lg">
        <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">🏅 Badges Earned</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {state.badges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-2xl text-center fun-card ${badge.earned ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-md' : 'bg-gray-50 opacity-50'}`}>
              <div className="text-3xl mb-1">{badge.icon}</div>
              <div className="text-xs font-black text-gray-700">{badge.name}</div>
              {badge.earned && <div className="text-xs text-green-600 mt-1 font-bold">✅ Earned!</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setPage('weekly-report')} className="fun-card bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-2xl p-4 shadow-lg kid-btn">
          <div className="text-2xl mb-1">📈</div>
          <div className="font-black">Weekly Report</div>
        </button>
        <button onClick={() => setPage('foundation')} className="fun-card bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-2xl p-4 shadow-lg kid-btn">
          <div className="text-2xl mb-1">🌟</div>
          <div className="font-black">30-Day Plan</div>
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 shadow-lg text-white fun-card`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs font-bold opacity-90">{label}</div>
    </div>
  );
}

// ==================== FOUNDATION PAGE ====================
function FoundationPage({ state, openLesson, onBack }: { state: AppState; openLesson: (l: Lesson) => void; onBack: () => void }) {
  const weeks = [
    { week: 1, title: 'Foundation Basics', emoji: '🌱', topics: ['Hindi: स्वर writing', 'English: Alphabet + phonics', 'Math: Numbers 1-20', 'EVS: My body'], color: 'from-green-400 to-emerald-400' },
    { week: 2, title: 'Building Up', emoji: '🌿', topics: ['Hindi: व्यंजन', 'English: Vocabulary + sentences', 'Math: Addition', 'EVS: Family + school'], color: 'from-blue-400 to-cyan-400' },
    { week: 3, title: 'Growing Skills', emoji: '🌳', topics: ['Hindi: Matras', 'English: Reading + grammar', 'Math: Subtraction + tables', 'EVS: Plants + animals'], color: 'from-purple-400 to-pink-400' },
    { week: 4, title: 'Mastery', emoji: '🌟', topics: ['Hindi: Words + sentences', 'English: Speaking + writing', 'Math: Mixed practice', 'EVS: Water + weather + safety'], color: 'from-orange-400 to-red-400' },
  ];
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">🌟 30-Day Foundation Booster</h2>
      </div>
      {weeks.map(w => (
        <div key={w.week} className={`bg-gradient-to-r ${w.color} rounded-3xl p-5 shadow-lg text-white fun-card`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">{w.emoji}</div>
            <div>
              <h3 className="text-lg font-black">Week {w.week}: {w.title}</h3>
              <p className="text-white/80 text-xs">Days {(w.week - 1) * 7 + 1}-{w.week * 7}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {w.topics.map((t, i) => (
              <div key={i} className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-xs font-bold">{t}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==================== WEEKLY REPORT ====================
function WeeklyReportPage({ state, onBack }: { state: AppState; onBack: () => void }) {
  const accuracy = state.totalQuestionsAnswered > 0 ? Math.round((state.totalCorrectAnswers / state.totalQuestionsAnswered) * 100) : 0;
  const weaknesses = getWeaknesses(state);
  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
        <h2 className="text-xl font-black text-gray-800">📈 Weekly Report</h2>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-6 text-white shadow-xl">
        <h3 className="text-xl font-black mb-4">This Week's Adventure</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="text-2xl font-black">{state.totalLessonsCompleted}</div>
            <div className="text-xs font-bold opacity-90">Lessons</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="text-2xl font-black">{state.totalQuestionsAnswered}</div>
            <div className="text-xs font-bold opacity-90">Questions</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="text-2xl font-black">{accuracy}%</div>
            <div className="text-xs font-bold opacity-90">Accuracy</div>
          </div>
        </div>
      </div>
      {weaknesses.length > 0 && (
        <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-200">
          <h3 className="font-black text-amber-800 mb-3">⚠️ Focus Areas</h3>
          <div className="space-y-2">
            {weaknesses.slice(0, 5).map((w, i) => (
              <div key={i} className="text-sm text-amber-700 bg-white/60 rounded-xl p-2 font-medium">• {w.topic} ({w.score}%)</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== GAMES PAGE ====================
function GamesPage({ state, onComplete, onBack }: { state: AppState; onComplete: (id: string, score: number) => void; onBack: () => void }) {
  const [game, setGame] = useState<'menu' | 'match' | 'count' | 'spell'>('menu');
  const [gameScore, setGameScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);

  const matchGames = [
    { emoji: '🍎', word: 'Apple' }, { emoji: '🐕', word: 'Dog' }, { emoji: '🏠', word: 'House' },
    { emoji: '☀️', word: 'Sun' }, { emoji: '🐱', word: 'Cat' }, { emoji: '🌳', word: 'Tree' },
  ];

  if (game === 'menu') {
    return (
      <div className="max-w-3xl mx-auto space-y-5 animate-slide-in">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">←</button>
          <h2 className="text-xl font-black text-gray-800">🎮 Fun Games!</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setGame('match')} className="fun-card bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl p-6 text-white shadow-xl kid-btn">
            <div className="text-5xl mb-2 animate-bounce-slow">🎯</div>
            <div className="font-black text-lg">Match Game</div>
            <div className="text-xs opacity-90">Match emoji to word!</div>
          </button>
          <button onClick={() => setGame('count')} className="fun-card bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl p-6 text-white shadow-xl kid-btn">
            <div className="text-5xl mb-2 animate-bounce-slow">🔢</div>
            <div className="font-black text-lg">Counting Fun</div>
            <div className="text-xs opacity-90">Count the objects!</div>
          </button>
          <button onClick={() => setGame('spell')} className="fun-card bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 text-white shadow-xl kid-btn">
            <div className="text-5xl mb-2 animate-bounce-slow">🔤</div>
            <div className="font-black text-lg">Spelling Bee</div>
            <div className="text-xs opacity-90">Spell the words!</div>
          </button>
          <button onClick={() => setGame('match')} className="fun-card bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl p-6 text-white shadow-xl kid-btn">
            <div className="text-5xl mb-2 animate-bounce-slow">✏️</div>
            <div className="font-black text-lg">Hindi Match</div>
            <div className="text-xs opacity-90">Match Hindi words!</div>
          </button>
        </div>
      </div>
    );
  }

  if (game === 'match') {
    const questions = matchGames.slice(0, 5);
    if (currentQ >= questions.length) {
      const score = Math.round((gameScore / questions.length) * 100);
      onComplete('game_match', score);
      return (
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 text-center shadow-2xl animate-pop-in">
          <div className="text-7xl mb-4 animate-bounce-slow">🎉</div>
          <h2 className="text-3xl font-black">Game Complete!</h2>
          <p className="text-xl mt-2">Score: <span className="font-black text-purple-600">{gameScore}/{questions.length}</span></p>
          <button onClick={() => { setGame('menu'); setCurrentQ(0); setGameScore(0); }} className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black kid-btn">Play Again 🔄</button>
        </div>
      );
    }
    const q = questions[currentQ];
    const options = [q.word, ...matchGames.filter(m => m.word !== q.word).slice(0, 2).map(m => m.word)].sort(() => Math.random() - 0.5);
    return (
      <div className="max-w-lg mx-auto space-y-5 animate-slide-in">
        <div className="flex items-center justify-between">
          <button onClick={() => { setGame('menu'); setCurrentQ(0); setGameScore(0); }} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">←</button>
          <span className="font-bold text-gray-500">{currentQ + 1}/{questions.length}</span>
        </div>
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
          <div className="text-8xl mb-4 animate-bounce-slow">{q.emoji}</div>
          <p className="text-xl font-black text-gray-800 mb-6">What is this?</p>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <button key={i} onClick={() => {
                if (opt === q.word) { setGameScore(s => s + 1); celebrate('small'); }
                setCurrentQ(c => c + 1);
              }} className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl font-black text-lg border-2 border-purple-100 hover:border-purple-300 kid-btn">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (game === 'count') {
    const countQuestions = [
      { emoji: '🍎', count: 3 }, { emoji: '⭐', count: 5 }, { emoji: '🐟', count: 4 },
      { emoji: '🌸', count: 7 }, { emoji: '🎈', count: 6 },
    ];
    if (currentQ >= countQuestions.length) {
      const score = Math.round((gameScore / countQuestions.length) * 100);
      onComplete('game_count', score);
      return (
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 text-center shadow-2xl animate-pop-in">
          <div className="text-7xl mb-4 animate-bounce-slow">🎉</div>
          <h2 className="text-3xl font-black">Counting Champion!</h2>
          <p className="text-xl mt-2">Score: <span className="font-black text-purple-600">{gameScore}/{countQuestions.length}</span></p>
          <button onClick={() => { setGame('menu'); setCurrentQ(0); setGameScore(0); }} className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black kid-btn">Play Again 🔄</button>
        </div>
      );
    }
    const q = countQuestions[currentQ];
    const options = [q.count, q.count + 1, Math.max(1, q.count - 1)].sort(() => Math.random() - 0.5);
    return (
      <div className="max-w-lg mx-auto space-y-5 animate-slide-in">
        <div className="flex items-center justify-between">
          <button onClick={() => { setGame('menu'); setCurrentQ(0); setGameScore(0); }} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">←</button>
          <span className="font-bold text-gray-500">{currentQ + 1}/{countQuestions.length}</span>
        </div>
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
          <p className="text-xl font-black text-gray-800 mb-4">Count the {q.emoji}!</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6 text-5xl">
            {Array(q.count).fill(0).map((_, i) => (<span key={i} className="animate-pop-in" style={{ animationDelay: `${i * 100}ms` }}>{q.emoji}</span>))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {options.map((opt, i) => (
              <button key={i} onClick={() => {
                if (opt === q.count) { setGameScore(s => s + 1); celebrate('small'); }
                setCurrentQ(c => c + 1);
              }} className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl font-black text-2xl border-2 border-blue-200 hover:border-blue-400 kid-btn">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ==================== CHILD MODE ====================
function ChildModeView({ state, setChildMode, openLesson, setPage }: { state: AppState; setChildMode: (v: boolean) => void; openLesson: (l: Lesson) => void; setPage: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-4">
      <div className="max-w-lg mx-auto space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-purple-700">🌟 Hi {state.profile.name}!</h1>
          <button onClick={() => setChildMode(false)} className="px-3 py-1.5 bg-white rounded-full text-sm font-bold text-gray-600 shadow kid-btn">👨‍👩‍👧 Parent</button>
        </div>
        <div className="text-center py-6">
          <div className="text-7xl mb-3 animate-bounce-slow">🎉</div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Let's Learn!</h2>
          <p className="text-gray-600 mt-2 font-bold">What do you want to do today?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ChildBtn emoji="🔊" label="Listen" color="from-blue-300 to-cyan-400" onClick={() => speak('Hello! Let us learn something new today!')} />
          <ChildBtn emoji="✏️" label="Write Hindi" color="from-orange-300 to-red-400" onClick={() => { setChildMode(false); setPage('hindi-write'); }} />
          <ChildBtn emoji="🎯" label="Quiz Time" color="from-purple-300 to-pink-400" onClick={() => { setChildMode(false); setPage('quiz'); }} />
          <ChildBtn emoji="🎮" label="Play Games" color="from-green-300 to-emerald-400" onClick={() => { setChildMode(false); setPage('games'); }} />
          <ChildBtn emoji="📖" label="Read Stories" color="from-pink-300 to-rose-400" onClick={() => { setChildMode(false); setPage('subjects'); }} />
          <ChildBtn emoji="🎓" label="Classroom" color="from-yellow-300 to-orange-400" onClick={() => { setChildMode(false); setPage('classroom'); }} />
        </div>
        <div className="bg-white/80 backdrop-blur rounded-3xl p-4 text-center shadow-lg">
          <p className="text-sm font-bold text-gray-600">🔥 Your streak: <span className="text-orange-500 text-lg">{state.streak} days!</span></p>
          <p className="text-xs text-gray-500 mt-1">Keep learning every day!</p>
        </div>
      </div>
    </div>
  );
}

function ChildBtn({ emoji, label, color, onClick }: { emoji: string; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`fun-card bg-gradient-to-br ${color} rounded-3xl p-6 text-center shadow-xl kid-btn`}>
      <div className="text-5xl mb-2 animate-bounce-slow">{emoji}</div>
      <div className="text-lg font-black text-white drop-shadow">{label}</div>
    </button>
  );
}

// ==================== SETTINGS MODAL ====================
function SettingsModal({ state, updateState, onClose }: { state: AppState; updateState: (s: AppState) => void; onClose: () => void }) {
  const [profile, setProfile] = useState(state.profile);
  const save = () => { updateState({ ...state, profile }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-pop-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-800">⚙️ Settings</h2>
          <button onClick={onClose} className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center">✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-black text-gray-700">Child's Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="text-sm font-black text-gray-700">Age</label>
            <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 6 })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="text-sm font-black text-gray-700">School</label>
            <input type="text" value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="text-sm font-black text-gray-700">Daily Study Time (minutes)</label>
            <input type="number" value={profile.dailyStudyMinutes} onChange={(e) => setProfile({ ...profile, dailyStudyMinutes: parseInt(e.target.value) || 70 })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none font-medium" />
          </div>
          <button onClick={save} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black shadow-lg kid-btn">
            Save Settings 💾
          </button>
          <button onClick={() => { if (confirm('Reset all progress? This cannot be undone!')) { localStorage.clear(); window.location.reload(); } }}
            className="w-full py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-100 transition">
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
