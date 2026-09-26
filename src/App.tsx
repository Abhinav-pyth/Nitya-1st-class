import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import InteractiveMascot from './components/InteractiveMascot';
import ParticleBackground from './components/ParticleBackground';
import MagicCursor from './components/MagicCursor';
import FloatingShapes from './components/FloatingShapes';
import PageTransition from './components/PageTransition';
import InteractiveCard from './components/InteractiveCard';
import NumberLine from './components/NumberLine';
import { soundManager } from './utils/sounds';

type Page = 'home' | 'subjects' | 'subject-detail' | 'quiz' | 'flashcards' | 'tools' | 'classroom';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [score, setScore] = useState(0);

  const celebrate = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    soundManager.celebrate();
  };

  const handlePageChange = (newPage: Page) => {
    soundManager.click();
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
      {/* Interactive Background Elements */}
      <ParticleBackground />
      <FloatingShapes />
      <MagicCursor />

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => handlePageChange('home')} className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
              📚
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Learning Buddy
              </h1>
              <p className="text-xs text-gray-500">Class 1 • Interactive Learning</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <NavBtn active={page === 'home'} onClick={() => handlePageChange('home')} emoji="🏠" label="Home" />
            <NavBtn active={page === 'subjects'} onClick={() => handlePageChange('subjects')} emoji="📚" label="Learn" />
            <NavBtn active={page === 'quiz'} onClick={() => handlePageChange('quiz')} emoji="🎯" label="Quiz" />
            <NavBtn active={page === 'flashcards'} onClick={() => handlePageChange('flashcards')} emoji="🎴" label="Cards" />
            <NavBtn active={page === 'tools'} onClick={() => handlePageChange('tools')} emoji="🛠️" label="Tools" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <PageTransition pageKey={page}>
          {page === 'home' && <HomePage onNavigate={handlePageChange} celebrate={celebrate} />}
          {page === 'subjects' && <SubjectsPage onNavigate={handlePageChange} />}
          {page === 'subject-detail' && <SubjectDetailPage onBack={() => handlePageChange('subjects')} />}
          {page === 'quiz' && <QuizPage score={score} setScore={setScore} celebrate={celebrate} />}
          {page === 'flashcards' && <FlashcardsPage />}
          {page === 'tools' && <ToolsPage />}
        </PageTransition>
      </main>

      {/* Score Display */}
      <div className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-black text-sm z-50">
        ⭐ Score: {score}
      </div>
    </div>
  );
}

// Navigation Button
function NavBtn({ active, onClick, emoji, label }: { active: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
        active 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105' 
          : 'text-gray-600 hover:bg-purple-50'
      }`}
    >
      <span className="mr-1">{emoji}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

// Home Page
function HomePage({ onNavigate, celebrate }: { onNavigate: (page: Page) => void; celebrate: () => void }) {
  return (
    <div className="space-y-6">
      {/* 3D Interactive Mascot */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-2">Welcome Back! 🌟</h2>
        <p className="text-white/90 mb-4">Meet your learning buddy! Click and move your mouse to interact!</p>
        <InteractiveMascot />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InteractiveCard className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">✏️</div>
          <div className="font-black">Hindi Writing</div>
        </InteractiveCard>
        <InteractiveCard className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">📖</div>
          <div className="font-black">English</div>
        </InteractiveCard>
        <InteractiveCard className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-2">🔢</div>
          <div className="font-black">Maths</div>
        </InteractiveCard>
        <InteractiveCard className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
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
function SubjectsPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
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
function SubjectDetailPage({ onBack }: { onBack: () => void }) {
  const subjectName = sessionStorage.getItem('selectedSubject') || 'Hindi';
  
  const subjectData: Record<string, { emoji: string; color: string; lessons: { title: string; description: string; duration: string }[] }> = {
    Hindi: {
      emoji: '✏️',
      color: 'from-orange-400 to-red-500',
      lessons: [
        { title: 'स्वर (Vowels)', description: 'Learn अ, आ, इ, ई, उ, ऊ', duration: '15 min' },
        { title: 'व्यंजन (Consonants)', description: 'Learn क, ख, ग, घ and more', duration: '20 min' },
        { title: 'मात्रा (Matras)', description: 'Practice आ की, इ की, ई की मात्रा', duration: '25 min' },
        { title: 'शब्द (Words)', description: 'Build 2-letter and 3-letter words', duration: '20 min' },
        { title: 'वाक्य (Sentences)', description: 'Make simple Hindi sentences', duration: '25 min' },
      ]
    },
    English: {
      emoji: '📖',
      color: 'from-blue-400 to-cyan-500',
      lessons: [
        { title: 'Alphabet A-M', description: 'Capital and small letters', duration: '15 min' },
        { title: 'Alphabet N-Z', description: 'Complete the alphabet', duration: '15 min' },
        { title: 'Vowel Sounds', description: 'Learn a, e, i, o, u sounds', duration: '10 min' },
        { title: 'My Family', description: 'Father, Mother, Brother, Sister', duration: '15 min' },
        { title: 'Animals', description: 'Domestic and wild animals', duration: '20 min' },
      ]
    },
    Maths: {
      emoji: '🔢',
      color: 'from-green-400 to-emerald-500',
      lessons: [
        { title: 'Numbers 1-10', description: 'Count and recognize numbers', duration: '15 min' },
        { title: 'Numbers 11-20', description: 'Continue counting', duration: '15 min' },
        { title: 'Addition', description: 'Learn to add numbers', duration: '20 min' },
        { title: 'Subtraction', description: 'Learn to subtract numbers', duration: '20 min' },
        { title: 'Shapes', description: 'Circle, Square, Triangle, Rectangle', duration: '15 min' },
      ]
    },
    EVS: {
      emoji: '🌱',
      color: 'from-yellow-400 to-orange-500',
      lessons: [
        { title: 'My Body', description: 'Learn about body parts', duration: '15 min' },
        { title: 'Five Senses', description: 'Eyes, Ears, Nose, Tongue, Skin', duration: '15 min' },
        { title: 'Plants', description: 'Parts of a plant', duration: '20 min' },
        { title: 'Animals', description: 'Domestic and wild animals', duration: '20 min' },
        { title: 'Good Habits', description: 'Healthy daily habits', duration: '15 min' },
      ]
    }
  };

  const subject = subjectData[subjectName] || subjectData.Hindi;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
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
          <InteractiveCard
            key={index}
            onClick={() => {
              soundManager.click();
              // Future: Navigate to lesson detail
            }}
            className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-100 hover:border-purple-300 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-white font-black text-lg`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black text-gray-800 mb-1">{lesson.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>⏱️ {lesson.duration}</span>
                  <span>•</span>
                  <span>📖 Interactive</span>
                </div>
              </div>
              <div className="text-2xl">→</div>
            </div>
          </InteractiveCard>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
        <h3 className="text-lg font-black text-gray-800 mb-4">🎯 Quick Practice</h3>
        <div className="grid grid-cols-2 gap-3">
          <InteractiveCard
            onClick={() => {
              soundManager.click();
              // Future: Open quiz for this subject
            }}
            className="bg-white rounded-xl p-4 text-center shadow-md cursor-pointer"
          >
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-sm">Take Quiz</div>
          </InteractiveCard>
          <InteractiveCard
            onClick={() => {
              soundManager.click();
              // Future: Open flashcards for this subject
            }}
            className="bg-white rounded-xl p-4 text-center shadow-md cursor-pointer"
          >
            <div className="text-3xl mb-2">🎴</div>
            <div className="font-bold text-sm">Flashcards</div>
          </InteractiveCard>
        </div>
      </div>
    </div>
  );
}

// Quiz Page
function QuizPage({ score, setScore, celebrate }: { score: number; setScore: (s: number) => void; celebrate: () => void }) {
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
function FlashcardsPage() {
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
function ToolsPage() {
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
