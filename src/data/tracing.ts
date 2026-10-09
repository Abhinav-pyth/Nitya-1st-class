// Finger-tracing guides for the Handwriting Studio.
// Each glyph is drawn as a big centered character on the canvas background;
// children trace over it with their finger/mouse. No stroke recognition is
// claimed — this is guided practice + free drawing, exactly as specified.

export interface TraceItem {
  char: string;      // what to trace (letter / अक्षर / number)
  label: string;     // phonics or word hint shown under the guide
  say: string;       // text-to-speech content
  lang: 'en-IN' | 'hi-IN';
}

export const ENGLISH_TRACES: TraceItem[] = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('').map((c) => {
  const words: Record<string, string> = {
    A: 'for Apple 🍎', B: 'for Ball ⚽', C: 'for Cat 🐱', D: 'for Dog 🐶', E: 'for Elephant 🐘',
    F: 'for Fish 🐟', G: 'for Goat 🐐', H: 'for Hat 🎩', I: 'for Ice-cream 🍦', J: 'for Jug 🫙',
    K: 'for Kite 🪁', L: 'for Lion 🦁', M: 'for Monkey 🐵', N: 'for Nest 🪺', O: 'for Orange 🍊',
    P: 'for Pen 🖊️', Q: 'for Queen 👑', R: 'for Rabbit 🐰', S: 'for Sun ☀️', T: 'for Tap 🚰',
    U: 'for Umbrella ☂️', V: 'for Van 🚐', W: 'for Watch ⌚', X: 'for Xylophone 🎵', Y: 'for Yo-yo 🪀', Z: 'for Zebra 🦓',
  };
  return { char: c, label: `${c}${c.toLowerCase()} — ${words[c] || ''}`, say: `${c}. ${words[c]?.replace(/ .*/, '') || ''}`, lang: 'en-IN' as const };
});

export const HINDI_TRACES: TraceItem[] = [
  ['अ', 'अनार'], ['आ', 'आम'], ['इ', 'इमली'], ['ई', 'ईख'], ['उ', 'उल्लू'], ['ऊ', 'ऊन'],
  ['ए', 'एक'], ['ऐ', 'ऐनक'], ['ओ', 'औरत'], ['औ', 'और'], ['क', 'कमल'], ['ख', 'खरगोश'],
  ['ग', 'गाय'], ['घ', 'घर'], ['च', 'चम्मच'], ['छ', 'छाता'], ['ज', 'जहाज़'], ['झ', 'झंडा'],
  ['ट', 'टमाटर'], ['ठ', 'ठेला'], ['ड', 'डोल'], ['ढ', 'ढक'], ['ण', 'भूषण'], ['त', 'तरबूज़'],
  ['थ', 'थापड़ा'], ['द', 'दवात'], ['ध', 'धनुष'], ['न', 'नाक'], ['प', 'फलक पर प'], ['फ', 'फल'],
  ['ब', 'बकरी'], ['भ', 'भालू'], ['म', 'मछली'], ['य', 'यज्ञ'], ['र', 'रथ'], ['ल', 'लड़का'],
  ['व', 'वन'], ['श', 'शम्भा'], ['ष', 'षष्ठी'], ['स', 'सूरज'], ['ह', 'हथौड़ा'],
].map(([char, word]) => ({
  char, label: `${char} — ${word}`, say: char, lang: 'hi-IN' as const,
}));

export const NUMBER_TRACES: TraceItem[] = Array.from({ length: 21 }, (_, i) => String(i)).map((n) => ({
  char: n,
  label: `Number ${n}`,
  say: n,
  lang: 'en-IN' as const,
}));
