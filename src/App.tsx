import { useState, useEffect, useRef, useCallback } from 'react';
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

// ==================== MAIN APP ====================
export default function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [page, setPage] = useState<Page>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('hindi');
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [childMode, setChildMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const plan = generateDailyPlan(state);
    setDailyPlan(plan);
  }, [state]);

  const updateState = useCallback((newState: AppState) => {
    const checked = { ...newState, badges: checkBadges(newState) };
    setState(checked);
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
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setPage('lesson');
  };

  if (childMode) {
    return <ChildModeView state={state} setPage={setPage} setChildMode={setChildMode} openLesson={openLesson} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-lg font-bold text-purple-700 hidden sm:block">Class 1 Learning Buddy</h1>
            <h1 className="text-lg font-bold text-purple-700 sm:hidden">Learning Buddy</h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <NavBtn active={page === 'home'} onClick={() => setPage('home')}>🏠 Home</NavBtn>
            <NavBtn active={page === 'daily'} onClick={() => setPage('daily')}>📅 Today</NavBtn>
            <NavBtn active={page === 'subjects'} onClick={() => setPage('subjects')}>📚 Subjects</NavBtn>
            <NavBtn active={page === 'progress'} onClick={() => setPage('progress')}>📊 Progress</NavBtn>
            <button onClick={() => setChildMode(true)} className="px-2 py-1 sm:px-3 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium hover:bg-green-200 transition">
              👶 Child Mode
            </button>
            <button onClick={() => setShowSettings(true)} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
              ⚙️
            </button>
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && <SettingsModal state={state} updateState={updateState} onClose={() => setShowSettings(false)} />}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {page === 'home' && <HomePage state={state} dailyPlan={dailyPlan} setPage={setPage} openLesson={openLesson} />}
        {page === 'daily' && <DailyPlanPage dailyPlan={dailyPlan} state={state} openLesson={openLesson} />}
        {page === 'subjects' && <SubjectsPage selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} state={state} openLesson={openLesson} setPage={setPage} />}
        {page === 'lesson' && selectedLesson && <LessonPage lesson={selectedLesson} state={state} onComplete={completeLesson} onBack={() => setPage('subjects')} />}
        {page === 'progress' && <ProgressPage state={state} />}
        {page === 'hindi-write' && <HindiWriterPage state={state} onComplete={completeLesson} onBack={() => setPage('subjects')} />}
        {page === 'quiz' && dailyPlan && <QuizPage questions={dailyPlan.quiz} state={state} onComplete={completeLesson} onBack={() => setPage('home')} />}
        {page === 'matra' && <MatraPage state={state} openLesson={openLesson} onBack={() => setPage('subjects')} />}
        {page === 'speak' && <SpeakPage />}
        {page === 'vocabulary' && <VocabularyPage />}
        {page === 'foundation' && <FoundationPage state={state} openLesson={openLesson} onBack={() => setPage('home')} />}
        {page === 'weekly-report' && <WeeklyReportPage state={state} onBack={() => setPage('progress')} />}
      </main>
    </div>
  );
}

// ==================== NAV BUTTON ====================
function NavBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${active ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
      {children}
    </button>
  );
}

// ==================== HOME PAGE ====================
function HomePage({ state, dailyPlan, setPage, openLesson }: { state: AppState; dailyPlan: DailyPlan | null; setPage: (p: Page) => void; openLesson: (l: Lesson) => void }) {
  const greeting = getGreeting();
  const todayProgress = dailyPlan ? Math.round((dailyPlan.lessons.filter(l => state.progress[l.lessonId]?.status === 'mastered').length / Math.max(dailyPlan.lessons.length, 1)) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold">{greeting}! 🌟</h2>
        <p className="text-purple-100 mt-1">Welcome back, {state.profile.name}! Let's learn something new today!</p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Today's Progress</span>
            <span>{todayProgress}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${todayProgress}%` }} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span>🔥 Streak: {state.streak} days</span>
          <span>•</span>
          <span>⭐ {state.totalLessonsCompleted} lessons done</span>
        </div>
      </div>

      {/* Today's Learning */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📅 Today's Learning Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dailyPlan?.lessons.map((item, i) => (
            <button key={i} onClick={() => {
              const allLessons = [...allHindiLessons, ...allEnglishLessons, ...allMathsLessons, ...allEvsLessons];
              const lesson = allLessons.find(l => l.id === item.lessonId);
              if (lesson) openLesson(lesson);
            }} className="p-4 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{item.subject === 'hindi' ? '✏️' : item.subject === 'maths' ? '➕' : item.subject === 'english' ? '📖' : '🌱'}</span>
                <span className="font-medium text-gray-700 text-sm">{item.subject.toUpperCase()}</span>
                <span className="text-xs text-gray-400 ml-auto">{item.duration} min</span>
              </div>
              <p className="text-xs text-gray-600">{item.topic}</p>
              {state.progress[item.lessonId]?.status === 'mastered' && <span className="text-xs text-green-600 mt-1">✅ Mastered</span>}
            </button>
          ))}
        </div>
        <button onClick={() => setPage('daily')} className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition">
          🚀 START TODAY'S LEARNING
        </button>
      </div>

      {/* Priorities */}
      {dailyPlan && dailyPlan.priorities.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-amber-800 mb-3">⚡ Today's Priorities</h3>
          <div className="space-y-2">
            {dailyPlan.priorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-700">
                <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickAction icon="✍️" label="Hindi Writing" color="bg-orange-100 text-orange-700" onClick={() => setPage('hindi-write')} />
        <QuickAction icon="📝" label="Matra Practice" color="bg-red-100 text-red-700" onClick={() => setPage('matra')} />
        <QuickAction icon="🗣️" label="Speak English" color="bg-blue-100 text-blue-700" onClick={() => setPage('speak')} />
        <QuickAction icon="📖" label="Vocabulary" color="bg-green-100 text-green-700" onClick={() => setPage('vocabulary')} />
        <QuickAction icon="🎯" label="Daily Quiz" color="bg-purple-100 text-purple-700" onClick={() => setPage('quiz')} />
        <QuickAction icon="🌟" label="30-Day Program" color="bg-yellow-100 text-yellow-700" onClick={() => setPage('foundation')} />
        <QuickAction icon="📊" label="Weekly Report" color="bg-indigo-100 text-indigo-700" onClick={() => setPage('weekly-report')} />
        <QuickAction icon="👶" label="Child Mode" color="bg-pink-100 text-pink-700" onClick={() => setPage('home')} />
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }: { icon: string; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`${color} rounded-xl p-4 text-center hover:scale-105 transition-transform`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs font-medium">{label}</div>
    </button>
  );
}

// ==================== DAILY PLAN PAGE ====================
function DailyPlanPage({ dailyPlan, state, openLesson }: { dailyPlan: DailyPlan | null; state: AppState; openLesson: (l: Lesson) => void }) {
  if (!dailyPlan) return <div>Loading...</div>;

  const allLessons = [...allHindiLessons, ...allEnglishLessons, ...allMathsLessons, ...allEvsLessons];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📅 Today's Learning Plan</h2>
        <p className="text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="mt-6 space-y-4">
          {dailyPlan.lessons.map((item, i) => {
            const lesson = allLessons.find(l => l.id === item.lessonId);
            const progress = state.progress[item.lessonId];
            return (
              <div key={i} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.subject === 'hindi' ? '✏️' : item.subject === 'maths' ? '➕' : item.subject === 'english' ? '📖' : '🌱'}</span>
                      <h3 className="font-bold text-gray-800">{item.subject.toUpperCase()}</h3>
                      {progress?.status === 'mastered' && <span className="text-green-500 text-sm">✅</span>}
                      {progress?.status === 'practicing' && <span className="text-yellow-500 text-sm">🔄</span>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.topic}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.activities.map((a, j) => (
                        <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                      ))}
                    </div>
                    {lesson && (
                      <div className="mt-3">
                        <h4 className="text-xs font-bold text-gray-500 uppercase">Parent Guide:</h4>
                        <ul className="mt-1 space-y-1">
                          {lesson.parentGuide.slice(0, 3).map((g, j) => (
                            <li key={j} className="text-xs text-gray-600 flex gap-1"><span>•</span>{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className="text-xs text-gray-400">{item.duration} min</span>
                    {lesson && (
                      <button onClick={() => openLesson(lesson)} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition">
                        Start →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priorities */}
      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-3">⚡ Priority Areas</h3>
        <div className="space-y-2">
          {dailyPlan.priorities.map((p, i) => (
            <div key={i} className="text-sm text-amber-700">{p}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== SUBJECTS PAGE ====================
function SubjectsPage({ selectedSubject, setSelectedSubject, state, openLesson, setPage }: {
  selectedSubject: Subject; setSelectedSubject: (s: Subject) => void; state: AppState; openLesson: (l: Lesson) => void; setPage: (p: Page) => void;
}) {
  const subjects: { id: Subject; name: string; icon: string; color: string }[] = [
    { id: 'hindi', name: 'Hindi', icon: '✏️', color: 'from-orange-400 to-red-400' },
    { id: 'english', name: 'English', icon: '📖', color: 'from-blue-400 to-cyan-400' },
    { id: 'maths', name: 'Maths', icon: '➕', color: 'from-green-400 to-emerald-400' },
    { id: 'evs', name: 'EVS', icon: '🌱', color: 'from-yellow-400 to-orange-400' },
    { id: 'safety', name: 'Safety', icon: '🛡️', color: 'from-purple-400 to-pink-400' },
    { id: 'art', name: 'Art', icon: '🎨', color: 'from-pink-400 to-rose-400' },
  ];

  const lessons = getLessonsBySubject(selectedSubject);

  return (
    <div className="space-y-6">
      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {subjects.map(s => (
          <button key={s.id} onClick={() => setSelectedSubject(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition ${selectedSubject === s.id ? `bg-gradient-to-r ${s.color} text-white shadow-md` : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <span>{s.icon}</span> {s.name}
            <span className="text-xs opacity-75">({getSubjectProgress(state, s.id)}%)</span>
          </button>
        ))}
      </div>

      {/* Special buttons for Hindi */}
      {selectedSubject === 'hindi' && (
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setPage('hindi-write')} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-medium hover:bg-orange-200">✍️ Hindi Writing Canvas</button>
          <button onClick={() => setPage('matra')} className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium hover:bg-red-200">📝 Matra Practice</button>
        </div>
      )}
      {selectedSubject === 'english' && (
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setPage('speak')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-200">🗣️ Speak English</button>
          <button onClick={() => setPage('vocabulary')} className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium hover:bg-green-200">📖 Vocabulary</button>
        </div>
      )}

      {/* Lessons List */}
      <div className="space-y-3">
        {lessons.map(lesson => {
          const progress = state.progress[lesson.id];
          return (
            <button key={lesson.id} onClick={() => openLesson(lesson)}
              className="w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-gray-50 hover:border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400 uppercase">{lesson.unit}</span>
                    {progress?.status === 'mastered' && <span className="text-green-500 text-xs">✅ Mastered</span>}
                    {progress?.status === 'practicing' && <span className="text-yellow-500 text-xs">🔄 Practicing</span>}
                    {progress?.status === 'learning' && <span className="text-blue-500 text-xs">📚 Learning</span>}
                  </div>
                  <h4 className="font-medium text-gray-800 mt-1">{lesson.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{lesson.duration} min • {lesson.difficulty}</p>
                </div>
                <div className="ml-4">
                  {progress ? (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">{progress.score}%</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                      <span className="text-gray-300">—</span>
                    </div>
                  )}
                </div>
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

  const handleAnswer = (qId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const checkAnswer = (q: QuizQuestion) => {
    const userAnswer = (answers[q.id] || '').trim().toLowerCase();
    const correctAnswer = q.answer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    setShowResult(prev => ({ ...prev, [q.id]: isCorrect }));
    return isCorrect;
  };

  const submitQuiz = () => {
    let correct = 0;
    lesson.questions.forEach(q => {
      if (checkAnswer(q)) correct++;
    });
    const score = Math.round((correct / lesson.questions.length) * 100);
    setQuizScore(score);
    onComplete(lesson.id, score);
    setStep('done');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{lesson.title}</h2>
          <p className="text-sm text-gray-500">{lesson.unit} • {lesson.duration} min • {lesson.difficulty}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex gap-2">
        {['learn', 'practice', 'quiz', 'done'].map((s, i) => (
          <div key={s} className={`flex-1 h-2 rounded-full ${['learn', 'practice', 'quiz', 'done'].indexOf(step) >= i ? 'bg-purple-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* LEARN STEP */}
      {step === 'learn' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-800">📖 Learn</h3>
          <p className="text-gray-700 leading-relaxed">{lesson.explanation}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Examples:</h4>
            {lesson.examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <button onClick={() => speak(ex)} className="text-blue-500 hover:text-blue-700">🔊</button>
                <span className="text-gray-700">{ex}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">🎯 Activities:</h4>
            {lesson.activities.map((a, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">{a}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setStep('practice')} className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition">
            Next: Practice →
          </button>
        </div>
      )}

      {/* PRACTICE STEP - Parent Guide */}
      {step === 'practice' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-800">👨‍👩‍👧 How Parent Should Teach</h3>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <ol className="space-y-3">
              {lesson.parentGuide.map((guide, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-amber-800 text-sm">{guide}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Tips:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Keep lessons short and fun</li>
              <li>• Use real objects when possible</li>
              <li>• Praise effort, not just results</li>
              <li>• Don't rush - let the child learn at their pace</li>
            </ul>
          </div>

          <button onClick={() => setStep('quiz')} className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition">
            Next: Quiz →
          </button>
        </div>
      )}

      {/* QUIZ STEP */}
      {step === 'quiz' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-800">🎯 Quiz Time!</h3>
          {lesson.questions.map((q, i) => (
            <div key={q.id} className="border border-gray-100 rounded-xl p-4">
              <p className="font-medium text-gray-800 mb-3">Q{i + 1}: {q.question}</p>
              {q.type === 'mcq' && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <button key={j} onClick={() => handleAnswer(q.id, opt)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition ${answers[q.id] === opt ? (showResult[q.id] === true ? 'border-green-400 bg-green-50' : showResult[q.id] === false ? 'border-red-400 bg-red-50' : 'border-purple-400 bg-purple-50') : 'border-gray-100 hover:border-gray-200'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {(q.type === 'fill' || q.type === 'write') && (
                <input type="text" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder="Type your answer..." className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none" />
              )}
              {q.type === 'oral' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Speak the answer aloud:</p>
                  <button onClick={() => speakHindi(q.question)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">🔊 Listen</button>
                  <input type="text" value={answers[q.id] || ''} onChange={(e) => handleAnswer(q.id, e.target.value)}
                    placeholder="Type or speak..." className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none" />
                </div>
              )}
              {showResult[q.id] !== undefined && (
                <p className={`mt-2 text-sm font-medium ${showResult[q.id] ? 'text-green-600' : 'text-red-600'}`}>
                  {showResult[q.id] ? '✅ Correct! Great job!' : `❌ The answer is: ${q.answer}`}
                </p>
              )}
            </div>
          ))}
          <button onClick={submitQuiz} className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition">
            ✅ Submit Answers
          </button>
        </div>
      )}

      {/* DONE STEP */}
      {step === 'done' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-4">
          <div className="text-6xl">{quizScore >= 85 ? '🌟' : quizScore >= 70 ? '😊' : '💪'}</div>
          <h3 className="text-2xl font-bold text-gray-800">
            {quizScore >= 85 ? 'Excellent!' : quizScore >= 70 ? 'Good Job!' : 'Keep Practicing!'}
          </h3>
          <p className="text-gray-600">Your score: <span className="font-bold text-purple-600">{quizScore}%</span></p>
          <div className="flex gap-3 justify-center">
            <button onClick={onBack} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium">← Back</button>
            <button onClick={() => { setStep('learn'); setAnswers({}); setShowResult({}); }} className="px-6 py-2 bg-purple-500 text-white rounded-xl font-medium">Try Again</button>
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

    // Draw writing lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    const lineY1 = canvas.height * 0.3;
    const lineY2 = canvas.height * 0.7;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, lineY1);
    ctx.lineTo(canvas.width, lineY1);
    ctx.moveTo(0, lineY2);
    ctx.lineTo(canvas.width, lineY2);
    // Top line (shirorekha)
    ctx.setLineDash([]);
    ctx.strokeStyle = '#d1d5db';
    ctx.beginPath();
    ctx.moveTo(0, lineY1 - 10);
    ctx.lineTo(canvas.width, lineY1 - 10);
    ctx.stroke();

    if (mode === 'trace') {
      // Draw dotted character
      ctx.font = `${canvas.height * 0.5}px serif`;
      ctx.fillStyle = 'rgba(147, 51, 234, 0.15)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(chars[selectedChar].letter, canvas.width / 2, canvas.height / 2);

      // Draw outline
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.strokeText(chars[selectedChar].letter, canvas.width / 2, canvas.height / 2);
      ctx.setLineDash([]);
    }
  }, [selectedChar, mode, chars]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

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
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    drawGuide();
  };

  const currentChar = chars[selectedChar] as typeof hindiSwar[number];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">✍️ Hindi Writing Practice</h2>
      </div>

      {/* Character Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-purple-50 rounded-2xl flex items-center justify-center text-5xl font-serif text-purple-700">
            {currentChar.letter}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{currentChar.letter} से {currentChar.word}</h3>
            <p className="text-gray-500">{currentChar.emoji} {'meaning' in currentChar ? (currentChar as typeof hindiSwar[number]).meaning : ''}</p>
            <button onClick={() => speakHindi(`${currentChar.letter} से ${currentChar.word}`)} className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
              🔊 Listen
            </button>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-3">
        <button onClick={() => { setMode('trace'); clearCanvas(); }} className={`flex-1 py-2 rounded-xl font-medium ${mode === 'trace' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
          ✏️ Trace
        </button>
        <button onClick={() => { setMode('write'); clearCanvas(); }} className={`flex-1 py-2 rounded-xl font-medium ${mode === 'write' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
          📝 Write Free
        </button>
        <button onClick={clearCanvas} className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium">
          🗑️ Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <canvas ref={canvasRef} width={600} height={300}
          className="w-full border-2 border-gray-200 rounded-xl cursor-crosshair touch-none"
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
      </div>

      {/* Character Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="font-medium text-gray-700 mb-3">Select Character:</h4>
        <div className="flex flex-wrap gap-2">
          {chars.map((c, i) => (
            <button key={i} onClick={() => { setSelectedChar(i); setTimeout(clearCanvas, 50); }}
              className={`w-12 h-12 rounded-xl text-xl font-serif flex items-center justify-center transition ${i === selectedChar ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {c.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Practice Word */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">Practice Word: {currentChar.word}</h4>
        <div className="flex gap-4 text-3xl font-serif text-gray-300">
          <span>{currentChar.word}</span>
          <span>{currentChar.word}</span>
          <span>{currentChar.word}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Trace the word above on the canvas</p>
      </div>

      <button onClick={() => { onComplete('hindi_write_' + selectedChar, 80); onBack(); }} className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition">
        ✅ Done Practicing
      </button>
    </div>
  );
}

// ==================== MATRA PAGE ====================
function MatraPage({ state, openLesson, onBack }: { state: AppState; openLesson: (l: Lesson) => void; onBack: () => void }) {
  const [selectedMatra, setSelectedMatra] = useState(0);
  const matra = hindiMatras[selectedMatra];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">📝 Matra Practice</h2>
      </div>

      {/* Matra Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {hindiMatras.map((m, i) => (
            <button key={m.id} onClick={() => setSelectedMatra(i)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${i === selectedMatra ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {m.symbol} {m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Current Matra */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-700">{matra.name}</h3>
          <div className="mt-4 flex items-center justify-center gap-4 text-4xl font-serif">
            <span className="text-gray-400">{matra.base}</span>
            <span className="text-gray-400">+</span>
            <span className="text-red-500">{matra.symbol}</span>
            <span className="text-gray-400">=</span>
            <span className="text-purple-700 font-bold">{matra.result}</span>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <h4 className="font-medium text-red-800 mb-2">Examples:</h4>
          <div className="flex flex-wrap gap-3 text-2xl font-serif">
            {matra.examples.map((ex, i) => (
              <button key={i} onClick={() => speakHindi(ex)} className="px-4 py-2 bg-white rounded-lg border border-red-200 hover:bg-red-100 transition">
                {ex} 🔊
              </button>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <h4 className="font-medium text-purple-800 mb-2">Words with this matra:</h4>
          <div className="flex flex-wrap gap-3">
            {matra.words.map((w, i) => (
              <button key={i} onClick={() => speakHindi(w)} className="px-4 py-2 bg-white rounded-lg border border-purple-200 hover:bg-purple-100 transition text-lg font-serif">
                {w} 🔊
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-2">Practice Pattern:</h4>
          <p className="text-lg font-serif text-blue-700">{matra.practice}</p>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">💡 Parent Tip:</h4>
          <p className="text-sm text-amber-700">
            Show the base letter first, then add the matra. Let the child trace the matra with their finger first, then write it.
            Compare with other matras to avoid confusion.
          </p>
        </div>
      </div>

      {/* Related Lesson */}
      {(() => {
        const relatedLesson = allHindiLessons.find(l => l.topic.includes(matra.name.split(' ')[0]) || l.topic.includes(matra.symbol));
        if (relatedLesson) {
          return (
            <button onClick={() => openLesson(relatedLesson)} className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition">
              📚 Open Full Lesson: {relatedLesson.title}
            </button>
          );
        }
        return null;
      })()}
    </div>
  );
}

// ==================== SPEAK PAGE ====================
function SpeakPage() {
  const [selectedConv, setSelectedConv] = useState(0);
  const conv = speakingConversations[selectedConv];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">🗣️ Speak English</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {speakingConversations.map((c, i) => (
          <button key={i} onClick={() => setSelectedConv(i)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${i === selectedConv ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}>
            {c.emoji} {c.title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-blue-700">{conv.emoji} {conv.title}</h3>
        {conv.conversations.map((c, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-medium">Q:</span>
              <span className="text-gray-800">{c.q}</span>
              <button onClick={() => speak(c.q)} className="ml-auto text-blue-500 hover:text-blue-700">🔊</button>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3">
              <span className="text-green-600 font-medium">A:</span>
              <span className="text-gray-700">{c.a}</span>
              <button onClick={() => speak(c.a)} className="ml-auto text-blue-500 hover:text-blue-700">🔊</button>
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">📖 English Vocabulary</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium capitalize ${c === category ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {words.map((w, i) => (
          <button key={i} onClick={() => speak(w.word)}
            className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition hover:scale-105">
            <div className="text-3xl mb-2">{w.emoji}</div>
            <div className="font-bold text-gray-800">{w.word}</div>
            <div className="text-xs text-gray-500">{w.hindi}</div>
            <div className="mt-2 text-blue-500 text-xs">🔊 Listen</div>
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
    if (userAns === correct) {
      setFeedback('Great! 🌟');
      setScore(s => s + 1);
    } else {
      setFeedback(`The answer is: ${q.answer}`);
    }
    setTimeout(() => {
      setFeedback(null);
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        const finalScore = Math.round(((score + (userAns === correct ? 1 : 0)) / questions.length) * 100);
        onComplete('daily_quiz', finalScore);
        setDone(true);
      }
    }, 1500);
  };

  if (done) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 text-center shadow-sm">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
        <p className="text-gray-600 mt-2">Score: {score}/{questions.length}</p>
        <button onClick={onBack} className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold">← Back Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <span className="text-sm text-gray-500">Question {current + 1} of {questions.length}</span>
      </div>

      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i <= current ? 'bg-purple-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-lg font-medium text-gray-800 mb-4">{q.question}</p>
        {q.type === 'mcq' && q.options && (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                className={`w-full text-left p-3 rounded-xl border-2 transition ${answers[q.id] === opt ? 'border-purple-400 bg-purple-50' : 'border-gray-100 hover:border-gray-200'}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
        {(q.type === 'fill' || q.type === 'write') && (
          <input type="text" value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            placeholder="Type your answer..." className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none" />
        )}

        {feedback && (
          <p className={`mt-4 text-center font-bold ${feedback.includes('Great') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
        )}

        <button onClick={submit} disabled={!answers[q.id]} className="w-full mt-4 py-3 bg-purple-500 text-white rounded-xl font-bold disabled:opacity-50 hover:bg-purple-600 transition">
          {current < questions.length - 1 ? 'Next →' : 'Finish ✓'}
        </button>
      </div>
    </div>
  );
}

// ==================== PROGRESS PAGE ====================
function ProgressPage({ state }: { state: AppState }) {
  const weaknesses = getWeaknesses(state);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📊 Progress Dashboard</h2>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Lessons Done" value={state.totalLessonsCompleted} icon="📚" />
        <StatCard label="Questions" value={state.totalQuestionsAnswered} icon="❓" />
        <StatCard label="Accuracy" value={state.totalQuestionsAnswered > 0 ? Math.round((state.totalCorrectAnswers / state.totalQuestionsAnswered) * 100) + '%' : '—'} icon="🎯" />
        <StatCard label="Streak" value={`${state.streak} days`} icon="🔥" />
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Subject Progress</h3>
        <div className="space-y-4">
          {(['hindi', 'english', 'maths', 'evs', 'safety', 'art'] as Subject[]).map(subject => {
            const progress = getSubjectProgress(state, subject);
            const colors: Record<Subject, string> = { hindi: 'bg-orange-500', english: 'bg-blue-500', maths: 'bg-green-500', evs: 'bg-yellow-500', safety: 'bg-purple-500', art: 'bg-pink-500' };
            return (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize font-medium text-gray-700">{subject}</span>
                  <span className="text-gray-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className={`${colors[subject]} rounded-full h-3 transition-all`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak Areas */}
      {weaknesses.length > 0 && (
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-4">⚠️ Needs Practice</h3>
          <div className="space-y-2">
            {weaknesses.slice(0, 10).map((w, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg">
                <span className="text-sm text-gray-700 capitalize">{w.topic}</span>
                <span className="text-xs text-red-600 font-medium">{w.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">🏆 Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {state.badges.map(badge => (
            <div key={badge.id} className={`p-3 rounded-xl text-center ${badge.earned ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50 opacity-50'}`}>
              <div className="text-2xl">{badge.icon}</div>
              <div className="text-xs font-medium text-gray-700 mt-1">{badge.name}</div>
              {badge.earned && <div className="text-xs text-green-600 mt-0.5">✅ Earned!</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
      <div className="text-2xl">{icon}</div>
      <div className="text-xl font-bold text-gray-800 mt-1">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// ==================== FOUNDATION PAGE ====================
function FoundationPage({ state, openLesson, onBack }: { state: AppState; openLesson: (l: Lesson) => void; onBack: () => void }) {
  const weeks = [
    { week: 1, title: 'Foundation Basics', topics: ['Hindi: स्वर writing', 'English: Alphabet + phonics', 'Math: Numbers 1-20', 'EVS: My body'] },
    { week: 2, title: 'Building Up', topics: ['Hindi: व्यंजन', 'English: Vocabulary + sentences', 'Math: Addition', 'EVS: Family + school'] },
    { week: 3, title: 'Growing Skills', topics: ['Hindi: Matras', 'English: Reading + grammar', 'Math: Subtraction + tables', 'EVS: Plants + animals'] },
    { week: 4, title: 'Mastery', topics: ['Hindi: Words + sentences', 'English: Speaking + writing', 'Math: Mixed practice', 'EVS: Water + weather + safety'] },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">🌟 30-Day Foundation Booster</h2>
      </div>

      {weeks.map(w => (
        <div key={w.week} className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">{w.week}</div>
            <h3 className="text-lg font-bold text-gray-800">Week {w.week}: {w.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {w.topics.map((t, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">{t}</div>
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">←</button>
        <h2 className="text-xl font-bold text-gray-800">📈 Weekly Report</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">This Week's Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-700">{state.totalLessonsCompleted}</div>
            <div className="text-xs text-blue-600">Lessons Done</div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-700">{state.totalQuestionsAnswered}</div>
            <div className="text-xs text-green-600">Questions</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-700">{accuracy}%</div>
            <div className="text-xs text-purple-600">Accuracy</div>
          </div>
        </div>
      </div>

      {weaknesses.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">⚠️ Recommended Focus</h3>
          <div className="space-y-2">
            {weaknesses.slice(0, 5).map((w, i) => (
              <div key={i} className="text-sm text-amber-700">• {w.topic} ({w.score}%)</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== CHILD MODE ====================
function ChildModeView({ state, setPage, setChildMode, openLesson }: { state: AppState; setPage: (p: Page) => void; setChildMode: (v: boolean) => void; openLesson: (l: Lesson) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">🌟 Hi {state.profile.name}!</h1>
          <button onClick={() => setChildMode(false)} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600">👨‍👩‍👧 Parent</button>
        </div>

        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-700">Let's Learn!</h2>
          <p className="text-gray-600 mt-2">What do you want to do?</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChildBtn emoji="🔊" label="Listen" color="bg-blue-200" onClick={() => speak('Hello! Let us learn something new today!')} />
          <ChildBtn emoji="✏️" label="Write Hindi" color="bg-orange-200" onClick={() => { setChildMode(false); setPage('hindi-write'); }} />
          <ChildBtn emoji="🎯" label="Practice" color="bg-green-200" onClick={() => { setChildMode(false); setPage('quiz'); }} />
          <ChildBtn emoji="🎮" label="Play Quiz" color="bg-purple-200" onClick={() => { setChildMode(false); setPage('quiz'); }} />
          <ChildBtn emoji="📖" label="Read" color="bg-pink-200" onClick={() => { setChildMode(false); setPage('subjects'); }} />
          <ChildBtn emoji="✅" label="Today's Plan" color="bg-yellow-200" onClick={() => { setChildMode(false); setPage('daily'); }} />
        </div>
      </div>
    </div>
  );
}

function ChildBtn({ emoji, label, color, onClick }: { emoji: string; label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`${color} rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-sm`}>
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-lg font-bold text-gray-700">{label}</div>
    </button>
  );
}

// ==================== SETTINGS MODAL ====================
function SettingsModal({ state, updateState, onClose }: { state: AppState; updateState: (s: AppState) => void; onClose: () => void }) {
  const [profile, setProfile] = useState(state.profile);

  const save = () => {
    updateState({ ...state, profile });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">⚙️ Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Child's Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 6 })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">School</label>
            <input type="text" value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Daily Study Time (minutes)</label>
            <input type="number" value={profile.dailyStudyMinutes} onChange={(e) => setProfile({ ...profile, dailyStudyMinutes: parseInt(e.target.value) || 70 })}
              className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none" />
          </div>

          <button onClick={save} className="w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition">
            Save Settings
          </button>

          <button onClick={() => { if (confirm('Reset all progress?')) { localStorage.clear(); window.location.reload(); } }}
            className="w-full py-3 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition">
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
