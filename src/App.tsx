import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import InteractiveMascot from './components/InteractiveMascot';
import ParticleBackground from './components/ParticleBackground';
import MagicCursor from './components/MagicCursor';
import FloatingShapes from './components/FloatingShapes';
import PageTransition from './components/PageTransition';
import InteractiveCard from './components/InteractiveCard';
import NumberLine from './components/NumberLine';
import SnakeLadderGame from './components/SnakeLadderGame';
import LudoGame from './components/LudoGame';
import MemoryGame from './components/MemoryGame';
import WordBuilderGame from './components/WordBuilderGame';
import MathRaceGame from './components/MathRaceGame';
import PatternGame from './components/PatternGame';
import SpellingBeeGame from './components/SpellingBeeGame';
import ThemeSwitcher from './components/ThemeSwitcher';
import LessonModal from './components/LessonModal';
import LessonPlayer, { SimpleLesson } from './components/LessonPlayer';
import { getLessonsBySubject } from "./utils/store";
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { soundManager } from './utils/sounds';

type Page = 'home' | 'subjects' | 'subject-detail' | 'quiz' | 'flashcards' | 'tools' | 'games' | 'snake-ladder' | 'ludo' | 'memory' | 'word-builder' | 'math-race' | 'pattern' | 'spelling';

function AppContent() {
  const { themeConfig } = useTheme();
  const [page, setPage] = useState<Page>('home');
  const [score, setScore] = useState(0);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  // Unlock Web Audio on the first user gesture (required by mobile browsers,
  // otherwise all game sounds stay silent).
  useEffect(() => {
    const unlock = () => soundManager.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  const celebrate = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    soundManager.celebrate();
  };

  const handlePageChange = (newPage: Page) => {
    soundManager.click();
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeConfig.bgGradient} relative`}>
      {/* Interactive Background Elements */}
      <ParticleBackground />
      <FloatingShapes />
      <MagicCursor />

      {/* Navigation */}
      <nav className={`${themeConfig.navBg} backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-4 ${themeConfig.navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => handlePageChange('home')} className="flex items-center gap-2 group">
            <div className={`w-12 h-12 bg-gradient-to-br ${themeConfig.primaryGradient} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-black bg-gradient-to-r ${themeConfig.primaryGradient} bg-clip-text text-transparent`}>
                Learning Buddy
              </h1>
              <p className="text-xs text-gray-500">Class 1 • Interactive Learning</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <NavBtn active={page === 'home'} onClick={() => handlePageChange('home')} emoji="🏠" label="Home" themeConfig={themeConfig} />
            <NavBtn active={page === 'subjects'} onClick={() => handlePageChange('subjects')} emoji="📚" label="Learn" themeConfig={themeConfig} />
            <NavBtn active={page === 'quiz'} onClick={() => handlePageChange('quiz')} emoji="🎯" label="Quiz" themeConfig={themeConfig} />
            <NavBtn active={page === 'games'} onClick={() => handlePageChange('games')} emoji="🎮" label="Games" themeConfig={themeConfig} />
            <button 
              onClick={() => setShowThemeSwitcher(!showThemeSwitcher)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all"
              title="Change Theme"
            >
              🎨
            </button>
          </div>
        </div>
      </nav>

      {/* Theme Switcher Modal */}
      {showThemeSwitcher && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowThemeSwitcher(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <ThemeSwitcher />
            <button 
              onClick={() => setShowThemeSwitcher(false)}
              className="w-full mt-4 py-3 bg-gray-100 rounded-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <PageTransition pageKey={page}>
          {page === 'home' && <HomePage onNavigate={handlePageChange} celebrate={celebrate} themeConfig={themeConfig} />}
          {page === 'subjects' && <SubjectsPage onNavigate={handlePageChange} themeConfig={themeConfig} />}
          {page === 'subject-detail' && <SubjectDetailPage onBack={() => handlePageChange('subjects')} onQuickAction={(p) => handlePageChange(p)} themeConfig={themeConfig} />}
          {page === 'quiz' && <QuizPage score={score} setScore={setScore} celebrate={celebrate} themeConfig={themeConfig} />}
          {page === 'flashcards' && <FlashcardsPage themeConfig={themeConfig} />}
          {page === 'tools' && <ToolsPage themeConfig={themeConfig} />}
          {page === 'games' && <GamesPage onNavigate={handlePageChange} themeConfig={themeConfig} />}
          {page === 'snake-ladder' && <SnakeLadderGame onBack={() => handlePageChange('games')} />}
          {page === 'ludo' && <LudoGame onBack={() => handlePageChange('games')} />}
          {page === 'memory' && <MemoryGame onBack={() => handlePageChange('games')} />}
          {page === 'word-builder' && <WordBuilderGame onBack={() => handlePageChange('games')} />}
          {page === 'math-race' && <MathRaceGame onBack={() => handlePageChange('games')} />}
          {page === 'pattern' && <PatternGame onBack={() => handlePageChange('games')} />}
          {page === 'spelling' && <SpellingBeeGame onBack={() => handlePageChange('games')} />}
        </PageTransition>
      </main>

      {/* Score Display */}
      <div className={`fixed bottom-4 right-4 bg-gradient-to-r ${themeConfig.buttonGradient} text-white px-4 py-2 rounded-full shadow-lg font-black text-sm z-50`}>
        ⭐ Score: {score}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Navigation Button
function NavBtn({ active, onClick, emoji, label, themeConfig }: { active: boolean; onClick: () => void; emoji: string; label: string; themeConfig: any }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
        active 
          ? `bg-gradient-to-r ${themeConfig.buttonGradient} text-white shadow-md scale-105` 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-1">{emoji}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

// Home Page
function HomePage({ onNavigate, celebrate, themeConfig }: { onNavigate: (page: Page) => void; celebrate: () => void; themeConfig: any }) {
  return (
    <div className="space-y-6">
      {/* 3D Interactive Mascot */}
      <div className={`bg-gradient-to-r ${themeConfig.primaryGradient} rounded-3xl p-6 text-white shadow-2xl`}>
        <h2 className="text-3xl font-black mb-2">Welcome Back! 🌟</h2>
        <p className="text-white/90 mb-4">Meet your learning buddy! Click and move your mouse to interact!</p>
        <InteractiveMascot />
      </div>

      {/* Quick Actions - NOW CLICKABLE! */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InteractiveCard 
          onClick={() => {
            soundManager.click();
            sessionStorage.setItem('selectedSubject', 'Hindi');
            onNavigate('subject-detail');
          }}
          className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
        >
          <div className="text-4xl mb-2">✏️</div>
          <div className="font-black">Hindi Writing</div>
        </InteractiveCard>
        <InteractiveCard 
          onClick={() => {
            soundManager.click();
            sessionStorage.setItem('selectedSubject', 'English');
            onNavigate('subject-detail');
          }}
          className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
        >
          <div className="text-4xl mb-2">📖</div>
          <div className="font-black">English</div>
        </InteractiveCard>
        <InteractiveCard 
          onClick={() => {
            soundManager.click();
            sessionStorage.setItem('selectedSubject', 'Maths');
            onNavigate('subject-detail');
          }}
          className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
        >
          <div className="text-4xl mb-2">🔢</div>
          <div className="font-black">Maths</div>
        </InteractiveCard>
        <InteractiveCard 
          onClick={() => {
            soundManager.click();
            sessionStorage.setItem('selectedSubject', 'EVS');
            onNavigate('subject-detail');
          }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg cursor-pointer"
        >
          <div className="text-4xl mb-2">🌱</div>
          <div className="font-black">EVS</div>
        </InteractiveCard>
      </div>

      {/* Interactive Number Line */}
      <NumberLine start={1} end={20} onNumberClick={() => celebrate()} />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InteractiveCard 
          onClick={() => onNavigate('quiz')}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100"
        >
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Quiz Center</h3>
          <p className="text-sm text-gray-600">72+ questions across all subjects</p>
        </InteractiveCard>
        <InteractiveCard 
          onClick={() => onNavigate('flashcards')}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100"
        >
          <div className="text-5xl mb-3">🎴</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Flashcards</h3>
          <p className="text-sm text-gray-600">103+ interactive flip cards</p>
        </InteractiveCard>
        <InteractiveCard 
          onClick={() => onNavigate('tools')}
          className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100"
        >
          <div className="text-5xl mb-3">🛠️</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Learning Tools</h3>
          <p className="text-sm text-gray-600">Interactive learning aids</p>
        </InteractiveCard>
      </div>
    </div>
  );
}

// Subjects Page
function SubjectsPage({ onNavigate, themeConfig }: { onNavigate: (page: Page) => void; themeConfig: any }) {
  const subjects = [
    { name: 'Hindi', emoji: '✏️', color: 'from-orange-400 to-red-500', lessons: 30 },
    { name: 'English', emoji: '📖', color: 'from-blue-400 to-cyan-500', lessons: 30 },
    { name: 'Maths', emoji: '🔢', color: 'from-green-400 to-emerald-500', lessons: 35 },
    { name: 'EVS', emoji: '🌱', color: 'from-yellow-400 to-orange-500', lessons: 25 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-800">📚 Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <InteractiveCard 
            key={subject.name}
            onClick={() => {
              soundManager.click();
              // Store selected subject in sessionStorage
              sessionStorage.setItem('selectedSubject', subject.name);
              onNavigate('subject-detail');
            }}
            className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 text-white shadow-lg cursor-pointer`}
          >
            <div className="text-6xl mb-3">{subject.emoji}</div>
            <h3 className="text-2xl font-black mb-2">{subject.name}</h3>
            <p className="text-white/90">{subject.lessons} lessons available</p>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}

// Subject Detail Page
function SubjectDetailPage({ onBack, onQuickAction, themeConfig }: { onBack: () => void; onQuickAction: (page: Page) => void; themeConfig: any }) {
  const subjectName = sessionStorage.getItem('selectedSubject') || 'Hindi';

  // Real interactive lesson content from the data files (fully playable — no placeholders)
  const subjectMeta: Record<string, { emoji: string; color: string; key: any }> = {
    Hindi:   { emoji: '✏️', color: 'from-orange-400 to-red-500', key: 'hindi' },
    English: { emoji: '📖', color: 'from-blue-400 to-cyan-500', key: 'english' },
    Maths:   { emoji: '🔢', color: 'from-green-400 to-emerald-500', key: 'maths' },
    EVS:     { emoji: '🌱', color: 'from-yellow-400 to-orange-500', key: 'evs' },
    Safety:  { emoji: '🛡️', color: 'from-red-400 to-pink-500', key: 'safety' },
    Art:     { emoji: '🎨', color: 'from-fuchsia-400 to-purple-500', key: 'art' },
  };
  const meta = subjectMeta[subjectName] || subjectMeta.Hindi;
  const subject = {
    ...meta,
    lessons: getLessonsBySubject(meta.key).slice(0, 10) as unknown as SimpleLesson[],
  };

  const lessonEmojis: Record<string, string[]> = {
    Hindi: ['🔤', '✍️', '🅰️', '📝', '💬'],
    English: ['🔠', '🔡', '🗣️', '👨‍👩‍👧', '🐘'],
    Maths: ['🔢', '🔟', '➕', '➖', '🔺'],
    EVS: ['🧍', '👀', '🌳', '🦁', '😊'],
  };
  const emojis = lessonEmojis[subjectName] || ['📘', '📘', '📘', '📘', '📘'];
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [playingLesson, setPlayingLesson] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => { soundManager.click(); onBack(); }}
          aria-label="Go back"
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-black cursor-pointer active:scale-95 transition-transform"
        >
          ←
        </button>
        <div className={`bg-gradient-to-r ${subject.color} rounded-2xl p-4 text-white shadow-lg flex-1`}>
          <div className="flex items-center gap-3">
            <span className="text-5xl">{subject.emoji}</span>
            <div>
              <h2 className="text-2xl font-black">{subjectName}</h2>
              <p className="text-white/90 text-sm">{subject.lessons.length} lessons available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-gray-800">📚 Lessons</h3>
        {subject.lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            type="button"
            onClick={() => {
              soundManager.click();
              setSelectedLesson(index);
            }}
            className="w-full text-left bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 active:border-purple-300 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-white font-black text-lg`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black text-gray-800 mb-1">{lesson.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{lesson.explanation}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>⏱️ {lesson.duration} min</span>
                  <span>•</span>
                  <span>❓ {lesson.questions.length} practice questions</span>
                  <span>•</span>
                  <span>📖 Interactive</span>
                </div>
              </div>
              <div className="text-2xl">→</div>
            </div>
          </button>
        ))}
      </div>

      {/* Lesson Preview Modal */}
      {selectedLesson !== null && subject.lessons[selectedLesson] && (
        <LessonModal
          lesson={{
            title: subject.lessons[selectedLesson].title,
            description: subject.lessons[selectedLesson].explanation.slice(0, 110) + '…',
            duration: `${subject.lessons[selectedLesson].duration} min`,
            emoji: emojis[selectedLesson] || '📘',
            points: [
              ...subject.lessons[selectedLesson].activities.slice(0, 2),
              `Answer ${subject.lessons[selectedLesson].questions.length} fun practice questions`,
              'Earn stars ⭐ when you finish!',
            ],
          }}
          subjectColor={subject.color}
          onClose={() => setSelectedLesson(null)}
          onStart={() => {
            setPlayingLesson(selectedLesson);
            setSelectedLesson(null);
          }}
        />
      )}

      {/* Full Interactive Lesson Player */}
      {playingLesson !== null && subject.lessons[playingLesson] && (
        <LessonPlayer
          lesson={subject.lessons[playingLesson]}
          subjectColor={subject.color}
          onClose={() => setPlayingLesson(null)}
        />
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
        <h3 className="text-lg font-black text-gray-800 mb-4">🎯 Quick Practice</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.click();
              onQuickAction('quiz');
            }}
            className="bg-white rounded-xl p-4 text-center shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-sm">Take Quiz</div>
          </button>
          <button
            type="button"
            onClick={() => {
              soundManager.click();
              onQuickAction('flashcards');
            }}
            className="bg-white rounded-xl p-4 text-center shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            <div className="text-3xl mb-2">🎴</div>
            <div className="font-bold text-sm">Flashcards</div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Quiz Page
function QuizPage({ score, setScore, celebrate, themeConfig }: { score: number; setScore: (s: number) => void; celebrate: () => void; themeConfig: any }) {
  const [currentQ, setCurrentQ] = useState(0);
  const questions = [
    { q: 'अ से क्या होता है?', options: ['अनार', 'आम', 'इमली'], answer: 'अनार' },
    { q: 'What color is the sky?', options: ['Red', 'Blue', 'Green'], answer: 'Blue' },
    { q: '2 + 3 = ?', options: ['4', '5', '6'], answer: '5' },
  ];

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQ].answer) {
      setScore(score + 10);
      celebrate();
      soundManager.correct();
    } else {
      soundManager.wrong();
    }
    
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-black text-gray-800 mb-6">🎯 Quiz Time!</h2>
      <div className="bg-white rounded-3xl p-8 shadow-2xl">
        <p className="text-xl font-bold text-gray-800 mb-6">{questions[currentQ].q}</p>
        <div className="space-y-3">
          {questions[currentQ].options.map((option) => (
            <InteractiveCard
              key={option}
              onClick={() => handleAnswer(option)}
              className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 cursor-pointer"
            >
              <span className="font-bold text-gray-700">{option}</span>
            </InteractiveCard>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          Question {currentQ + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}

// Flashcards Page
function FlashcardsPage({ themeConfig }: { themeConfig: any }) {
  const [flipped, setFlipped] = useState(false);
  const cards = [
    { front: 'अ', back: 'अनार (Pomegranate)', emoji: '🍎' },
    { front: 'आ', back: 'आम (Mango)', emoji: '🥭' },
    { front: 'A', back: 'Apple', emoji: '🍎' },
  ];
  const [currentCard, setCurrentCard] = useState(0);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-black text-gray-800 mb-6">🎴 Flashcards</h2>
      <InteractiveCard
        onClick={() => {
          setFlipped(!flipped);
          soundManager.click();
        }}
        className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12 text-center shadow-2xl cursor-pointer min-h-[300px] flex flex-col items-center justify-center"
      >
        <div className="text-8xl mb-4">{cards[currentCard].emoji}</div>
        <div className="text-6xl font-black text-purple-700 font-hindi">
          {flipped ? cards[currentCard].back : cards[currentCard].front}
        </div>
        <p className="mt-4 text-sm text-gray-500">Tap to flip!</p>
      </InteractiveCard>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => { setCurrentCard((currentCard - 1 + cards.length) % cards.length); setFlipped(false); soundManager.click(); }}
          className="px-6 py-3 bg-gray-100 rounded-xl font-bold"
        >
          ← Previous
        </button>
        <button
          onClick={() => { setCurrentCard((currentCard + 1) % cards.length); setFlipped(false); soundManager.click(); }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// Tools Page
function ToolsPage({ themeConfig }: { themeConfig: any }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-gray-800">🛠️ Learning Tools</h2>
      
      {/* Interactive Number Line */}
      <NumberLine start={1} end={20} />

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InteractiveCard className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
          <div className="text-5xl mb-3">🎴</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Flashcards</h3>
          <p className="text-sm text-gray-600">103+ interactive cards for quick learning</p>
        </InteractiveCard>
        <InteractiveCard className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Quiz Center</h3>
          <p className="text-sm text-gray-600">72+ questions with hints and explanations</p>
        </InteractiveCard>
      </div>
    </div>
  );
}

// Games Page
function GamesPage({ onNavigate, themeConfig }: { onNavigate: (page: Page) => void; themeConfig: any }) {
  const games = [
    {
      id: 'snake-ladder',
      title: 'Snake & Ladder',
      emoji: '🐍🪜',
      description: 'Roll the dice and climb to 100! Watch out for snakes!',
      gradient: 'from-green-400 to-emerald-600',
      tags: ['🎲 Dice', '👤 1 Player'],
      category: 'Classic',
    },
    {
      id: 'ludo',
      title: 'Ludo Game',
      emoji: '🎲',
      description: 'Classic board game! Race your tokens to finish!',
      gradient: 'from-purple-400 to-pink-600',
      tags: ['🎲 Board', '👥 4 Players'],
      category: 'Classic',
    },
    {
      id: 'memory',
      title: 'Memory Match',
      emoji: '🧠',
      description: 'Find all matching pairs! Train your memory!',
      gradient: 'from-blue-400 to-indigo-600',
      tags: ['🧩 Puzzle', '👤 1 Player'],
      category: 'Brain',
    },
    {
      id: 'word-builder',
      title: 'Word Builder',
      emoji: '🔤',
      description: 'Build words with letters! Learn spelling!',
      gradient: 'from-orange-400 to-red-600',
      tags: ['📚 Learning', '👤 1 Player'],
      category: 'Educational',
    },
    {
      id: 'math-race',
      title: 'Math Race',
      emoji: '⚡',
      description: 'Solve math problems fast! Beat the clock!',
      gradient: 'from-yellow-400 to-orange-600',
      tags: ['🔢 Math', '⏱️ Timed'],
      category: 'Educational',
    },
    {
      id: 'pattern',
      title: 'Pattern Game',
      emoji: '🎨',
      description: 'Complete the pattern! Train your logic!',
      gradient: 'from-pink-400 to-rose-600',
      tags: ['🧩 Logic', '👤 1 Player'],
      category: 'Brain',
    },
    {
      id: 'spelling',
      title: 'Spelling Bee',
      emoji: '🐝',
      description: 'Spell the words correctly! Learn new words!',
      gradient: 'from-cyan-400 to-blue-600',
      tags: ['📚 Learning', '🔊 Audio'],
      category: 'Educational',
    },
  ];

  const categories = ['All', 'Classic', 'Educational', 'Brain'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-4xl font-black mb-2">🎮 Game Arcade</h2>
        <p className="text-white/90 text-lg">Learn and play with {games.length} exciting games!</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? `bg-gradient-to-r ${themeConfig.buttonGradient} text-white shadow-lg scale-105`
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <InteractiveCard
            key={game.id}
            onClick={() => {
              soundManager.click();
              onNavigate(game.id as Page);
            }}
            className={`bg-gradient-to-br ${game.gradient} rounded-3xl p-6 text-white shadow-xl cursor-pointer group hover:scale-105 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">{game.emoji}</div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{game.category}</span>
            </div>
            <h3 className="text-2xl font-black mb-2">{game.title}</h3>
            <p className="text-white/90 mb-4 text-sm">{game.description}</p>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, i) => (
                <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </InteractiveCard>
        ))}
      </div>

      {/* Learning Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 shadow-lg border-2 border-blue-100">
        <h3 className="text-xl font-black text-gray-800 mb-4">🎓 Learning Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4">
            <div className="text-3xl mb-2">🧠</div>
            <h4 className="font-bold text-gray-700 mb-1">Brain Training</h4>
            <p className="text-sm text-gray-600">Memory, logic, and pattern recognition games</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-bold text-gray-700 mb-1">Language Skills</h4>
            <p className="text-sm text-gray-600">Word building and spelling practice</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <div className="text-3xl mb-2">🔢</div>
            <h4 className="font-bold text-gray-700 mb-1">Math Mastery</h4>
            <p className="text-sm text-gray-600">Speed math and calculation practice</p>
          </div>
        </div>
      </div>
    </div>
  );
}
