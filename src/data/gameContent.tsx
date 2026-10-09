// Question banks for the Play & Learn educational games (generated content, randomized per round)
import { QuizItem } from '../components/QuizEngine';

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const uniq = (vals: number[], avoid: number): number[] => {
  const s = new Set(vals.filter(v => v !== avoid && v >= 0));
  while (s.size < 2) s.add(Math.max(0, avoid + s.size + 1));
  return [...s].slice(0, 2);
};
const opts3 = (answer: string, others: string[]) => {
  const arr = [{ label: answer, value: answer }, ...others.map(o => ({ label: o, value: o }))];
  // shuffle deterministically-random each call
  for (let i = arr.length - 1; i > 0; i--) { const j = rand(0, i);[arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr;
};

// ---------- Game 1: Number Adventure (count objects) ----------
const COUNT_EMOJIS = ['🍎', '⭐', '🐥', '🎈', '🐟', '🌸', '⚽', '🦋'];
export function makeCountQuestions(maxN: number, count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const n = rand(1, maxN);
    const e = COUNT_EMOJIS[rand(0, COUNT_EMOJIS.length - 1)];
    const wrong = uniq([n + 1, n - 1, n + 2], n).map(String);
    out.push({
      prompt: `Count the ${e === '⭐' ? 'stars' : 'objects'}! How many?`,
      display: <span className="text-3xl sm:text-4xl leading-relaxed inline-block max-w-xs">{e.repeat(n)}</span>,
      options: opts3(String(n), wrong),
      answer: String(n),
      explain: `Yes! There are ${n} ${e}${n > 1 ? '' : ''} — count them one by one.`,
    });
  }
  return out;
}

// ---------- Game 2: Addition & Subtraction Challenge ----------
export function makeAddSubQuestions(mode: 'add' | 'sub' | 'mix', max: number, count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const isAdd = mode === 'add' ? true : mode === 'sub' ? false : Math.random() < 0.5;
    let a = rand(1, max), b = rand(1, max), ans: number, text: string, visual: React.ReactNode;
    if (isAdd) {
      ans = a + b;
      text = `${a} + ${b} = ?`;
      visual = <span className="text-2xl">{ '🟢'.repeat(Math.min(a, 10)) } ➕ { '🟢'.repeat(Math.min(b, 10)) }</span>;
    } else {
      if (b > a)[a, b] = [b, a];
      ans = a - b;
      text = `${a} − ${b} = ?`;
      visual = <span className="text-2xl">{ '🍎'.repeat(Math.min(a, 10)) } <span className="line-through opacity-60">{'❌'.repeat(Math.min(b, 10))}</span></span>;
    }
    out.push({
      prompt: text,
      display: visual,
      options: opts3(String(ans), uniq([ans + 1, ans - 1, ans + 2], ans).map(String)),
      answer: String(ans),
      explain: `${text.replace('?', '')} ${ans}. Count the pictures to check!`,
    });
  }
  return out;
}

// ---------- Game 3: Alphabet Quest (letter → object) ----------
const LETTER_WORDS: Record<string, { word: string; emoji: string }> = {
  A: { word: 'Apple', emoji: '🍎' }, B: { word: 'Ball', emoji: '⚽' }, C: { word: 'Cat', emoji: '🐱' },
  D: { word: 'Dog', emoji: '🐕' }, E: { word: 'Elephant', emoji: '🐘' }, F: { word: 'Fish', emoji: '🐟' },
  G: { word: 'Grapes', emoji: '🍇' }, H: { word: 'Hat', emoji: '👒' }, I: { word: 'Ice cream', emoji: '🍦' },
  J: { word: 'Juice', emoji: '🧃' }, K: { word: 'Kite', emoji: '🪁' }, L: { word: 'Lion', emoji: '🦁' },
  M: { word: 'Mango', emoji: '🥭' }, N: { word: 'Nest', emoji: '🪺' }, O: { word: 'Orange', emoji: '🍊' },
  P: { word: 'Pen', emoji: '🖊️' }, Q: { word: 'Queen', emoji: '👑' }, R: { word: 'Rabbit', emoji: '🐇' },
  S: { word: 'Sun', emoji: '☀️' }, T: { word: 'Tiger', emoji: '🐯' }, U: { word: 'Umbrella', emoji: '☂️' },
  V: { word: 'Van', emoji: '🚐' }, W: { word: 'Watch', emoji: '⌚' }, X: { word: 'Xylophone', emoji: '🎵' },
  Y: { word: 'Yo-yo', emoji: '🪀' }, Z: { word: 'Zebra', emoji: '🦓' },
};
export function makeAlphabetQuestions(count: number): QuizItem[] {
  const keys = Object.keys(LETTER_WORDS);
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const k = keys[rand(0, keys.length - 1)];
    const right = LETTER_WORDS[k];
    const decoys = [...keys].filter(x => x !== k).sort(() => Math.random() - 0.5).slice(0, 2).map(x => LETTER_WORDS[x]);
    out.push({
      prompt: `Which one starts with the letter "${k}"?`,
      display: <span className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500 text-white text-5xl font-black flex items-center justify-center shadow-lg">{k}</span>,
      options: [{ label: right.word, value: right.word, emoji: right.emoji }, ...decoys.map(d => ({ label: d.word, value: d.word, emoji: d.emoji }))],
      answer: right.word,
      explain: `${k} is for ${right.word} ${right.emoji}!`,
    });
  }
  return out;
}

// ---------- Game 5: Hindi Akshar Match ----------
const HI_LETTERS: { ak: string; word: string; emoji: string }[] = [
  { ak: 'अ', word: 'अनार', emoji: '🍎' }, { ak: 'आ', word: 'आम', emoji: '🥭' }, { ak: 'इ', word: 'इमली', emoji: '🫘' },
  { ak: 'ई', word: 'ईंट', emoji: '🧱' }, { ak: 'उ', word: 'उल्लू', emoji: '🦉' }, { ak: 'ऊ', word: 'ऊन', emoji: '🧶' },
  { ak: 'ए', word: 'एक', emoji: '1️⃣' }, { ak: 'क', word: 'कमल', emoji: '🪷' }, { ak: 'ख', word: 'खरगोश', emoji: '🐇' },
  { ak: 'ग', word: 'गाय', emoji: '🐄' }, { ak: 'घ', word: 'घर', emoji: '🏠' }, { ak: 'च', word: 'चक्र', emoji: '☸️' },
  { ak: 'छ', word: 'छाता', emoji: '☂️' }, { ak: 'ज', word: 'जहाज़', emoji: '🚢' }, { ak: 'ट', word: 'टोपी', emoji: '🧢' },
  { ak: 'ठ', word: 'ठुमरी', emoji: '💃' }, { ak: 'ड', word: 'डोल', emoji: '🥁' }, { ak: 'त', word: 'तरबूज़', emoji: '🍉' },
  { ak: 'द', word: 'दवात', emoji: '🖋️' }, { ak: 'न', word: 'नाक', emoji: '👃' }, { ak: 'प', word: 'परास', emoji: '🪴' },
  { ak: 'फ', word: 'फल', emoji: '🍏' }, { ak: 'ब', word: 'बकरी', emoji: '🐐' }, { ak: 'म', word: 'मछली', emoji: '🐟' },
  { ak: 'य', word: 'यज्ञ', emoji: '🔥' }, { ak: 'र', word: 'रथ', emoji: '🛞' }, { ak: 'ल', word: 'लड्डू', emoji: '🟡' },
  { ak: 'व', word: 'वन', emoji: '🌳' }, { ak: 'श', word: 'शम्भू? शंख', emoji: '🐚' }, { ak: 'स', word: 'सरसों', emoji: '🌼' },
  { ak: 'ह', word: 'हाथी', emoji: '🐘' },
];
export function makeHindiMatchQuestions(count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const item = HI_LETTERS[rand(0, HI_LETTERS.length - 1)];
    const decoys = HI_LETTERS.filter(x => x.ak !== item.ak).sort(() => Math.random() - 0.5).slice(0, 2);
    out.push({
      prompt: `इस अक्षर से कौन सा शब्द बनता है? (${item.ak})`,
      display: <span className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 text-white text-5xl font-black flex items-center justify-center shadow-lg font-hindi">{item.ak}</span>,
      options: [{ label: `${item.word} ${item.emoji}`, value: item.word }, ...decoys.map(d => ({ label: `${d.word} ${d.emoji}`, value: d.word }))],
      answer: item.word,
      explain: `शाबाश! ${item.ak} से ${item.word} बनता है ${item.emoji}`,
    });
  }
  return out;
}

// ---------- Game 8: Find the Odd One Out ----------
const ODD_GROUPS: { items: { label: string; emoji: string }[]; oddIndex: number; why: string }[] = [
  { items: [{ label: 'Apple', emoji: '🍎' }, { label: 'Mango', emoji: '🥭' }, { label: 'Carrot', emoji: '🥕' }, { label: 'Banana', emoji: '🍌' }], oddIndex: 2, why: 'Carrot is a vegetable, the rest are fruits!' },
  { items: [{ label: 'Dog', emoji: '🐕' }, { label: 'Cat', emoji: '🐈' }, { label: 'Cow', emoji: '🐄' }, { label: 'Table', emoji: '🪑' }], oddIndex: 3, why: 'A table is furniture, the rest are animals!' },
  { items: [{ label: 'Car', emoji: '🚗' }, { label: 'Bus', emoji: '🚌' }, { label: 'Cycle', emoji: '🚲' }, { label: 'Apple', emoji: '🍎' }], oddIndex: 3, why: 'An apple is food, the rest are transport!' },
  { items: [{ label: 'Sun', emoji: '☀️' }, { label: 'Moon', emoji: '🌙' }, { label: 'Star', emoji: '⭐' }, { label: 'Umbrella', emoji: '☂️' }], oddIndex: 3, why: 'An umbrella is an object, the rest are in the sky!' },
  { items: [{ label: 'Pen', emoji: '🖊️' }, { label: 'Pencil', emoji: '✏️' }, { label: 'Eraser', emoji: '🧽' }, { label: 'Spoon', emoji: '🥄' }], oddIndex: 3, why: 'A spoon is for eating, the rest are stationery!' },
  { items: [{ label: 'Rose', emoji: '🌹' }, { label: 'Lotus', emoji: '🪷' }, { label: 'Sunflower', emoji: '🌻' }, { label: 'Ball', emoji: '⚽' }], oddIndex: 3, why: 'A ball is a toy, the rest are flowers!' },
  { items: [{ label: 'Red', emoji: '🔴' }, { label: 'Blue', emoji: '🔵' }, { label: 'Green', emoji: '🟢' }, { label: 'Big', emoji: '📏' }], oddIndex: 3, why: '"Big" is a size, the rest are colours!' },
  { items: [{ label: 'Monday', emoji: '1️⃣' }, { label: 'January', emoji: '📅' }, { label: 'Tuesday', emoji: '2️⃣' }, { label: 'Friday', emoji: '5️⃣' }], oddIndex: 1, why: 'January is a month, the rest are days!' },
  { items: [{ label: 'Lion', emoji: '🦁' }, { label: 'Tiger', emoji: '🐯' }, { label: 'Elephant', emoji: '🐘' }, { label: 'ParROT', emoji: '🦜' }], oddIndex: 3, why: 'A parrot is a bird, the rest are big land animals!' },
  { items: [{ label: 'Eyes', emoji: '👀' }, { label: 'Nose', emoji: '👃' }, { label: 'Ears', emoji: '👂' }, { label: 'Shoes', emoji: '👟' }], oddIndex: 3, why: 'Shoes are footwear, the rest are body parts!' },
  { items: [{ label: 'Rice', emoji: '🍚' }, { label: 'Roti', emoji: '🫓' }, { label: 'Dal', emoji: '🍲' }, { label: 'Plate', emoji: '🍽️' }], oddIndex: 3, why: 'A plate holds food, the rest ARE food!' },
  { items: [{ label: 'Teacher', emoji: '👩‍🏫' }, { label: 'Doctor', emoji: '👨‍⚕️' }, { label: 'Farmer', emoji: '👨‍🌾' }, { label: 'School', emoji: '🏫' }], oddIndex: 3, why: 'A school is a place, the rest are helpers!' },
];
export function makeOddOneOutQuestions(count: number): QuizItem[] {
  const pool = [...ODD_GROUPS].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map(g => ({
    prompt: 'Which one does NOT belong?',
    display: <div className="grid grid-cols-2 gap-3">{g.items.map((it, i) => (
      <div key={i} className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-3 flex flex-col items-center"><span className="text-4xl">{it.emoji}</span><span className="text-sm font-bold text-gray-700 mt-1">{it.label}</span></div>
    ))}</div>,
    options: g.items.map(it => ({ label: `${it.emoji} ${it.label}`, value: it.label })),
    answer: g.items[g.oddIndex].label,
    explain: g.why,
  }));
}

// ---------- Game 10: Animal Sounds Quiz (speech-based + visual fallback) ----------
const ANIMALS: { name: string; emoji: string; sound: string }[] = [
  { name: 'Dog', emoji: '🐕', sound: 'Bhow bhow! Woof woof!' },
  { name: 'Cat', emoji: '🐈', sound: 'Meow meow!' },
  { name: 'Cow', emoji: '🐄', sound: 'Moo moo!' },
  { name: 'Lion', emoji: '🦁', sound: 'Roarrrr!' },
  { name: 'Bird', emoji: '🐦', sound: 'Chirp chirp! Tweet tweet!' },
  { name: 'Frog', emoji: '🐸', sound: 'Croak croak!' },
  { name: 'Snake', emoji: '🐍', sound: 'Hissssss!' },
  { name: 'Rooster', emoji: '🐓', sound: 'Cock-a-doodle-doo!' },
  { name: 'Donkey', emoji: '🫏', sound: 'Bray bray! Hee-haw!' },
  { name: 'Sheep', emoji: '🐑', sound: 'Baa baa!' },
  { name: 'Elephant', emoji: '🐘', sound: 'Trumpet toot toot!' },
  { name: 'Monkey', emoji: '🐒', sound: 'Ooh ooh ah ah!' },
];
export function makeAnimalSoundQuestions(count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const a = ANIMALS[rand(0, ANIMALS.length - 1)];
    const decoys = ANIMALS.filter(x => x.name !== a.name).sort(() => Math.random() - 0.5).slice(0, 2);
    out.push({
      prompt: `Who makes this sound? 🔊 "${a.sound}"`,
      display: <span className="text-5xl animate-bounce">👂</span>,
      options: [{ label: a.name, value: a.name, emoji: a.emoji }, ...decoys.map(d => ({ label: d.name, value: d.name, emoji: d.emoji }))],
      answer: a.name,
      explain: `The ${a.name} ${a.emoji} says "${a.sound}"`,
    });
  }
  return out;
}

// ---------- Game 11: Picture Quiz (EVS/GK visuals) ----------
const PIC_QUIZ: { emoji: string; prompt: string; answer: string; others: string[]; explain: string }[] = [
  { emoji: '🦒', prompt: 'Which animal has the longest neck?', answer: 'Giraffe', others: ['Zebra', 'Deer'], explain: 'A giraffe can reach leaves high up in trees!' },
  { emoji: '🐝', prompt: 'Which insect makes honey for us?', answer: 'Bee', others: ['Butterfly', 'Ant'], explain: 'Bees collect nectar and make sweet honey 🍯' },
  { emoji: '🌻', prompt: 'Which flower turns towards the sun?', answer: 'Sunflower', others: ['Rose', 'Lotus'], explain: 'Sunflowers follow the sun across the sky!' },
  { emoji: '🐧', prompt: 'Which bird lives in cold places and cannot fly?', answer: 'Penguin', others: ['Parrot', 'Eagle'], explain: 'Penguins waddle on ice and swim very fast!' },
  { emoji: '🦇', prompt: 'Which animal sleeps upside down during the day?', answer: 'Bat', others: ['Owl', 'Squirrel'], explain: 'Bats hang upside down and fly at night!' },
  { emoji: '🌈', prompt: 'When do we usually see a rainbow?', answer: 'After rain', others: ['Before rain', 'At noon'], explain: 'Rain + sunshine makes a rainbow!' },
  { emoji: '☂️', prompt: 'What do you take when it rains?', answer: 'Umbrella', others: ['Sunglasses', 'Football'], explain: 'An umbrella keeps you dry in the rain.' },
  { emoji: '🥕', prompt: 'Which food helps your eyes see better?', answer: 'Carrot', others: ['Candy', 'Chips'], explain: 'Carrots have vitamin A which is good for eyes 👀' },
  { emoji: '🦚', prompt: 'Which is India\'s national bird?', answer: 'Peacock', others: ['Crow', 'Sparrow'], explain: 'The beautiful peacock 🦚 is our national bird!' },
  { emoji: '🐄', prompt: 'Which animal gives us milk?', answer: 'Cow', others: ['Dog', 'Hen'], explain: 'Cows give us nutritious milk 🥛' },
  { emoji: '🌙', prompt: 'When do we see the moon brightest?', answer: 'At night', others: ['Morning', 'Noon'], explain: 'The full moon shines bright at night!' },
  { emoji: '🚢', prompt: 'Which vehicle travels on water?', answer: 'Boat', others: ['Bus', 'Train'], explain: 'Boats and ships float and travel on water.' },
];
export function makePictureQuizQuestions(count: number): QuizItem[] {
  const pool = [...PIC_QUIZ].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map(p => ({
    prompt: p.prompt,
    display: <span className="text-7xl">{p.emoji}</span>,
    options: opts3(p.answer, p.others),
    answer: p.answer,
    explain: p.explain,
  }));
}

// ---------- Game 13: Pattern Detective (extended: numbers + colours) ----------
const PATTERNS: { seq: string[]; answer: string; others: string[]; explain: string }[] = [
  { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', others: ['🔴', '🟢'], explain: 'Red-blue, red-blue... next is blue!' },
  { seq: ['🔺', '⭕', '🔺', '⭕', '🔺'], answer: '⭕', others: ['🔺', '🟧'], explain: 'Triangle-circle repeating — next is circle!' },
  { seq: ['🍎', '🍌', '🍇', '🍎', '🍌'], answer: '🍇', others: ['🍎', '🍌'], explain: 'The fruit group repeats — next is grapes!' },
  { seq: ['1', '2', '3', '4'], answer: '5', others: ['3', '7'], explain: 'Counting up by 1 — after 4 comes 5!' },
  { seq: ['2', '4', '6', '8'], answer: '10', others: ['9', '12'], explain: 'Skip counting by 2s — after 8 comes 10!' },
  { seq: ['5', '10', '15', '20'], answer: '25', others: ['22', '30'], explain: 'Skip counting by 5s — next is 25!' },
  { seq: ['10', '20', '30', '40'], answer: '50', others: ['45', '60'], explain: 'Skip counting by 10s — next is 50!' },
  { seq: ['☀️', '🌙', '☀️', '🌙', '☀️'], answer: '🌙', others: ['☀️', '⭐'], explain: 'Day-night-day-night... next is night!' },
  { seq: ['🟥', '🟦', '🟨', '🟥', '🟦'], answer: '🟨', others: ['🟥', '🟦'], explain: 'Red-blue-yellow repeat — next is yellow!' },
  { seq: ['A', 'B', 'C', 'D'], answer: 'E', others: ['F', 'C'], explain: 'Alphabet order — after D comes E!' },
  { seq: ['🐱', '🐶', '🐰', '🐱', '🐶'], answer: '🐰', others: ['🐱', '🐶'], explain: 'Cat-dog-rabbit repeat — next is rabbit!' },
  { seq: ['1', '3', '5', '7'], answer: '9', others: ['8', '11'], explain: 'Odd numbers going up — next is 9!' },
];
export function makePatternQuestions(count: number): QuizItem[] {
  const pool = [...PATTERNS].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map(p => ({
    prompt: 'What comes NEXT in the pattern?',
    display: <div className="flex gap-2 text-3xl sm:text-4xl flex-wrap justify-center items-center">{p.seq.map((s, i) => <span key={i} className="bg-purple-50 border-2 border-purple-100 rounded-xl px-2 py-1 font-black">{s}</span>)}<span className="bg-amber-100 border-2 border-dashed border-amber-400 rounded-xl px-3 py-1 font-black text-amber-600">?</span></div>,
    options: opts3(p.answer, p.others),
    answer: p.answer,
    explain: p.explain,
  }));
}

// ---------- Game 15: Shadow Matching (silhouette of dark emoji) ----------
const SHADOWS: { name: string; emoji: string; shadow: string }[] = [
  { name: 'Elephant', emoji: '🐘', shadow: '🌑' }, { name: 'Rabbit', emoji: '🐇', shadow: '🌑' },
  { name: 'Cat', emoji: '🐈', shadow: '🌑' }, { name: 'Bird', emoji: '🐦', shadow: '🌑' },
  { name: 'Fish', emoji: '🐟', shadow: '🌑' }, { name: 'Apple', emoji: '🍎', shadow: '🌑' },
  { name: 'Car', emoji: '🚗', shadow: '🌑' }, { name: 'Banana', emoji: '🍌', shadow: '🌑' },
];
export function makeShadowQuestions(count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const s = SHADOWS[rand(0, SHADOWS.length - 1)];
    const decoys = SHADOWS.filter(x => x.name !== s.name).sort(() => Math.random() - 0.5).slice(0, 2);
    out.push({
      prompt: 'Whose shadow is this?',
      display: <span className="text-8xl grayscale brightness-0 opacity-80 drop-shadow-lg">{s.emoji}</span>,
      options: [{ label: s.name, value: s.name, emoji: s.emoji }, ...decoys.map(d => ({ label: d.name, value: d.name, emoji: d.emoji }))],
      answer: s.name,
      explain: `That silhouette was the ${s.name} ${s.emoji}!`,
    });
  }
  return out;
}

// ---------- Game 17: Science Explorer (from GK/EVS bank) ----------
export function makeScienceQuestions(count: number): QuizItem[] {
  const facts: QuizItem[] = [
    { prompt: 'Plants need sunlight, air and ___ to grow.', options: opts3('water', ['fire', 'candy']), answer: 'water', explain: 'Water helps plants grow tall and strong 🌱' },
    { prompt: 'Which part of a plant is under the soil?', options: opts3('Roots', ['Leaves', 'Flower']), answer: 'Roots', explain: 'Roots drink water from the soil 🌳' },
    { prompt: 'How many senses do we have?', options: opts3('5', ['3', '8']), answer: '5', explain: 'See, hear, smell, taste and touch! 👁️👂👃👅✋' },
    { prompt: 'Which is a source of light?', options: opts3('Sun', ['Moon only', 'Stone']), answer: 'Sun', explain: 'The Sun gives us light and heat ☀️' },
    { prompt: 'We breathe with our...', options: opts3('Lungs', ['Ears', 'Hair']), answer: 'Lungs', explain: 'Lungs help us breathe air 🫁' },
    { prompt: 'Which one floats on water?', options: opts3('Wood', ['Stone', 'Iron ball']), answer: 'Wood', explain: 'Wood is light — it floats! 🪵' },
    { prompt: 'Ice melting turns into...', options: opts3('Water', ['Steam', 'Sand']), answer: 'Water', explain: 'Solid ice becomes liquid water 🧊→💧' },
    { prompt: 'Which season makes leaves fall?', options: opts3('Winter/Autumn', ['Spring', 'Monsoon']), answer: 'Winter/Autumn', explain: 'In colder months trees shed their leaves 🍂' },
    { prompt: 'A magnet sticks to...', options: opts3('Iron', ['Wood', 'Plastic']), answer: 'Iron', explain: 'Magnets attract iron things like pins 🧲' },
    { prompt: 'Where does rain come from?', options: opts3('Clouds', ['Mountains', 'Rivers']), answer: 'Clouds', explain: 'Water vapour rises and forms clouds → rain 🌧️' },
    { prompt: 'Which animal lays eggs?', options: opts3('Hen', ['Cow', 'Dog']), answer: 'Hen', explain: 'Birds like hens lay eggs 🥚🐔' },
    { prompt: 'Our Earth is shaped like a...', options: opts3('Ball (round)', ['Flat plate', 'Box']), answer: 'Ball (round)', explain: 'Earth is a round sphere 🌍' },
  ];
  return [...facts].sort(() => Math.random() - 0.5).slice(0, count);
}

// ---------- Game 18: Listen and Choose (TTS) ----------
export function makeListenQuestions(count: number): QuizItem[] {
  const words = ['cat', 'dog', 'sun', 'ball', 'apple', 'mango', 'fish', 'bird', 'red', 'blue', 'one', 'five', 'ten', 'book', 'pen'];
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const w = words[rand(0, words.length - 1)];
    const decoys = words.filter(x => x !== w).sort(() => Math.random() - 0.5).slice(0, 2);
    out.push({
      prompt: `Tap 🔊 to listen, then choose the word you hear!`,
      display: <ListenButton text={w} />,
      options: [{ label: w.toUpperCase(), value: w }, ...decoys.map(d => ({ label: d.toUpperCase(), value: d }))],
      answer: w,
      explain: `You heard "${w}" 👏`,
    });
  }
  return out;
}

import React from 'react';
import { speak } from '../utils/store';
function ListenButton({ text }: { text: string }) {
  return (
    <button onClick={() => speak(text)} className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-5xl text-white shadow-lg active:scale-90 transition-transform cursor-pointer" aria-label="Play sound">
      🔊
    </button>
  );
}

// ---------- Game 19: Memory & Observation (see objects, then recall) ----------
const OBS_SET = ['🍎', '🐱', '⚽', '🌸', '🚗', '🐟', '⭐', '🎈', '🦁', '🍌', '🌙', '🐘'];
export function makeObservationQuestions(count: number): QuizItem[] {
  const out: QuizItem[] = [];
  for (let i = 0; i < count; i++) {
    const shown = [...OBS_SET].sort(() => Math.random() - 0.5).slice(0, 4);
    const target = shown[rand(0, shown.length - 1)];
    const absent = OBS_SET.filter(x => !shown.includes(x));
    const decoy = absent[rand(0, absent.length - 1)];
    out.push({
      prompt: 'Remember these 4 objects… Which one was NOT shown?',
      display: <ObserveCard emojis={shown} />,
      options: [{ label: decoy, value: decoy }, ...shown.slice(0, 2).map(s => ({ label: s, value: s }))],
      answer: decoy,
      explain: `${decoy} was not in the group. You saw: ${shown.join(' ')}`,
    });
  }
  return out;
}
function ObserveCard({ emojis }: { emojis: string[] }) {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, [emojis]);
  return visible ? (
    <div className="flex gap-3 text-5xl bg-blue-50 border-2 border-blue-200 rounded-2xl px-5 py-4">{emojis.map((e, i) => <span key={i}>{e}</span>)}</div>
  ) : (
    <button onClick={() => setVisible(true)} className="px-5 py-3 rounded-2xl bg-blue-100 text-blue-700 font-black cursor-pointer active:scale-95">👀 Show again</button>
  );
}

// ---------- Game 16: Shape Builder quiz (which shapes make X) ----------
export function makeShapeBuilderQuestions(count: number): QuizItem[] {
  const combos: QuizItem[] = [
    { prompt: 'Which 2 shapes make a house? 🏠', options: opts3('Square + Triangle', ['Circle + Oval', 'Line + Dot']), answer: 'Square + Triangle', explain: 'A square body with a triangle roof = house!' },
    { prompt: 'A car needs wheels. What shape are wheels?', options: opts3('Circle ⭕', ['Square 🟧', 'Star ⭐']), answer: 'Circle ⭕', explain: 'Round wheels roll smoothly!' },
    { prompt: 'Which shapes build a rocket? 🚀', options: opts3('Rectangle + Triangle', ['Circle + Line', 'Oval + Dot']), answer: 'Rectangle + Triangle', explain: 'Rectangle body + triangle nose cone!' },
    { prompt: 'A tree is made of a trunk (rectangle) and a round...' , options: opts3('Circle top ⭕', ['Square top 🟧'], ), answer: 'Circle top ⭕', explain: 'Trunk + round leafy top = tree 🌳' },
    { prompt: 'Which shape rolls the fastest?', options: opts3('Circle ⭕', ['Triangle 🔺', 'Square 🟧']), answer: 'Circle ⭕', explain: 'Circles have no corners — they roll!' },
    { prompt: 'How many triangles make a sandwich from a square bread?', options: opts3('2', ['1', '4']), answer: '2', explain: 'Cut across the middle — 2 triangles!' },
    { prompt: 'Which shapes tile a floor with no gaps?', options: opts3('Squares 🟧', ['Circles ⭕', 'Ovals 🥚']), answer: 'Squares 🟧', explain: 'Squares fit perfectly side by side!' },
    { prompt: 'A diamond kite is which shape?', options: opts3('Diamond 🔄', ['Circle ⭕', 'Star ⭐']), answer: 'Diamond 🔄', explain: 'Kites are usually diamond-shaped 🪁' },
  ];
  return [...combos].sort(() => Math.random() - 0.5).slice(0, count);
}

// ---------- Game 9: Sorting quiz (tap category) ----------
export function makeSortingQuestions(count: number): QuizItem[] {
  const groups: QuizItem[] = [
    { prompt: 'Sort it! Which box does 🥕 go in?', options: [{ label: 'Vegetables 🥗', value: 'veg' }, { label: 'Fruits 🍎', value: 'fruit' }, { label: 'Toys 🧸', value: 'toy' }], answer: 'veg', explain: 'Carrot is a vegetable!' },
    { prompt: 'Sort it! Which box does 🍌 go in?', options: [{ label: 'Vegetables 🥗', value: 'veg' }, { label: 'Fruits 🍎', value: 'fruit' }, { label: 'Clothes 👕', value: 'cloth' }], answer: 'fruit', explain: 'Banana is a fruit!' },
    { prompt: 'Sort it! Which box does 👕 go in?', options: [{ label: 'Clothes 👕', value: 'cloth' }, { label: 'Food 🍲', value: 'food' }, { label: 'Animals 🐾', value: 'animal' }], answer: 'cloth', explain: 'A T-shirt is clothing!' },
    { prompt: 'Sort it! Which box does 🐄 go in?', options: [{ label: 'Wild animals 🌳', value: 'wild' }, { label: 'Farm animals 🚜', value: 'farm' }, { label: 'Pets 🏠', value: 'pet' }], answer: 'farm', explain: 'Cows live on farms!' },
    { prompt: 'Sort it! Which box does 🦁 go in?', options: [{ label: 'Wild animals 🌳', value: 'wild' }, { label: 'Farm animals 🚜', value: 'farm' }, { label: 'Birds 🪺', value: 'bird' }], answer: 'wild', explain: 'Lions live in the wild/jungle!' },
    { prompt: 'Sort it! Which box does ✏️ go in?', options: [{ label: 'Stationery 📚', value: 'stat' }, { label: 'Kitchen 🍳', value: 'kitchen' }, { label: 'Sports 🏅', value: 'sports' }], answer: 'stat', explain: 'A pencil is stationery for writing!' },
    { prompt: 'Sort it! Where does 🔴 go?', options: [{ label: 'Colours 🎨', value: 'colour' }, { label: 'Numbers 🔢', value: 'number' }, { label: 'Shapes 📐', value: 'shape' }], answer: 'colour', explain: 'Red is a colour!' },
    { prompt: 'Sort it! Where does 7️⃣ go?', options: [{ label: 'Colours 🎨', value: 'colour' }, { label: 'Numbers 🔢', value: 'number' }, { label: 'Shapes 📐', value: 'shape' }], answer: 'number', explain: 'Seven is a number!' },
  ];
  return [...groups].sort(() => Math.random() - 0.5).slice(0, count);
}

// ---------- Game 20: Daily Challenge — mixed subjects ----------
export function makeDailyChallenge(): QuizItem[] {
  return [
    ...makeCountQuestions(10, 1),
    ...makeAddSubQuestions('mix', 10, 1),
    ...makeAlphabetQuestions(1),
    ...makeHindiMatchQuestions(1),
    ...makePictureQuizQuestions(1),
  ].sort(() => Math.random() - 0.5);
}
