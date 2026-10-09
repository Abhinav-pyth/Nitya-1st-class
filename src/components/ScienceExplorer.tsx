// 🧪 Science Explorer — interactive discovery activities (not static pictures):
// tap-to-reveal plant parts, animal-habitat sorting, five-senses matching,
// living vs non-living classification and a water-cycle sequence builder.
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { tts } from '../utils/speech';
import { recordLessonCompletion } from '../utils/rewards';

type ActivityId = 'plant' | 'habitat' | 'senses' | 'living' | 'cycle';

const ACTIVITIES: { id: ActivityId; title: string; emoji: string; grad: string }[] = [
  { id: 'plant', title: 'Parts of a Plant', emoji: '🌱', grad: 'from-green-400 to-emerald-600' },
  { id: 'habitat', title: 'Where Animals Live', emoji: '🏞️', grad: 'from-teal-400 to-cyan-600' },
  { id: 'senses', title: 'Five Senses Match', emoji: '👀', grad: 'from-pink-400 to-rose-600' },
  { id: 'living', title: 'Living or Non-Living?', emoji: '🐛', grad: 'from-amber-400 to-orange-600' },
  { id: 'cycle', title: 'Water Cycle Steps', emoji: '💧', grad: 'from-blue-400 to-indigo-600' },
];

export default function ScienceExplorer({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<ActivityId | null>(null);
  if (!active) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => { soundManager.click(); onBack(); }} aria-label="Go back"
            className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">🧪 Science Explorer</h2>
        </div>
        <p className="text-gray-600 font-bold px-1">Pick an experiment! Tap, drag-free, all touch 👇</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACTIVITIES.map(a => (
            <button key={a.id} onClick={() => { soundManager.click(); setActive(a.id); }}
              className={`bg-gradient-to-r ${a.grad} text-white rounded-3xl p-5 shadow-lg text-left cursor-pointer active:scale-[0.98] transition-transform`}>
              <span className="text-4xl">{a.emoji}</span>
              <h3 className="text-xl font-black mt-2">{a.title}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }
  const Comp = { plant: PlantLab, habitat: HabitatSort, senses: SensesMatch, living: LivingSort, cycle: WaterCycle }[active];
  return <Comp onBack={() => setActive(null)} />;
}

function Shell({ title, emoji, children, onBack }: { title: string; emoji: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => { soundManager.click(); onBack(); }} aria-label="Go back"
          className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-xl font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <h2 className="text-xl sm:text-2xl font-black text-gray-800">{emoji} {title}</h2>
      </div>
      {children}
    </div>
  );
}

function Done({ msg, onBack }: { msg: string; onBack: () => void }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6 text-center space-y-3">
      <div className="text-6xl">🏅</div>
      <h3 className="text-2xl font-black text-gray-800">{msg}</h3>
      <button onClick={() => { soundManager.click(); onBack(); }}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black cursor-pointer active:scale-95 transition-transform">🎉 Try another experiment!</button>
    </div>
  );
}

// ---------- 1. Parts of a plant (tap each part to learn) ----------
const PLANT_PARTS = [
  { name: 'Flower 🌸', why: 'makes seeds & smells sweet for bees', y: 'top' },
  { name: 'Leaf 🍃', why: 'makes food for the plant from sunlight', y: 'mid' },
  { name: 'Stem 🪵', why: 'carries water up like a straw', y: 'mid' },
  { name: 'Root 🌱', why: 'drinks water from the soil & holds the plant', y: 'bottom' },
];
function PlantLab({ onBack }: { onBack: () => void }) {
  const [found, setFound] = useState<string[]>([]);
  const tap = (p: typeof PLANT_PARTS[number]) => {
    soundManager.correct();
    tts(`${p.name.replace(/[^\w ]/g, '')}. ${p.why}`);
    setFound(f => [...new Set([...f, p.name])]);
  };
  const all = found.length === PLANT_PARTS.length;
  if (all) setTimeout(() => { if (!localStorage.getItem('sci_plant_done')) { localStorage.setItem('sci_plant_done', '1'); recordLessonCompletion('science-plant', 100); confetti({ particleCount: 60, spread: 60 }); } }, 100);
  return (
    <Shell title="Parts of a Plant" emoji="🌱" onBack={() => { localStorage.removeItem('sci_plant_done'); onBack(); }}>
      <div className="bg-white rounded-3xl shadow p-5">
        <p className="font-black text-gray-700 mb-3">Tap every part of the plant to learn its job! ({found.length}/{PLANT_PARTS.length})</p>
        <div className="space-y-2.5">
          {PLANT_PARTS.map(p => (
            <button key={p.name} onClick={() => tap(p)}
              className={`w-full text-left rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition-all border-2 ${found.includes(p.name) ? 'bg-green-50 border-green-300' : 'bg-purple-50 border-purple-100'}`}>
              <span className="font-black text-lg text-gray-800">{found.includes(p.name) ? '✅ ' : '👆 '}{p.name}</span>
              {found.includes(p.name) && <p className="text-sm text-green-700 font-bold mt-1">{p.why}</p>}
            </button>
          ))}
        </div>
      </div>
      {all && <Done msg="You know all the plant parts! 🌳" onBack={onBack} />}
    </Shell>
  );
}

// ---------- 2. Animal habitat sort ----------
const HABITATS = ['🌊 Water', '🌳 Jungle', '🏠 Home'];
const ANIMALS = [
  { e: '🐬', h: '🌊 Water' }, { e: '🦁', h: '🌳 Jungle' }, { e: '🐄', h: '🏠 Home' },
  { e: '🐟', h: '🌊 Water' }, { e: '🐯', h: '🌳 Jungle' }, { e: '🐕', h: '🏠 Home' },
];
function HabitatSort({ onBack }: { onBack: () => void }) {
  const [pool, setPool] = useState(ANIMALS);
  const [placed, setPlaced] = useState<Record<string, string[]>>({ '🌊 Water': [], '🌳 Jungle': [], '🏠 Home': [] });
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const pick = (a: typeof ANIMALS[number]) => { soundManager.click(); setWrongPick(a.e); tts(`Where does the ${a.e} live? Tap the right home!`); };
  const drop = (h: string) => {
    if (!wrongPick) return;
    const a = ANIMALS.find(x => x.e === wrongPick)!;
    if (a.h === h) {
      soundManager.correct();
      setPlaced(p => ({ ...p, [h]: [...p[h], a.e] }));
      setPool(pl => pl.filter(x => x.e !== a.e));
      setWrongPick(null);
      tts(`Yes! ${a.e} lives in ${h}`);
    } else { soundManager.wrong(); }
  };
  const all = pool.length === 0;
  if (all && !localStorage.getItem('sci_hab_done')) { localStorage.setItem('sci_hab_done', '1'); recordLessonCompletion('science-habitat', 100); confetti({ particleCount: 60, spread: 60 }); }
  return (
    <Shell title="Where Animals Live" emoji="🏞️" onBack={() => { localStorage.removeItem('sci_hab_done'); onBack(); }}>
      <div className="bg-white rounded-3xl shadow p-4 space-y-4">
        <p className="font-black text-gray-700">1️⃣ Tap an animal → 2️⃣ Tap its home. {wrongPick && <span className="text-purple-600">Now choose a home for {wrongPick}!</span>}</p>
        <div className="flex gap-3 flex-wrap min-h-[56px]">
          {pool.map(a => (
            <button key={a.e} onClick={() => pick(a)} className={`text-4xl w-14 h-14 rounded-2xl cursor-pointer active:scale-90 transition-transform ${wrongPick === a.e ? 'bg-purple-200 ring-4 ring-purple-400' : 'bg-gray-50'}`}>{a.e}</button>
          ))}
          {all && <span className="text-green-600 font-black">All animals are home! 🎉</span>}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {HABITATS.map(h => (
            <button key={h} onClick={() => drop(h)} disabled={!wrongPick}
              className={`rounded-2xl p-3 min-h-[92px] font-black cursor-pointer active:scale-[0.97] transition-transform border-2 ${wrongPick ? 'bg-yellow-50 border-yellow-400 animate-pulse' : 'bg-blue-50 border-blue-100 opacity-80'}`}>
              <div className="text-sm mb-1">{h}</div>
              <div className="flex flex-wrap gap-1 justify-center text-2xl">{placed[h].map((e, i) => <span key={i}>{e}</span>)}</div>
            </button>
          ))}
        </div>
      </div>
      {all && <Done msg="Habitat expert! 🌍" onBack={onBack} />}
    </Shell>
  );
}

// ---------- 3. Five senses match ----------
const SENSES = [
  { s: '👁️ Eyes', see: 'see the rainbow 🌈' },
  { s: '👂 Ears', see: 'hear the bird 🐦' },
  { s: '👃 Nose', see: 'smell the flower 🌸' },
  { s: '👅 Tongue', see: 'taste the mango 🥭' },
  { s: '✋ Skin', see: 'feel the soft cat 🐱' },
];
function SensesMatch({ onBack }: { onBack: () => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState<'ok' | 'bad' | null>(null);
  const q = SENSES[qi % SENSES.length];
  const round = Math.floor(qi / SENSES.length) + 1;
  const ans = [...SENSES].sort(() => Math.random() - 0.5);
  const pick = (s: string) => {
    if (fb) return;
    if (s === q.s) { setFb('ok'); setScore(x => x + 1); soundManager.correct(); tts(`Yes! We use our ${s} to ${q.see}`); }
    else { setFb('bad'); soundManager.wrong(); }
    setTimeout(() => { setFb(null); setQi(x => x + 1); }, 900);
  };
  return (
    <Shell title="Five Senses" emoji="👀" onBack={onBack}>
      <div className="bg-white rounded-3xl shadow p-5 space-y-4">
        <p className="text-sm font-black text-purple-500">Round {round} • Score {score}</p>
        <h3 className="text-xl sm:text-2xl font-black text-gray-800">Which sense helps you {q.see}?</h3>
        <div className="grid grid-cols-1 gap-2">
          {ans.map(o => (
            <button key={o.s} onClick={() => pick(o.s)}
              className={`py-3.5 px-4 rounded-2xl font-black text-lg cursor-pointer active:scale-[0.99] transition-all ${fb === 'ok' && o.s === q.s ? 'bg-green-500 text-white' : fb === 'bad' && o.s !== q.s ? 'bg-gray-100' : 'bg-pink-50 text-gray-800'}`}>
              {o.s}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ---------- 4. Living vs non-living sorter ----------
const SORT_ITEMS = [
  { e: '🐶', l: true }, { e: '🪨', l: false }, { e: '🌻', l: true }, { e: '🚗', l: false },
  { e: '🍄', l: true }, { e: '📱', l: false }, { e: '🐝', l: true }, { e: '☂️', l: false },
];
function LivingSort({ onBack }: { onBack: () => void }) {
  const [pool, setPool] = useState(SORT_ITEMS);
  const [sel, setSel] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const drop = (isLiving: boolean) => {
    if (!sel) return;
    const it = SORT_ITEMS.find(x => x.e === sel)!;
    if (it.l === isLiving) {
      soundManager.correct(); setPool(p => p.filter(x => x.e !== sel)); setSel(null); setCount(c => c + 1);
      tts(isLiving ? 'Yes, it is alive!' : 'Right, it is not alive.');
    } else soundManager.wrong();
  };
  const done = pool.length === 0;
  if (done && !localStorage.getItem('sci_liv_done')) { localStorage.setItem('sci_liv_done', '1'); recordLessonCompletion('science-living', 100); confetti({ particleCount: 60, spread: 60 }); }
  return (
    <Shell title="Living or Non-Living?" emoji="🐛" onBack={() => { localStorage.removeItem('sci_liv_done'); onBack(); }}>
      <div className="bg-white rounded-3xl shadow p-4 space-y-4">
        <p className="font-black text-gray-700">Tap a card, then tap the correct box! ✅ {count} sorted</p>
        <div className="flex gap-3 flex-wrap min-h-[56px] justify-center">
          {pool.map(it => (
            <button key={it.e} onClick={() => { soundManager.click(); setSel(it.e); }}
              className={`text-4xl w-14 h-14 rounded-2xl cursor-pointer active:scale-90 transition-transform ${sel === it.e ? 'bg-purple-200 ring-4 ring-purple-400' : 'bg-gray-50'}`}>{it.e}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => drop(true)} disabled={!sel} className={`rounded-2xl p-5 font-black text-lg cursor-pointer active:scale-[0.97] transition-transform border-2 ${sel ? 'bg-green-50 border-green-400 animate-pulse' : 'bg-green-50 border-green-100 opacity-70'}`}>🌱 LIVING<br /><span className="text-xs">grows, needs food</span></button>
          <button onClick={() => drop(false)} disabled={!sel} className={`rounded-2xl p-5 font-black text-lg cursor-pointer active:scale-[0.97] transition-transform border-2 ${sel ? 'bg-slate-100 border-slate-400 animate-pulse' : 'bg-slate-50 border-slate-100 opacity-70'}`}>🪨 NON-LIVING<br /><span className="text-xs">does not grow</span></button>
        </div>
      </div>
      {done && <Done msg="Science champion! 🔬" onBack={onBack} />}
    </Shell>
  );
}

// ---------- 5. Water cycle ordering ----------
const CYCLE = [
  { e: '☀️', t: 'Sun heats the water' },
  { e: '💨', t: 'Water becomes vapour (evaporation)' },
  { e: '☁️', t: 'Vapour cools and makes clouds' },
  { e: '🌧️', t: 'Rain falls back down' },
];
function WaterCycle({ onBack }: { onBack: () => void }) {
  const [picked, setPicked] = useState<number[]>([]);
  const shuffled = [...CYCLE.keys()].sort(() => Math.random() - 0.5).filter(i => !picked.includes(i));
  const tap = (i: number) => { soundManager.click(); setPicked(p => [...p, i]); };
  const right = picked.every((v, idx) => v === idx);
  const complete = picked.length === CYCLE.length;
  if (complete && right && !localStorage.getItem('sci_cyc_done')) { localStorage.setItem('sci_cyc_done', '1'); recordLessonCompletion('science-cycle', 100); soundManager.celebrate(); confetti({ particleCount: 80, spread: 70 }); }
  return (
    <Shell title="Water Cycle" emoji="💧" onBack={() => { localStorage.removeItem('sci_cyc_done'); onBack(); }}>
      <div className="bg-white rounded-3xl shadow p-4 space-y-4">
        <p className="font-black text-gray-700">Tap the steps in the right order: 1 → 2 → 3 → 4</p>
        <div className="grid grid-cols-2 gap-2 min-h-[110px]">
          {picked.map((i, pos) => (
            <div key={i} className={`rounded-2xl p-3 text-center ${right || pos < picked.length ? (CYCLE[i] && pos === i ? 'bg-green-100' : 'bg-red-100') : 'bg-blue-50'}`}>
              <div className="text-3xl">{CYCLE[i].e}</div>
              <div className="text-xs font-black text-gray-700">{pos + 1}. {CYCLE[i].t}</div>
            </div>
          ))}
        </div>
        {!complete && (
          <div className="flex gap-3 flex-wrap justify-center">
            {shuffled.map(i => (
              <button key={i} onClick={() => tap(i)} className="text-4xl w-16 h-16 rounded-2xl bg-blue-50 cursor-pointer active:scale-90 transition-transform">{CYCLE[i].e}</button>
            ))}
          </div>
        )}
        {complete && !right && <button onClick={() => { soundManager.click(); setPicked([]); }} className="w-full py-3 rounded-2xl bg-amber-100 font-black text-amber-700 cursor-pointer active:scale-95 transition-transform">🔁 Try again — hint: sun comes first! ☀️</button>}
        {complete && right && <Done msg="You mastered the water cycle! 💧☀️☁️🌧️" onBack={onBack} />}
      </div>
    </Shell>
  );
}
