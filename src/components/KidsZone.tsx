// Play & Learn — Kid's Zone: 20 educational games hub + game pages.
// Reuses the shared QuizEngine for question games and dedicated components
// for Maze, Jigsaw and Word Builder. All progress/stars persist via rewards store.
import { useMemo, useState } from 'react';
import QuizEngine, { QuizItem } from './QuizEngine';
import MazeGame from './MazeGame';
import JigsawGame from './JigsawGame';
import WordBuilder2 from './WordBuilder2';
import {
  makeCountQuestions, makeAddSubQuestions, makeAlphabetQuestions, makeHindiMatchQuestions,
  makeOddOneOutQuestions, makeAnimalSoundQuestions, makePictureQuizQuestions, makePatternQuestions,
  makeShadowQuestions, makeScienceQuestions, makeListenQuestions, makeObservationQuestions,
  makeShapeBuilderQuestions, makeSortingQuestions, makeDailyChallenge,
} from '../data/gameContent';
import { loadRewards, recordDailyChallenge, BADGES } from '../utils/rewards';

type Page = 'home' | 'subjects' | 'subject-detail' | 'quiz' | 'flashcards' | 'tools' | 'games' | 'snake-ladder' | 'ludo' | 'memory' | 'word-builder' | 'math-race' | 'pattern' | 'spelling' | 'block-puzzle' | 'kids-zone' | string;

interface GameDef {
  id: string; title: string; emoji: string; gradient: string; desc: string; howto: string;
  subject: string;
  make?: () => QuizItem[];              // quiz-engine games
  custom?: boolean;                     // rendered by a dedicated component
  legacyPage?: string;                  // existing game kept intact
  perRound?: number;
}

export const KID_GAMES: GameDef[] = [
  // ---- 20 new educational games ----
  { id: 'number-adventure', title: 'Number Adventure', emoji: '🔢', gradient: 'from-green-400 to-emerald-600', desc: 'Count apples, stars & animals and pick the right number!', howto: 'Look at the picture, count the objects one by one, then tap the correct number.', subject: 'Maths', make: () => makeCountQuestions(10, 8), perRound: 8 },
  { id: 'add-sub-challenge', title: 'Addition & Subtraction', emoji: '➕', gradient: 'from-blue-400 to-indigo-600', desc: 'Fun sums with pictures that show you how the answer works!', howto: 'Use the green dots and red apples to help you add or take away. Then choose the right answer.', subject: 'Maths', make: () => makeAddSubQuestions('mix', 10, 8), perRound: 8 },
  { id: 'alphabet-quest', title: 'Alphabet Quest', emoji: '🔤', gradient: 'from-cyan-400 to-teal-600', desc: 'A is for Apple! Match every letter with its picture.', howto: 'You will see a big letter. Tap the picture whose name starts with that letter.', subject: 'English', make: () => makeAlphabetQuestions(8), perRound: 8 },
  { id: 'word-builder-2', title: 'Word Builder', emoji: '🧱', gradient: 'from-orange-400 to-red-500', desc: 'Arrange letter tiles to build simple words like CAT and SUN!', howto: 'Look at the picture, listen to the word, then tap the letter tiles in the right order.', subject: 'English', custom: true },
  { id: 'hindi-akshar-match', title: 'Hindi Akshar Match', emoji: 'अ', gradient: 'from-orange-500 to-pink-600', desc: 'हिंदी अक्षर और तस्वीर मिलाइए — मज़े और सीख दोनों!', howto: 'बड़ा अक्षर देखिए। कौन सा शब्द इस अक्षर से बनता है? सही बटन दबाइए।', subject: 'Hindi', make: () => makeHindiMatchQuestions(8), perRound: 8 },
  { id: 'jigsaw', title: 'Jigsaw Puzzle', emoji: '🧩', gradient: 'from-fuchsia-500 to-purple-600', desc: 'Put the picture pieces together! Easy, medium and hard levels.', howto: 'Tap a piece from the tray, then tap the glowing box where it fits. No rush!', subject: 'Brain', custom: true },
  { id: 'odd-one-out', title: 'Find the Odd One Out', emoji: '🕵️', gradient: 'from-violet-400 to-purple-600', desc: 'Four pictures — one does not belong. Can you spot it?', howto: 'Look at all four pictures. Think: what do three of them have in common? Tap the odd one!', subject: 'GK', make: () => makeOddOneOutQuestions(8), perRound: 8 },
  { id: 'shape-sort', title: 'Shape & Colour Sorting', emoji: '🟣', gradient: 'from-pink-400 to-rose-600', desc: 'Sort fruits, animals, colours and numbers into the right boxes!', howto: 'See an object, then tap which group/box it belongs to.', subject: 'Maths', make: () => makeSortingQuestions(8), perRound: 8 },
  { id: 'animal-sounds', title: 'Animal Sounds Quiz', emoji: '🐮', gradient: 'from-lime-400 to-green-600', desc: 'Moo! Meow! Who makes that sound?', howto: 'Read the sound written on screen (or listen) and tap the animal that makes it.', subject: 'EVS', make: () => makeAnimalSoundQuestions(8), perRound: 8 },
  { id: 'picture-quiz', title: 'Picture Quiz', emoji: '🖼️', gradient: 'from-amber-400 to-orange-600', desc: 'See a picture, answer a fun question about it!', howto: 'Look at the big picture carefully, read the question, and tap one of the three answers.', subject: 'EVS', make: () => makePictureQuizQuestions(8), perRound: 8 },
  { id: 'spelling-challenge', title: 'Spelling Challenge', emoji: '✏️', gradient: 'from-teal-400 to-cyan-600', desc: 'Hear the word, pick the correct spelling!', howto: 'Tap 🔊 to hear the word, then choose the option that spells it correctly.', subject: 'English', make: () => makeListenQuestions(8), perRound: 8 },
  { id: 'pattern-detective', title: 'Pattern Detective', emoji: '🔍', gradient: 'from-purple-400 to-fuchsia-600', desc: 'Red-blue-red-blue... what comes next?', howto: 'Study the pattern, find what repeats, then tap the piece that comes next.', subject: 'Maths', make: () => makePatternQuestions(8), perRound: 8 },
  { id: 'maze', title: 'Maze Adventure', emoji: '🌀', gradient: 'from-teal-400 to-cyan-600', desc: 'Guide bunny 🐰 through the maze to the carrot 🥕!', howto: 'Tap squares next to bunny, swipe, or use arrow keys / D-pad to reach the carrot.', subject: 'Brain', custom: true },
  { id: 'shadow-match', title: 'Shadow Matching', emoji: '🌑', gradient: 'from-indigo-500 to-blue-700', desc: 'Match animals and things to their dark shadows!', howto: 'Look at the black shadow shape and choose which animal or object it matches.', subject: 'EVS', make: () => makeShadowQuestions(8), perRound: 8 },
  { id: 'shape-builder', title: 'Shape Builder', emoji: '📐', gradient: 'from-rose-400 to-pink-600', desc: 'Which shapes build a house, a rocket or a tree?', howto: 'Think about circles, squares and triangles — then pick the shapes that build the object.', subject: 'Maths', make: () => makeShapeBuilderQuestions(8), perRound: 8 },
  { id: 'science-explorer', title: 'Science Explorer', emoji: '🔬', gradient: 'from-sky-400 to-blue-600', desc: 'Plants, animals, weather, body and everyday science!', howto: 'Answer fun visual questions about nature and how things work.', subject: 'GK/EVS', make: () => makeScienceQuestions(8), perRound: 8 },
  { id: 'listen-choose', title: 'Listen and Choose', emoji: '🎧', gradient: 'from-cyan-400 to-blue-500', desc: 'Tap the speaker, listen, then choose what you heard!', howto: 'Tap the big 🔊 button to hear a word (text shows if sound is unavailable), then pick it.', subject: 'English', make: () => makeListenQuestions(8), perRound: 8 },
  { id: 'observe-memory', title: 'Memory & Observation', emoji: '👀', gradient: 'from-emerald-400 to-teal-600', desc: 'Remember 4 objects... which one was NOT there?', howto: 'Memorise the objects shown. They hide after 3 seconds — then find the one you did NOT see.', subject: 'Brain', make: () => makeObservationQuestions(6), perRound: 6 },
  { id: 'daily-challenge', title: 'Daily Challenge', emoji: '📅', gradient: 'from-yellow-400 to-amber-600', desc: '5 mixed questions from Maths, English, Hindi & EVS every day!', howto: 'A fresh mix of 5 quick questions from different subjects. Complete it once daily for bonus stars!', subject: 'All', make: () => makeDailyChallenge(), perRound: 5 },
  { id: 'gk-quiz', title: 'General Knowledge Quiz', emoji: '🌍', gradient: 'from-red-400 to-orange-500', desc: 'Planets, India, flags, animals and cool facts!', howto: 'Answer GK questions about our world — planets, countries, animals and inventions.', subject: 'GK', make: () => makeScienceQuestions(6).concat(makePictureQuizQuestions(4)), perRound: 8 },
  // ---- existing games preserved ----
  { id: 'snake-ladder', title: 'Snake & Ladder', emoji: '🐍🪜', gradient: 'from-green-400 to-emerald-600', desc: 'Roll the dice and climb to 100!', howto: '', subject: 'Classic', legacyPage: 'snake-ladder' },
  { id: 'ludo', title: 'Ludo Game', emoji: '🎲', gradient: 'from-purple-400 to-pink-600', desc: 'Classic board game race!', howto: '', subject: 'Classic', legacyPage: 'ludo' },
  { id: 'memory', title: 'Memory Match', emoji: '🧠', gradient: 'from-blue-400 to-indigo-600', desc: 'Flip cards to find matching pairs!', howto: '', subject: 'Brain', legacyPage: 'memory' },
  { id: 'word-builder', title: 'Word Builder Classic', emoji: '🔡', gradient: 'from-orange-400 to-red-600', desc: 'The original word building game!', howto: '', subject: 'English', legacyPage: 'word-builder' },
  { id: 'math-race', title: 'Math Race', emoji: '⚡', gradient: 'from-yellow-400 to-orange-600', desc: 'Solve math problems fast!', howto: '', subject: 'Maths', legacyPage: 'math-race' },
  { id: 'pattern', title: 'Pattern Game Classic', emoji: '🎨', gradient: 'from-pink-400 to-rose-600', desc: 'Original pattern completion game!', howto: '', subject: 'Maths', legacyPage: 'pattern' },
  { id: 'spelling', title: 'Spelling Bee', emoji: '🐝', gradient: 'from-cyan-400 to-blue-600', desc: 'Spell words with audio!', howto: '', subject: 'English', legacyPage: 'spelling' },
  { id: 'block-puzzle', title: 'Block Puzzle', emoji: '🧱', gradient: 'from-indigo-400 to-purple-600', desc: 'Place blocks and clear rows!', howto: '', subject: 'Brain', legacyPage: 'block-puzzle' },
];

const LEGACY_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {};
export function registerLegacyGames(map: Record<string, React.ComponentType<{ onBack: () => void }>>) {
  Object.assign(LEGACY_COMPONENTS, map);
}

export default function KidsZone({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, setRefresh] = useState(0);
  const rewards = useMemo(() => loadRewards(), [activeId]);
  const active = KID_GAMES.find(g => g.id === activeId);

  const goHome = () => { setActiveId(null); setRefresh(x => x + 1); window.scrollTo({ top: 0 }); };

  if (active) {
    if (active.custom) {
      if (active.id === 'maze') return <MazeGame onBack={goHome} />;
      if (active.id === 'jigsaw') return <JigsawGame onBack={goHome} />;
      if (active.id === 'word-builder-2') return <WordBuilder2 onBack={goHome} />;
    }
    if (active.legacyPage && LEGACY_COMPONENTS[active.id]) {
      const Comp = LEGACY_COMPONENTS[active.id];
      return <Comp onBack={goHome} />;
    }
    if (active.make) {
      const qs = active.make();
      return (
        <QuizEngine
          key={active.id + Date.now()}
          gameId={active.id} title={active.title} emoji={active.emoji} gradient={active.gradient}
          instructions={active.howto} questions={qs} perRound={active.perRound || 8} onBack={goHome}
        />
      );
    }
  }

  const dailyDone = rewards.dailyChallengeDate === new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black mb-1">🎮 Play & Learn</h2>
          <p className="text-white/90">Kid's Zone — {KID_GAMES.length} games • No timers, no stress, only fun!</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 text-center">
            <div className="text-2xl font-black">⭐ {rewards.stars}</div>
            <div className="text-xs font-bold text-white/80">total stars</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 text-center">
            <div className="text-2xl font-black">🔥 {rewards.streak}</div>
            <div className="text-xs font-bold text-white/80">day streak</div>
          </div>
        </div>
      </div>

      {/* Daily challenge banner */}
      <button onClick={() => setActiveId('daily-challenge')}
        className={`w-full text-left rounded-3xl p-5 shadow-lg cursor-pointer active:scale-[0.99] transition-transform bg-gradient-to-r ${dailyDone ? 'from-gray-400 to-gray-500' : 'from-yellow-400 to-amber-500'} text-white`}>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{dailyDone ? '✅' : '📅'}</span>
          <div className="flex-1">
            <h3 className="text-xl font-black">{dailyDone ? 'Today\'s challenge done! Come back tomorrow!' : "Today's Daily Challenge!"}</h3>
            <p className="text-white/90 text-sm">5 quick mixed questions • Earn ⭐ bonus stars</p>
          </div>
          {!dailyDone && <span className="hidden sm:block bg-white/25 rounded-full px-4 py-2 font-black">Play now ▶️</span>}
        </div>
      </button>

      {/* Recently played */}
      {rewards.recentGames.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-black text-gray-700 text-lg">🕒 Recently played</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {rewards.recentGames.map(id => {
              const g = KID_GAMES.find(x => x.id === id); if (!g) return null;
              return (
                <button key={id} onClick={() => setActiveId(id)} className={`shrink-0 bg-gradient-to-br ${g.gradient} text-white rounded-2xl px-4 py-3 font-bold shadow cursor-pointer active:scale-95 transition-transform`}>
                  {g.emoji} {g.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Badges strip */}
      <div className="bg-white rounded-3xl p-4 shadow-lg">
        <h3 className="font-black text-gray-700 mb-3">🏅 Your Badges ({rewards.badges.length}/{BADGES.length})</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {BADGES.map(b => {
            const earned = rewards.badges.includes(b.id);
            return (
              <div key={b.id} title={b.desc} className={`shrink-0 w-20 text-center p-2 rounded-2xl ${earned ? 'bg-amber-50 border-2 border-amber-300' : 'bg-gray-50 opacity-50 grayscale'}`}>
                <div className="text-3xl">{b.icon}</div>
                <div className="text-[10px] font-black text-gray-600 leading-tight mt-1">{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Games grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {KID_GAMES.map(g => {
          const stats = rewards.gameStats[g.id];
          return (
            <button key={g.id} onClick={() => { setActiveId(g.id); window.scrollTo({ top: 0 }); }}
              className={`text-left bg-gradient-to-br ${g.gradient} rounded-3xl p-5 text-white shadow-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-4xl">{g.emoji}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black">{g.subject}</span>
              </div>
              <h3 className="text-lg font-black mb-1">{g.title}</h3>
              <p className="text-white/85 text-xs leading-snug">{g.desc}</p>
              {stats && <p className="mt-2 text-[11px] font-bold bg-white/20 rounded-full px-2 py-0.5 inline-block">Best: {stats.bestScore} • Played {stats.plays}×</p>}
            </button>
          );
        })}
      </div>

      <div className="text-center">
        <button onClick={() => onNavigate('home')} className="px-6 py-3 rounded-2xl bg-white shadow font-black text-gray-700 cursor-pointer active:scale-95">🏠 Back to Home</button>
      </div>
    </div>
  );
}
