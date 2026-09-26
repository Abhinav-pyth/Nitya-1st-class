import { Lesson } from '../types';

export const hindiSwar = [
  { letter: 'अ', word: 'अनार', meaning: 'Pomegranate', emoji: '🍎' },
  { letter: 'आ', word: 'आम', meaning: 'Mango', emoji: '🥭' },
  { letter: 'इ', word: 'इमली', meaning: 'Tamarind', emoji: '🌿' },
  { letter: 'ई', word: 'ईख', meaning: 'Sugarcane', emoji: '🎋' },
  { letter: 'उ', word: 'उल्लू', meaning: 'Owl', emoji: '🦉' },
  { letter: 'ऊ', word: 'ऊन', meaning: 'Wool', emoji: '🧶' },
  { letter: 'ए', word: 'एक', meaning: 'One', emoji: '1️⃣' },
  { letter: 'ऐ', word: 'ऐनक', meaning: 'Spectacles', emoji: '👓' },
  { letter: 'ओ', word: 'ओठ', meaning: 'Lips', emoji: '👄' },
  { letter: 'औ', word: 'औरत', meaning: 'Woman', emoji: '👩' },
  { letter: 'अं', word: 'अंगूर', meaning: 'Grapes', emoji: '🍇' },
  { letter: 'अः', word: 'दुःख', meaning: 'Sadness', emoji: '😢' },
];

export const hindiVyanjan = [
  { letter: 'क', word: 'कमल', emoji: '🪷' },
  { letter: 'ख', word: 'खरगोश', emoji: '🐰' },
  { letter: 'ग', word: 'गमला', emoji: '🪴' },
  { letter: 'घ', word: 'घर', emoji: '🏠' },
  { letter: 'ङ', word: 'संग', emoji: '🤝' },
  { letter: 'च', word: 'चम्मच', emoji: '🥄' },
  { letter: 'छ', word: 'छतरी', emoji: '☂️' },
  { letter: 'ज', word: 'जहाज़', emoji: '🚢' },
  { letter: 'झ', word: 'झंडा', emoji: '🏳️' },
  { letter: 'ञ', word: 'ज्ञान', emoji: '📖' },
  { letter: 'ट', word: 'टोपी', emoji: '🧢' },
  { letter: 'ठ', word: 'ठंडा', emoji: '🧊' },
  { letter: 'ड', word: 'डमरू', emoji: '🥁' },
  { letter: 'ढ', word: 'ढोल', emoji: '🪘' },
  { letter: 'ण', word: 'फण', emoji: '🐍' },
  { letter: 'त', word: 'तारा', emoji: '⭐' },
  { letter: 'थ', word: 'थैला', emoji: '👜' },
  { letter: 'द', word: 'दवात', emoji: '🖋️' },
  { letter: 'ध', word: 'धनुष', emoji: '🏹' },
  { letter: 'न', word: 'नल', emoji: '🚰' },
  { letter: 'प', word: 'पतंग', emoji: '🪁' },
  { letter: 'फ', word: 'फल', emoji: '🍎' },
  { letter: 'ब', word: 'बकरा', emoji: '🐐' },
  { letter: 'भ', word: 'भालू', emoji: '🐻' },
  { letter: 'म', word: 'मछली', emoji: '🐟' },
  { letter: 'य', word: 'यान', emoji: '🚀' },
  { letter: 'र', word: 'रस्सी', emoji: '🪢' },
  { letter: 'ल', word: 'लट्टू', emoji: '🌀' },
  { letter: 'व', word: 'वन', emoji: '🌳' },
  { letter: 'श', word: 'शेर', emoji: '🦁' },
  { letter: 'ष', word: 'षट्कोण', emoji: '⬡' },
  { letter: 'स', word: 'सेब', emoji: '🍏' },
  { letter: 'ह', word: 'हाथी', emoji: '🐘' },
  { letter: 'क्ष', word: 'क्षीर', emoji: '🥛' },
  { letter: 'त्र', word: 'त्रिशूल', emoji: '🔱' },
  { letter: 'ज्ञ', word: 'ज्ञान', emoji: '📚' },
];

export const hindiMatras = [
  {
    id: 'aa-matra',
    name: 'आ की मात्रा',
    symbol: 'ा',
    base: 'क',
    result: 'का',
    examples: ['का', 'का', 'का', 'ता', 'ना', 'पा'],
    words: ['काम', 'नाम', 'ताला', 'पानी', 'आम'],
    practice: 'क → का → काम'
  },
  {
    id: 'i-matra',
    name: 'इ की मात्रा',
    symbol: 'ि',
    base: 'क',
    result: 'कि',
    examples: ['कि', 'ति', 'नि', 'पि', 'मि'],
    words: ['कितना', 'टिकट', 'नदी', 'मिट्टी', 'गिलहरी'],
    practice: 'क → कि → कितना'
  },
  {
    id: 'ee-matra',
    name: 'ई की मात्रा',
    symbol: 'ी',
    base: 'क',
    result: 'की',
    examples: ['की', 'ती', 'नी', 'पी', 'मी'],
    words: ['कीमत', 'मीठी', 'नदी', 'झोली', 'टोपी'],
    practice: 'क → की → कीमत'
  },
  {
    id: 'u-matra',
    name: 'उ की मात्रा',
    symbol: 'ु',
    base: 'क',
    result: 'कु',
    examples: ['कु', 'तु', 'नु', 'पु', 'मु'],
    words: ['कुत्ता', 'सुबह', 'गुलाब', 'तुला', 'मुंह'],
    practice: 'क → कु → कुत्ता'
  },
  {
    id: 'oo-matra',
    name: 'ऊ की मात्रा',
    symbol: 'ू',
    base: 'क',
    result: 'कू',
    examples: ['कू', 'तू', 'नू', 'पू', 'मू'],
    words: ['कूआं', 'भूरा', 'झूला', 'मूंग', 'धूल'],
    practice: 'क → कू → कूआं'
  },
  {
    id: 'e-matra',
    name: 'ए की मात्रा',
    symbol: 'े',
    base: 'क',
    result: 'के',
    examples: ['के', 'ते', 'ने', 'पे', 'मे'],
    words: ['केला', 'सेब', 'मेज़', 'पेड़', 'नेता'],
    practice: 'क → के → केला'
  },
  {
    id: 'ai-matra',
    name: 'ऐ की मात्रा',
    symbol: 'ै',
    base: 'क',
    result: 'कै',
    examples: ['कै', 'तै', 'नै', 'पै', 'मै'],
    words: ['कैला', 'पैसा', 'मैना', 'तैया', 'नैक'],
    practice: 'क → कै → कैला'
  },
  {
    id: 'o-matra',
    name: 'ओ की मात्रा',
    symbol: 'ो',
    base: 'क',
    result: 'को',
    examples: ['को', 'तो', 'नो', 'पो', 'मो'],
    words: ['कोयल', 'मोर', 'तोता', 'रोज़', 'पोस्ट'],
    practice: 'क → को → कोयल'
  },
  {
    id: 'au-matra',
    name: 'औ की मात्रा',
    symbol: 'ौ',
    base: 'क',
    result: 'कौ',
    examples: ['कौ', 'तौ', 'नौ', 'पौ', 'मौ'],
    words: ['कौवा', 'मौसी', 'तौल', 'नौकर', 'पौधा'],
    practice: 'क → कौ → कौवा'
  },
];

export const hindiWords = [
  // 2-letter words
  { word: 'कम', meaning: 'Less', emoji: '📉' },
  { word: 'घर', meaning: 'Home', emoji: '🏠' },
  { word: 'जल', meaning: 'Water', emoji: '💧' },
  { word: 'फल', meaning: 'Fruit', emoji: '🍎' },
  { word: 'दल', meaning: 'Group', emoji: '👥' },
  { word: 'नल', meaning: 'Tap', emoji: '🚰' },
  { word: 'पल', meaning: 'Moment', emoji: '⏱️' },
  { word: 'कल', meaning: 'Yesterday/Tomorrow', emoji: '📅' },
  // 3-letter words
  { word: 'कमल', meaning: 'Lotus', emoji: '🪷' },
  { word: 'नमन', meaning: 'Bow', emoji: '🙏' },
  { word: 'गगन', meaning: 'Sky', emoji: '🌌' },
  { word: 'मटर', meaning: 'Peas', emoji: '🫛' },
  { word: 'अमर', meaning: 'Immortal', emoji: '✨' },
  { word: 'समय', meaning: 'Time', emoji: '⏰' },
  { word: 'नगर', meaning: 'City', emoji: '🏙️' },
  { word: 'पलक', meaning: 'Eyelash', emoji: '👁️' },
];

export const hindiSentences = [
  { sentence: 'यह घर है।', meaning: 'This is a house.', emoji: '🏠' },
  { sentence: 'यह फल है।', meaning: 'This is a fruit.', emoji: '🍎' },
  { sentence: 'राम खेलता है।', meaning: 'Ram plays.', emoji: '🏏' },
  { sentence: 'सीता पढ़ती है।', meaning: 'Sita reads.', emoji: '📖' },
  { sentence: 'मैं जाता हूँ।', meaning: 'I go.', emoji: '🚶' },
  { sentence: 'पंछी उड़ता है।', meaning: 'The bird flies.', emoji: '🐦' },
  { sentence: 'बिल्ली दूध पीती है।', meaning: 'The cat drinks milk.', emoji: '🐱' },
  { sentence: 'सूरज चमकता है।', meaning: 'The sun shines.', emoji: '☀️' },
];

export const hindiReadingPassages = [
  {
    title: 'मेरा घर',
    text: 'यह मेरा घर है। घर छोटा है। घर साफ़ है। मैं घर में खेलता हूँ।',
    questions: [
      { q: 'घर कैसा है?', a: 'छोटा' },
      { q: 'कौन खेलता है?', a: 'मैं' },
    ]
  },
  {
    title: 'मेरी बिल्ली',
    text: 'मेरी एक बिल्ली है। बिल्ली सफ़ेद है। बिल्ली दूध पीती है। बिल्ली म्याऊँ करती है।',
    questions: [
      { q: 'बिल्ली किस रंग की है?', a: 'सफ़ेद' },
      { q: 'बिल्ली क्या पीती है?', a: 'दूध' },
    ]
  },
  {
    title: 'स्कूल',
    text: 'मेरा स्कूल बड़ा है। स्कूल में कई बच्चे हैं। मैं पढ़ता हूँ। मैं खेलता हूँ।',
    questions: [
      { q: 'स्कूल कैसा है?', a: 'बड़ा' },
      { q: 'स्कूल में कौन है?', a: 'बच्चे' },
    ]
  },
];

export const hindiLessons: Lesson[] = [
  {
    id: 'h1',
    subject: 'hindi',
    unit: 'स्वर',
    topic: 'अ से अनार',
    title: 'अ की पहचान और लेखन',
    difficulty: 'easy',
    duration: 10,
    explanation: 'अ हिंदी वर्णमाला का पहला अक्षर है। अ से अनार होता है।',
    examples: ['अ से अनार 🍎', 'अ से अजगर 🐍', 'अ से अलमारी 🗄️'],
    activities: ['अ को 5 बार लिखें', 'अनार की तस्वीर बनाएं', 'अ से शुरू होने वाले शब्द बोलें'],
    questions: [
      { id: 'h1q1', type: 'mcq', question: 'अ से क्या होता है?', options: ['अनार', 'आम', 'इमली'], answer: 'अनार' },
      { id: 'h1q2', type: 'write', question: 'अ लिखें', answer: 'अ' },
    ],
    prerequisites: [],
    parentGuide: ['बच्चे को बड़ा अ दिखाएं', 'अंगुली से हवा में अ लिखवाएं', 'अनार दिखाकर बोलें - अ से अनार', 'कॉपी में 5 बार लिखवाएं']
  },
  {
    id: 'h2',
    subject: 'hindi',
    unit: 'स्वर',
    topic: 'आ से आम',
    title: 'आ की पहचान और लेखन',
    difficulty: 'easy',
    duration: 10,
    explanation: 'आ हिंदी वर्णमाला का दूसरा अक्षर है। आ से आम होता है।',
    examples: ['आ से आम 🥭', 'आ से आलू 🥔', 'आ से आग 🔥'],
    activities: ['आ को 5 बार लिखें', 'आम की तस्वीर बनाएं', 'आ से शुरू होने वाले शब्द बोलें'],
    questions: [
      { id: 'h2q1', type: 'mcq', question: 'आ से क्या होता है?', options: ['आम', 'अनार', 'ईख'], answer: 'आम' },
      { id: 'h2q2', type: 'write', question: 'आ लिखें', answer: 'आ' },
    ],
    prerequisites: ['h1'],
    parentGuide: ['अ और आ में अंतर बताएं', 'आ बड़ा है, अ छोटा है', 'आम दिखाएं - आ से आम']
  },
  {
    id: 'h3',
    subject: 'hindi',
    unit: 'स्वर',
    topic: 'इ से इमली',
    title: 'इ की पहचान और लेखन',
    difficulty: 'easy',
    duration: 10,
    explanation: 'इ हिंदी वर्णमाला का तीसरा अक्षर है। इ से इमली होती है।',
    examples: ['इ से इमली 🌿', 'इ से ईंट 🧱', 'इ से इमारत 🏢'],
    activities: ['इ को 5 बार लिखें', 'इमली की तस्वीर बनाएं'],
    questions: [
      { id: 'h3q1', type: 'mcq', question: 'इ से क्या होता है?', options: ['इमली', 'आम', 'अनार'], answer: 'इमली' },
      { id: 'h3q2', type: 'write', question: 'इ लिखें', answer: 'इ' },
    ],
    prerequisites: ['h2'],
    parentGuide: ['अ, आ, इ तीनों दिखाएं', 'हर अक्षर को पहचानने को कहें']
  },
  {
    id: 'h4',
    subject: 'hindi',
    unit: 'स्वर',
    topic: 'ई से ईख',
    title: 'ई की पहचान और लेखन',
    difficulty: 'easy',
    duration: 10,
    explanation: 'ई हिंदी वर्णमाला का चौथा अक्षर है। ई से ईख होती है।',
    examples: ['ई से ईख 🎋', 'ई से ईंट 🧱', 'ई से ईश्वर 🙏'],
    activities: ['ई को 5 बार लिखें', 'इ और ई में अंतर बताएं'],
    questions: [
      { id: 'h4q1', type: 'mcq', question: 'ई से क्या होता है?', options: ['ईख', 'इमली', 'आम'], answer: 'ईख' },
      { id: 'h4q2', type: 'write', question: 'ई लिखें', answer: 'ई' },
    ],
    prerequisites: ['h3'],
    parentGuide: ['इ छोटा है, ई बड़ा है - दोनों दिखाएं']
  },
  {
    id: 'h5',
    subject: 'hindi',
    unit: 'स्वर',
    topic: 'उ से उल्लू',
    title: 'उ की पहचान और लेखन',
    difficulty: 'easy',
    duration: 10,
    explanation: 'उ हिंदी वर्णमाला का पांचवां अक्षर है। उ से उल्लू होता है।',
    examples: ['उ से उल्लू 🦉', 'उ से ऊन 🧶', 'उ से उपल 🪨'],
    activities: ['उ को 5 बार लिखें', 'उल्लू की तस्वीर बनाएं'],
    questions: [
      { id: 'h5q1', type: 'mcq', question: 'उ से क्या होता है?', options: ['उल्लू', 'ईख', 'अनार'], answer: 'उल्लू' },
      { id: 'h5q2', type: 'write', question: 'उ लिखें', answer: 'उ' },
    ],
    prerequisites: ['h4'],
    parentGuide: ['उ और ऊ में अंतर बताएं']
  },
  {
    id: 'h6',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'आ की मात्रा',
    title: 'आ की मात्रा (ा) - पहले से सीखें',
    difficulty: 'medium',
    duration: 15,
    explanation: 'जब हम किसी अक्षर के बाद आ की मात्रा लगाते हैं, तो दाईं तरफ एक खड़ी लकीर लगती है। जैसे: क + ा = का',
    examples: ['क → का', 'त → ता', 'न → ना', 'प → पा', 'म → मा'],
    activities: ['का लिखें 5 बार', 'ता लिखें 5 बार', 'ना लिखें 5 बार', 'काम शब्द लिखें', 'नाम शब्द लिखें'],
    questions: [
      { id: 'h6q1', type: 'mcq', question: 'क + ा = ?', options: ['का', 'कि', 'कु'], answer: 'का' },
      { id: 'h6q2', type: 'mcq', question: 'काम में कौन सी मात्रा है?', options: ['आ की मात्रा', 'इ की मात्रा', 'उ की मात्रा'], answer: 'आ की मात्रा' },
      { id: 'h6q3', type: 'fill', question: 'त + ा = ___', answer: 'ता' },
      { id: 'h6q4', type: 'write', question: 'नाम लिखें', answer: 'नाम' },
    ],
    prerequisites: ['h1', 'h2'],
    parentGuide: [
      'पहले क दिखाएं, फिर का दिखाएं',
      'बच्चे से पूछें - क्या बदला?',
      'बताएं - दाईं तरफ लकीर आई',
      'काम, नाम, ताल शब्द पढ़वाएं',
      'गलत मात्रा लगाने पर डांटें नहीं, सही दिखाएं'
    ]
  },
  {
    id: 'h7',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'इ की मात्रा',
    title: 'इ की मात्रा (ि) - बाईं तरफ',
    difficulty: 'medium',
    duration: 15,
    explanation: 'इ की मात्रा अक्षर के बाईं तरफ लगती है। जैसे: क + ि = कि (पहले कि लिखें, फिर क)',
    examples: ['क → कि', 'त → ति', 'न → नि', 'प → पि', 'म → मि'],
    activities: ['कि लिखें 5 बार', 'ति लिखें 5 बार', 'नदी शब्द लिखें', 'मिट्टी शब्द लिखें'],
    questions: [
      { id: 'h7q1', type: 'mcq', question: 'क + ि = ?', options: ['कि', 'का', 'की'], answer: 'कि' },
      { id: 'h7q2', type: 'mcq', question: 'इ की मात्रा कहाँ लगती है?', options: ['बाईं तरफ', 'दाईं तरफ', 'ऊपर'], answer: 'बाईं तरफ' },
      { id: 'h7q3', type: 'fill', question: 'न + ि = ___', answer: 'नि' },
      { id: 'h7q4', type: 'write', question: 'नदी लिखें', answer: 'नदी' },
    ],
    prerequisites: ['h6'],
    parentGuide: [
      'बताएं - इ की मात्रा बाईं तरफ जाती है',
      'लिखते समय पहले मात्रा, फिर अक्षर',
      'नदी, टिकट, गिलहरी शब्द पढ़वाएं',
      'आ और इ मात्रा में अंतर दिखाएं: का vs कि'
    ]
  },
  {
    id: 'h8',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'ई की मात्रा',
    title: 'ई की मात्रा (ी) - दाईं तरफ दो लकीर',
    difficulty: 'medium',
    duration: 15,
    explanation: 'ई की मात्रा अक्षर के दाईं तरफ लगती है - दो खड़ी लकीरें। जैसे: क + ी = की',
    examples: ['क → की', 'त → ती', 'न → नी', 'प → पी', 'म → मी'],
    activities: ['की लिखें 5 बार', 'ती लिखें 5 बार', 'मीठी शब्द लिखें', 'टोपी शब्द लिखें'],
    questions: [
      { id: 'h8q1', type: 'mcq', question: 'क + ी = ?', options: ['की', 'कि', 'का'], answer: 'की' },
      { id: 'h8q2', type: 'mcq', question: 'कि और की में क्या अंतर है?', options: ['कि में एक लकीर, की में दो', 'कोई अंतर नहीं', 'कि दाईं तरफ'], answer: 'कि में एक लकीर, की में दो' },
      { id: 'h8q3', type: 'fill', question: 'म + ी = ___', answer: 'मी' },
      { id: 'h8q4', type: 'write', question: 'टोपी लिखें', answer: 'टोपी' },
    ],
    prerequisites: ['h7'],
    parentGuide: [
      'कि (एक लकीर) और की (दो लकीर) में अंतर दिखाएं',
      'बच्चे को दोनों लिखवाएं और तुलना करवाएं',
      'मीठी, झोली, टोपी शब्द पढ़वाएं',
      'सबसे ज्यादा गलती यहीं होती है - ध्यान दें'
    ]
  },
  {
    id: 'h9',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'उ की मात्रा',
    title: 'उ की मात्रा (ु) - नीचे गोला',
    difficulty: 'medium',
    duration: 15,
    explanation: 'उ की मात्रा अक्षर के नीचे लगती है - एक छोटा गोला। जैसे: क + ु = कु',
    examples: ['क → कु', 'त → तु', 'न → नु', 'प → पु', 'म → मु'],
    activities: ['कु लिखें 5 बार', 'मु लिखें 5 बार', 'कुत्ता शब्द लिखें', 'सुबह शब्द लिखें'],
    questions: [
      { id: 'h9q1', type: 'mcq', question: 'क + ु = ?', options: ['कु', 'का', 'कि'], answer: 'कु' },
      { id: 'h9q2', type: 'mcq', question: 'उ की मात्रा कहाँ लगती है?', options: ['नीचे', 'ऊपर', 'दाईं तरफ'], answer: 'नीचे' },
      { id: 'h9q3', type: 'fill', question: 'स + ु = ___', answer: 'सु' },
      { id: 'h9q4', type: 'write', question: 'कुत्ता लिखें', answer: 'कुत्ता' },
    ],
    prerequisites: ['h8'],
    parentGuide: [
      'उ की मात्रा नीचे है - यह बताएं',
      'कुत्ता, सुबह, गुलाब शब्द पढ़वाएं',
      'का, कि, की, कु - सभी दिखाएं और अंतर बताएं'
    ]
  },
  {
    id: 'h10',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'ऊ की मात्रा',
    title: 'ऊ की मात्रा (ू) - नीचे खड़ी लकीर',
    difficulty: 'medium',
    duration: 15,
    explanation: 'ऊ की मात्रा अक्षर के नीचे लगती है - एक खड़ी लकीर। जैसे: क + ू = कू',
    examples: ['क → कू', 'त → तू', 'न → नू', 'प → पू', 'म → मू'],
    activities: ['कू लिखें 5 बार', 'पू लिखें 5 बार', 'कूआं शब्द लिखें', 'भूरा शब्द लिखें'],
    questions: [
      { id: 'h10q1', type: 'mcq', question: 'क + ू = ?', options: ['कू', 'कु', 'का'], answer: 'कू' },
      { id: 'h10q2', type: 'mcq', question: 'कु और कू में क्या अंतर है?', options: ['कु में गोला, कू में लकीर', 'कोई अंतर नहीं', 'कू ऊपर'], answer: 'कु में गोला, कू में लकीर' },
      { id: 'h10q3', type: 'fill', question: 'भ + ू = ___', answer: 'भू' },
      { id: 'h10q4', type: 'write', question: 'झूला लिखें', answer: 'झूला' },
    ],
    prerequisites: ['h9'],
    parentGuide: [
      'कु (गोला) और कू (लकीर) में अंतर दिखाएं',
      'कूआं, भूरा, झूला शब्द पढ़वाएं',
      'सभी मात्राएं मिलाकर अभ्यास करवाएं'
    ]
  },
  {
    id: 'h11',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'ए की मात्रा',
    title: 'ए की मात्रा (े) - ऊपर दाईं तरफ',
    difficulty: 'medium',
    duration: 15,
    explanation: 'ए की मात्रा अक्षर के ऊपर दाईं तरफ लगती है। जैसे: क + े = के',
    examples: ['क → के', 'त → ते', 'न → ने', 'प → पे', 'म → मे'],
    activities: ['के लिखें 5 बार', 'पे लिखें 5 बार', 'केला शब्द लिखें', 'पेड़ शब्द लिखें'],
    questions: [
      { id: 'h11q1', type: 'mcq', question: 'क + े = ?', options: ['के', 'का', 'कि'], answer: 'के' },
      { id: 'h11q2', type: 'mcq', question: 'ए की मात्रा कहाँ लगती है?', options: ['ऊपर दाईं तरफ', 'नीचे', 'बाईं तरफ'], answer: 'ऊपर दाईं तरफ' },
      { id: 'h11q3', type: 'fill', question: 'प + े = ___', answer: 'पे' },
      { id: 'h11q4', type: 'write', question: 'केला लिखें', answer: 'केला' },
    ],
    prerequisites: ['h10'],
    parentGuide: [
      'ए की मात्रा ऊपर है - दिखाएं',
      'केला, सेब, मेज़, पेड़ शब्द पढ़वाएं',
      'का, कि, की, के - सभी एक साथ दिखाएं'
    ]
  },
  {
    id: 'h12',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'ओ की मात्रा',
    title: 'ओ की मात्रा (ो) - ऊपर और दाईं तरफ',
    difficulty: 'medium',
    duration: 15,
    explanation: 'ओ की मात्रा अक्षर के ऊपर और दाईं तरफ लगती है। जैसे: क + ो = को',
    examples: ['क → को', 'त → तो', 'न → नो', 'प → पो', 'म → मो'],
    activities: ['को लिखें 5 बार', 'मो लिखें 5 बार', 'कोयल शब्द लिखें', 'मोर शब्द लिखें'],
    questions: [
      { id: 'h12q1', type: 'mcq', question: 'क + ो = ?', options: ['को', 'के', 'का'], answer: 'को' },
      { id: 'h12q2', type: 'fill', question: 'म + ो = ___', answer: 'मो' },
      { id: 'h12q3', type: 'write', question: 'मोर लिखें', answer: 'मोर' },
    ],
    prerequisites: ['h11'],
    parentGuide: ['ओ की मात्रा दो जगह लगती है - ऊपर और दाईं तरफ', 'कोयल, मोर, तोता शब्द पढ़वाएं']
  },
  {
    id: 'h13',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'ऐ की मात्रा',
    title: 'ऐ की मात्रा (ै) - ऊपर और बाईं तरफ',
    difficulty: 'hard',
    duration: 15,
    explanation: 'ऐ की मात्रा अक्षर के ऊपर और बाईं तरफ लगती है। जैसे: क + ै = कै',
    examples: ['क → कै', 'त → तै', 'न → नै', 'प → पै', 'म → मै'],
    activities: ['कै लिखें 5 बार', 'पै लिखें 5 बार', 'पैसा शब्द लिखें', 'मैना शब्द लिखें'],
    questions: [
      { id: 'h13q1', type: 'mcq', question: 'क + ै = ?', options: ['कै', 'को', 'के'], answer: 'कै' },
      { id: 'h13q2', type: 'fill', question: 'प + ै = ___', answer: 'पै' },
      { id: 'h13q3', type: 'write', question: 'पैसा लिखें', answer: 'पैसा' },
    ],
    prerequisites: ['h12'],
    parentGuide: ['ऐ की मात्रा कठिन है - धीरे सिखाएं', 'पैसा, मैना, कैला शब्द पढ़वाएं']
  },
  {
    id: 'h14',
    subject: 'hindi',
    unit: 'मात्रा',
    topic: 'औ की मात्रा',
    title: 'औ की मात्रा (ौ) - सबसे कठिन',
    difficulty: 'hard',
    duration: 15,
    explanation: 'औ की मात्रा अक्षर के ऊपर और बाईं तरफ लगती है। जैसे: क + ौ = कौ',
    examples: ['क → कौ', 'त → तौ', 'न → नौ', 'प → पौ', 'म → मौ'],
    activities: ['कौ लिखें 5 बार', 'मौ लिखें 5 बार', 'कौवा शब्द लिखें', 'मौसी शब्द लिखें'],
    questions: [
      { id: 'h14q1', type: 'mcq', question: 'क + ौ = ?', options: ['कौ', 'कै', 'को'], answer: 'कौ' },
      { id: 'h14q2', type: 'fill', question: 'म + ौ = ___', answer: 'मौ' },
      { id: 'h14q3', type: 'write', question: 'मौसी लिखें', answer: 'मौसी' },
    ],
    prerequisites: ['h13'],
    parentGuide: ['औ सबसे कठिन मात्रा है', 'कौवा, मौसी, पौधा शब्द पढ़वाएं', 'बहुत धीरे सिखाएं']
  },
  {
    id: 'h15',
    subject: 'hindi',
    unit: 'मात्रा मिश्रित',
    topic: 'सभी मात्राओं का अभ्यास',
    title: 'मात्रा मिश्रित अभ्यास - पहचानो कौन सी मात्रा',
    difficulty: 'hard',
    duration: 20,
    explanation: 'अब हम सभी मात्राओं को मिलाकर अभ्यास करेंगे। हर शब्द में कौन सी मात्रा है, पहचानो!',
    examples: ['काम - आ की मात्रा (ा)', 'किताब - इ की मात्रा (ि)', 'कीमत - ई की मात्रा (ी)', 'कुत्ता - उ की मात्रा (ु)', 'केला - ए की मात्रा (े)', 'कोयल - ओ की मात्रा (ो)'],
    activities: ['हर शब्द में मात्रा पहचानें', 'सही मात्रा लगाएं', 'शब्द पढ़ें और लिखें'],
    questions: [
      { id: 'h15q1', type: 'mcq', question: 'काम में कौन सी मात्रा है?', options: ['आ की (ा)', 'इ की (ि)', 'ए की (े)'], answer: 'आ की (ा)' },
      { id: 'h15q2', type: 'mcq', question: 'किताब में कौन सी मात्रा है?', options: ['इ की (ि)', 'ई की (ी)', 'उ की (ु)'], answer: 'इ की (ि)' },
      { id: 'h15q3', type: 'mcq', question: 'केला में कौन सी मात्रा है?', options: ['ए की (े)', 'ओ की (ो)', 'आ की (ा)'], answer: 'ए की (े)' },
      { id: 'h15q4', type: 'mcq', question: 'टोपी में कौन सी मात्रा है?', options: ['ई की (ी)', 'इ की (ि)', 'ए की (े)'], answer: 'ई की (ी)' },
      { id: 'h15q5', type: 'mcq', question: 'सुबह में कौन सी मात्रा है?', options: ['उ की (ु)', 'ऊ की (ू)', 'ओ की (ो)'], answer: 'उ की (ु)' },
    ],
    prerequisites: ['h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12'],
    parentGuide: [
      'यह सबसे महत्वपूर्ण अभ्यास है',
      'हर शब्द दिखाएं और पूछें - कौन सी मात्रा?',
      'गलत हो तो सही बताएं, डांटें नहीं',
      'रोज़ 5-10 मिनट यह अभ्यास करें'
    ]
  },
  {
    id: 'h16',
    subject: 'hindi',
    unit: 'व्यंजन',
    topic: 'क से न तक',
    title: 'क, ख, ग, घ, ङ, च, छ, ज, झ, ञ, ट, ठ, ड, ढ, ण, त, थ, द, ध, न',
    difficulty: 'medium',
    duration: 15,
    explanation: 'अब हम व्यंजन सीखेंगे। व्यंजन वे अक्षर हैं जो स्वर के बिना पूरे नहीं होते।',
    examples: ['क - कमल 🪷', 'ख - खरगोश 🐰', 'ग - गमला 🪴', 'घ - घर 🏠', 'च - चम्मच 🥄', 'छ - छतरी ☂️', 'ज - जहाज़ 🚢', 'ट - टोपी 🧢', 'त - तारा ⭐', 'द - दवात 🖋️', 'न - नल 🚰'],
    activities: ['हर व्यंजन 3 बार लिखें', 'हर व्यंजन का शब्द बोलें', 'पहचानो कौन सा व्यंजन है'],
    questions: [
      { id: 'h16q1', type: 'mcq', question: 'क से क्या होता है?', options: ['कमल', 'खरगोश', 'गमला'], answer: 'कमल' },
      { id: 'h16q2', type: 'mcq', question: 'खरगोश किस से शुरू होता है?', options: ['ख', 'क', 'ग'], answer: 'ख' },
      { id: 'h16q3', type: 'mcq', question: 'घर किस से शुरू होता है?', options: ['ग', 'घ', 'ङ'], answer: 'घ' },
    ],
    prerequisites: ['h5'],
    parentGuide: ['रोज़ 5 व्यंजन सिखाएं', 'हर व्यंजन के साथ शब्द बताएं', 'तस्वीरें दिखाएं']
  },
  {
    id: 'h17',
    subject: 'hindi',
    unit: 'व्यंजन',
    topic: 'प से ह तक',
    title: 'प, फ, ब, भ, म, य, र, ल, व, श, ष, स, ह',
    difficulty: 'medium',
    duration: 15,
    explanation: 'अब हम बाकी व्यंजन सीखेंगे।',
    examples: ['प - पतंग 🪁', 'फ - फल 🍎', 'ब - बकरा 🐐', 'भ - भालू 🐻', 'म - मछली 🐟', 'य - यान 🚀', 'र - रस्सी 🪢', 'ल - लट्टू 🌀', 'व - वन 🌳', 'स - सेब 🍏', 'ह - हाथी 🐘'],
    activities: ['हर व्यंजन 3 बार लिखें', 'हर व्यंजन का शब्द बोलें'],
    questions: [
      { id: 'h17q1', type: 'mcq', question: 'फल किस से शुरू होता है?', options: ['फ', 'प', 'ब'], answer: 'फ' },
      { id: 'h17q2', type: 'mcq', question: 'हाथी किस से शुरू होता है?', options: ['स', 'ह', 'भ'], answer: 'ह' },
    ],
    prerequisites: ['h16'],
    parentGuide: ['प और फ में अंतर बताएं', 'ब और भ में अंतर बताएं']
  },
  {
    id: 'h18',
    subject: 'hindi',
    unit: 'शब्द निर्माण',
    topic: 'दो अक्षर के शब्द',
    title: 'दो अक्षर के शब्द पढ़ें और लिखें',
    difficulty: 'medium',
    duration: 15,
    explanation: 'अब हम दो अक्षरों को जोड़कर शब्द बनाएंगे।',
    examples: ['क + म = कम', 'घ + र = घर', 'ज + ल = जल', 'फ + ल = फल', 'क + ल = कल', 'द + ल = दल'],
    activities: ['हर शब्द 5 बार लिखें', 'हर शब्द का अर्थ बताएं', 'शब्द से वाक्य बनाएं'],
    questions: [
      { id: 'h18q1', type: 'mcq', question: 'क + म = ?', options: ['कम', 'काम', 'कमल'], answer: 'कम' },
      { id: 'h18q2', type: 'mcq', question: 'घर में कौन से अक्षर हैं?', options: ['घ और र', 'ग और र', 'घ और ल'], answer: 'घ और र' },
      { id: 'h18q3', type: 'write', question: 'जल लिखें', answer: 'जल' },
    ],
    prerequisites: ['h16', 'h17'],
    parentGuide: ['पहले अक्षर दिखाएं, फिर जोड़ें', 'हर शब्द का मतलब बताएं', 'जल = पानी, फल = fruit']
  },
  {
    id: 'h19',
    subject: 'hindi',
    unit: 'शब्द निर्माण',
    topic: 'तीन अक्षर के शब्द',
    title: 'तीन अक्षर के शब्द',
    difficulty: 'medium',
    duration: 15,
    explanation: 'अब हम तीन अक्षरों के शब्द बनाएंगे।',
    examples: ['क + म + ल = कमल', 'न + ग + र = नगर', 'स + म + य = समय', 'प + ल + क = पलक', 'ग + ग + न = गगन'],
    activities: ['हर शब्द 5 बार लिखें', 'हर शब्द से वाक्य बनाएं'],
    questions: [
      { id: 'h19q1', type: 'mcq', question: 'कमल में कौन से अक्षर हैं?', options: ['क, म, ल', 'क, म', 'क, ल'], answer: 'क, म, ल' },
      { id: 'h19q2', type: 'write', question: 'नगर लिखें', answer: 'नगर' },
    ],
    prerequisites: ['h18'],
    parentGuide: ['तीन अक्षर जोड़कर दिखाएं', 'कमल = lotus, नगर = city']
  },
  {
    id: 'h20',
    subject: 'hindi',
    unit: 'वाक्य',
    topic: 'सरल वाक्य',
    title: 'सरल हिंदी वाक्य पढ़ें और लिखें',
    difficulty: 'hard',
    duration: 20,
    explanation: 'अब हम छोटे वाक्य पढ़ेंगे और लिखेंगे।',
    examples: ['यह घर है।', 'यह फल है।', 'राम खेलता है।', 'सीता पढ़ती है।', 'मैं जाता हूँ।'],
    activities: ['हर वाक्य 3 बार लिखें', 'हर वाक्य को पढ़ें', 'वाक्य का अर्थ बताएं'],
    questions: [
      { id: 'h20q1', type: 'mcq', question: '"यह घर है।" - यह क्या है?', options: ['घर', 'फल', 'कमल'], answer: 'घर' },
      { id: 'h20q2', type: 'mcq', question: 'राम क्या करता है?', options: ['खेलता है', 'पढ़ता है', 'सोता है'], answer: 'खेलता है' },
      { id: 'h20q3', type: 'write', question: 'यह फल है। लिखें', answer: 'यह फल है।' },
    ],
    prerequisites: ['h18', 'h19'],
    parentGuide: ['वाक्य धीरे-धीरे पढ़वाएं', 'हर शब्द पर रुकें', 'अर्थ समझाएं', 'लिखने में मदद करें']
  },
];

// Additional lessons to reach 30
export const hindiAdditionalLessons: Lesson[] = [
  {
    id: 'h21', subject: 'hindi', unit: 'पठन', topic: 'मेरा घर', title: 'पढ़ाई - मेरा घर', difficulty: 'easy', duration: 10,
    explanation: 'यह मेरा घर है। घर छोटा है। घर साफ़ है।',
    examples: ['घर छोटा है', 'घर साफ़ है', 'मैं घर में खेलता हूँ'],
    activities: ['पैराग्राफ पढ़ें', 'सवाल के जवाब दें'],
    questions: [
      { id: 'h21q1', type: 'mcq', question: 'घर कैसा है?', options: ['छोटा', 'बड़ा', 'लंबा'], answer: 'छोटा' },
      { id: 'h21q2', type: 'mcq', question: 'कौन खेलता है?', options: ['मैं', 'राम', 'सीता'], answer: 'मैं' },
    ],
    prerequisites: ['h20'], parentGuide: ['बच्चे को धीरे पढ़ने दें', 'हर वाक्य के बाद रुकें', 'सवाल पूछें']
  },
  {
    id: 'h22', subject: 'hindi', unit: 'पठन', topic: 'मेरी बिल्ली', title: 'पढ़ाई - मेरी बिल्ली', difficulty: 'easy', duration: 10,
    explanation: 'मेरी एक बिल्ली है। बिल्ली सफ़ेद है। बिल्ली दूध पीती है।',
    examples: ['बिल्ली सफ़ेद है', 'बिल्ली दूध पीती है', 'बिल्ली म्याऊँ करती है'],
    activities: ['पढ़ें', 'बिल्ली की तस्वीर बनाएं', 'सवाल जवाब'],
    questions: [
      { id: 'h22q1', type: 'mcq', question: 'बिल्ली किस रंग की है?', options: ['सफ़ेद', 'काली', 'भूरी'], answer: 'सफ़ेद' },
      { id: 'h22q2', type: 'mcq', question: 'बिल्ली क्या पीती है?', options: ['दूध', 'पानी', 'रस'], answer: 'दूध' },
    ],
    prerequisites: ['h21'], parentGuide: ['बिल्ली के बारे में बात करें', 'तस्वीर दिखाएं']
  },
  {
    id: 'h23', subject: 'hindi', unit: 'लेखन अभ्यास', topic: 'मात्रा मिश्रित लेखन', title: 'मात्रा लगाकर शब्द लिखें', difficulty: 'hard', duration: 20,
    explanation: 'अक्षर दिए जाएंगे, सही मात्रा लगाकर शब्द बनाएं।',
    examples: ['क + ा = का', 'त + ि = ति', 'म + ी = मी', 'स + ु = सु', 'प + े = पे'],
    activities: ['सही मात्रा लगाएं', 'शब्द बनाएं', 'शब्द लिखें'],
    questions: [
      { id: 'h23q1', type: 'fill', question: 'क + ा = ___', answer: 'का' },
      { id: 'h23q2', type: 'fill', question: 'त + ि = ___', answer: 'ति' },
      { id: 'h23q3', type: 'fill', question: 'म + ी = ___', answer: 'मी' },
      { id: 'h23q4', type: 'fill', question: 'प + े = ___', answer: 'पे' },
      { id: 'h23q5', type: 'fill', question: 'स + ु = ___', answer: 'सु' },
    ],
    prerequisites: ['h15'], parentGuide: ['यह सबसे ज़रूरी अभ्यास है', 'गलत हो तो सही दिखाएं', 'रोज़ करें']
  },
  {
    id: 'h24', subject: 'hindi', unit: 'लेखन अभ्यास', topic: 'मात्रा पहचान चुनौती', title: 'सही मात्रा चुनो', difficulty: 'hard', duration: 15,
    explanation: 'शब्द देखो और बताओ कौन सी मात्रा लगी है।',
    examples: ['काम → ा (आ की)', 'किताब → ि (इ की)', 'टोपी → ी (ई की)'],
    activities: ['मात्रा पहचानें', 'सही मात्रा चुनें', 'शब्द लिखें'],
    questions: [
      { id: 'h24q1', type: 'mcq', question: 'मेज़ में कौन सी मात्रा है?', options: ['ए की (े)', 'ओ की (ो)', 'आ की (ा)'], answer: 'ए की (े)' },
      { id: 'h24q2', type: 'mcq', question: 'मोर में कौन सी मात्रा है?', options: ['ओ की (ो)', 'ए की (े)', 'औ की (ौ)'], answer: 'ओ की (ो)' },
      { id: 'h24q3', type: 'mcq', question: 'कौवा में कौन सी मात्रा है?', options: ['औ की (ौ)', 'ओ की (ो)', 'ऐ की (ै)'], answer: 'औ की (ौ)' },
      { id: 'h24q4', type: 'mcq', question: 'पैसा में कौन सी मात्रा है?', options: ['ऐ की (ै)', 'ए की (े)', 'आ की (ा)'], answer: 'ऐ की (ै)' },
      { id: 'h24q5', type: 'mcq', question: 'भूरा में कौन सी मात्रा है?', options: ['ऊ की (ू)', 'उ की (ु)', 'ओ की (ो)'], answer: 'ऊ की (ू)' },
    ],
    prerequisites: ['h15'], parentGuide: ['हर शब्द पढ़वाएं', 'मात्रा पर उंगली रखवाएं', 'पूछें - यह कौन सी मात्रा है?']
  },
  {
    id: 'h25', subject: 'hindi', unit: 'लेखन अभ्यास', topic: 'शब्द और वाक्य लेखन', title: 'शब्द से वाक्य बनाओ', difficulty: 'hard', duration: 20,
    explanation: 'शब्द दिए जाएंगे, उनसे वाक्य बनाएं।',
    examples: ['घर → यह घर है।', 'फल → यह फल है।', 'बिल्ली → बिल्ली दूध पीती है।'],
    activities: ['शब्द से वाक्य बनाएं', 'वाक्य लिखें', 'वाक्य पढ़ें'],
    questions: [
      { id: 'h25q1', type: 'mcq', question: '"आम" से कौन सा वाक्य बनता है?', options: ['यह आम है।', 'आम खेलता है।', 'आम पढ़ती है।'], answer: 'यह आम है।' },
      { id: 'h25q2', type: 'mcq', question: '"राम" से कौन सा वाक्य बनता है?', options: ['राम सोता है।', 'राम खेलता है।', 'राम उड़ता है।'], answer: 'राम खेलता है।' },
    ],
    prerequisites: ['h20'], parentGuide: ['पहले शब्द बताएं', 'फिर वाक्य बनाएं', 'बच्चे से भी बनवाएं']
  },
  {
    id: 'h26', subject: 'hindi', unit: 'कविता', topic: 'आलो-आलो', title: 'कविता - आलो आलो', difficulty: 'easy', duration: 10,
    explanation: 'आलो आलो और अधिक आलो\nरे बबुआ तुम पढ़ो करो\nरोज़ सुबह उठकर\nअक्षर गिनो एक एक करके',
    examples: ['कविता सुनें', 'कविता दोहराएं', 'कविता गाएं'],
    activities: ['कविता सुनें', 'साथ में बोलें', 'याद करें'],
    questions: [
      { id: 'h26q1', type: 'oral', question: 'कविता सुनाओ - आलो आलो...', answer: 'और अधिक आलो' },
    ],
    prerequisites: [], parentGuide: ['कविता गाकर सुनाएं', 'बच्चे को साथ में बोलने दें', 'मज़ेदार बनाएं']
  },
  {
    id: 'h27', subject: 'hindi', unit: 'कविता', topic: 'टम-टम', title: 'कविता - टम टम टम', difficulty: 'easy', duration: 10,
    explanation: 'टम टम टम डमरू बाजे\nडमरू बाजे तो शिव नाचे\nशिव नाचे तो गण नाचे\nगण नाचे तो भूत नाचे',
    examples: ['कविता सुनें', 'ताल बजाएं', 'साथ में बोलें'],
    activities: ['कविता सुनें', 'डमरू की आवाज़ निकालें', 'साथ में बोलें'],
    questions: [
      { id: 'h27q1', type: 'oral', question: 'डमरू किसका बाजता है?', answer: 'शिव' },
    ],
    prerequisites: [], parentGuide: ['ताल बजाते हुए पढ़ाएं', 'बच्चे को भी ताल बजाने दें']
  },
  {
    id: 'h28', subject: 'hindi', unit: 'व्याकरण', topic: 'संज्ञा', title: 'संज्ञा - नाम के शब्द', difficulty: 'medium', duration: 15,
    explanation: 'किसी व्यक्ति, जगह, चीज़ या जानवर के नाम को संज्ञा कहते हैं।',
    examples: ['राम - व्यक्ति का नाम', 'दिल्ली - जगह का नाम', 'किताब - चीज़ का नाम', 'बिल्ली - जानवर का नाम'],
    activities: ['वाक्य में संज्ञा ढूंढें', 'संज्ञा शब्द लिखें', 'अपने नाम लिखें'],
    questions: [
      { id: 'h28q1', type: 'mcq', question: 'कौन सा शब्द संज्ञा है?', options: ['राम', 'बड़ा', 'दौड़ता'], answer: 'राम' },
      { id: 'h28q2', type: 'mcq', question: '"बिल्ली दूध पीती है" में संज्ञा कौन सी है?', options: ['बिल्ली और दूध', 'पीती', 'है'], answer: 'बिल्ली और दूध' },
    ],
    prerequisites: ['h20'], parentGuide: ['सरल भाषा में समझाएं', 'संज्ञा = नाम', 'बच्चे का नाम, स्कूल का नाम बताएं']
  },
  {
    id: 'h29', subject: 'hindi', unit: 'व्याकरण', topic: 'सर्वनाम', title: 'सर्वनाम - मैं, तुम, वह', difficulty: 'medium', duration: 15,
    explanation: 'नाम की जगह जो शब्द इस्तेमाल करते हैं, उन्हें सर्वनाम कहते हैं।',
    examples: ['मैं = मैं राम हूँ', 'तुम = तुम अच्छे हो', 'वह = वह खेलता है', 'हम = हम खेलते हैं'],
    activities: ['सर्वनाम वाले वाक्य बोलें', 'सर्वनाम पहचानें'],
    questions: [
      { id: 'h29q1', type: 'mcq', question: '"मैं पढ़ता हूँ" में सर्वनाम कौन सा है?', options: ['मैं', 'पढ़ता', 'हूँ'], answer: 'मैं' },
      { id: 'h29q2', type: 'mcq', question: '"वह जाता है" में वह किसकी जगह है?', options: ['किसी के नाम की', 'किसी जगह की', 'किसी चीज़ की'], answer: 'किसी के नाम की' },
    ],
    prerequisites: ['h28'], parentGuide: ['मैं = खुद के लिए', 'तुम = दूसरे के लिए', 'वह = दूर वाले के लिए']
  },
  {
    id: 'h30', subject: 'hindi', unit: 'लेखन', topic: 'हिंदी लेखन अंतिम अभ्यास', title: 'पूरा अभ्यास - स्वर, व्यंजन, मात्रा, शब्द, वाक्य', difficulty: 'hard', duration: 25,
    explanation: 'अब हम सब कुछ मिलाकर अभ्यास करेंगे।',
    examples: ['अ, आ, इ, ई लिखें', 'क, ख, ग, घ लिखें', 'का, कि, की, कु लिखें', 'कम, घर, जल लिखें', 'यह घर है। लिखें'],
    activities: ['स्वर लिखें', 'व्यंजन लिखें', 'मात्रा लगाएं', 'शब्द लिखें', 'वाक्य लिखें'],
    questions: [
      { id: 'h30q1', type: 'write', question: 'अ से आम लिखें', answer: 'अ से आम' },
      { id: 'h30q2', type: 'write', question: 'का, कि, की, कु लिखें', answer: 'का कि की कु' },
      { id: 'h30q3', type: 'write', question: 'यह फल है। लिखें', answer: 'यह फल है।' },
      { id: 'h30q4', type: 'mcq', question: 'सबसे कठिन मात्रा कौन सी है?', options: ['औ की (ौ)', 'आ की (ा)', 'इ की (ि)'], answer: 'औ की (ौ)' },
    ],
    prerequisites: ['h1', 'h15', 'h20'], parentGuide: ['पूरे अभ्यास में मदद करें', 'गलती पर धैर्य रखें', 'हर दिन थोड़ा-थोड़ा करें']
  },
];

export const allHindiLessons = [...hindiLessons, ...hindiAdditionalLessons];
