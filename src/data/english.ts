import { Lesson } from '../types';

export const englishVocabulary = {
  fruits: [
    { word: 'Apple', emoji: '🍎', hindi: 'सेब' },
    { word: 'Mango', emoji: '🥭', hindi: 'आम' },
    { word: 'Banana', emoji: '🍌', hindi: 'केला' },
    { word: 'Orange', emoji: '🍊', hindi: 'संतरा' },
    { word: 'Grapes', emoji: '🍇', hindi: 'अंगूर' },
    { word: 'Guava', emoji: '🍐', hindi: 'अमरूद' },
    { word: 'Papaya', emoji: '🥭', hindi: 'पपीता' },
    { word: 'Watermelon', emoji: '🍉', hindi: 'तरबूज' },
    { word: 'Pomegranate', emoji: '🍎', hindi: 'अनार' },
  ],
  vegetables: [
    { word: 'Potato', emoji: '🥔', hindi: 'आलू' },
    { word: 'Tomato', emoji: '🍅', hindi: 'टमाटर' },
    { word: 'Carrot', emoji: '🥕', hindi: 'गाजर' },
    { word: 'Onion', emoji: '🧅', hindi: 'प्याज' },
    { word: 'Peas', emoji: '🫛', hindi: 'मटर' },
    { word: 'Spinach', emoji: '🥬', hindi: 'पालक' },
    { word: 'Cabbage', emoji: '🥬', hindi: 'पत्तागोभी' },
    { word: 'Cauliflower', emoji: '🥦', hindi: 'फूलगोभी' },
    { word: 'Brinjal', emoji: '🍆', hindi: 'बैंगन' },
  ],
  bodyParts: [
    { word: 'Head', emoji: '🗣️', hindi: 'सिर' },
    { word: 'Hair', emoji: '💇', hindi: 'बाल' },
    { word: 'Eyes', emoji: '👀', hindi: 'आँखें' },
    { word: 'Ears', emoji: '👂', hindi: 'कान' },
    { word: 'Nose', emoji: '👃', hindi: 'नाक' },
    { word: 'Mouth', emoji: '👄', hindi: 'मुंह' },
    { word: 'Teeth', emoji: '🦷', hindi: 'दांत' },
    { word: 'Tongue', emoji: '👅', hindi: 'जीभ' },
    { word: 'Hand', emoji: '✋', hindi: 'हाथ' },
    { word: 'Finger', emoji: '☝️', hindi: 'उंगली' },
    { word: 'Leg', emoji: '🦵', hindi: 'टांग' },
    { word: 'Foot', emoji: '🦶', hindi: 'पैर' },
  ],
  animals: [
    { word: 'Dog', emoji: '🐕', hindi: 'कुत्ता' },
    { word: 'Cat', emoji: '🐈', hindi: 'बिल्ली' },
    { word: 'Cow', emoji: '🐄', hindi: 'गाय' },
    { word: 'Horse', emoji: '🐴', hindi: 'घोड़ा' },
    { word: 'Lion', emoji: '🦁', hindi: 'शेर' },
    { word: 'Elephant', emoji: '🐘', hindi: 'हाथी' },
    { word: 'Monkey', emoji: '🐒', hindi: 'बंदर' },
    { word: 'Rabbit', emoji: '🐇', hindi: 'खरगोश' },
    { word: 'Bird', emoji: '🐦', hindi: 'चिड़िया' },
    { word: 'Fish', emoji: '🐟', hindi: 'मछली' },
  ],
  colours: [
    { word: 'Red', emoji: '🔴', hindi: 'लाल' },
    { word: 'Blue', emoji: '🔵', hindi: 'नीला' },
    { word: 'Green', emoji: '🟢', hindi: 'हरा' },
    { word: 'Yellow', emoji: '🟡', hindi: 'पीला' },
    { word: 'Orange', emoji: '🟠', hindi: 'नारंगी' },
    { word: 'Pink', emoji: '🩷', hindi: 'गुलाबी' },
    { word: 'White', emoji: '⚪', hindi: 'सफ़ेद' },
    { word: 'Black', emoji: '⚫', hindi: 'काला' },
    { word: 'Brown', emoji: '🟤', hindi: 'भूरा' },
    { word: 'Purple', emoji: '🟣', hindi: 'बैंगनी' },
  ],
  family: [
    { word: 'Father', emoji: '👨', hindi: 'पिता' },
    { word: 'Mother', emoji: '👩', hindi: 'माता' },
    { word: 'Brother', emoji: '👦', hindi: 'भाई' },
    { word: 'Sister', emoji: '👧', hindi: 'बहन' },
    { word: 'Grandfather', emoji: '👴', hindi: 'दादा' },
    { word: 'Grandmother', emoji: '👵', hindi: 'दादी' },
    { word: 'Uncle', emoji: '👨', hindi: 'चाचा' },
    { word: 'Aunt', emoji: '👩', hindi: 'चाची' },
  ],
  school: [
    { word: 'Book', emoji: '📖', hindi: 'किताब' },
    { word: 'Pen', emoji: '🖊️', hindi: 'कलम' },
    { word: 'Pencil', emoji: '✏️', hindi: 'पेंसिल' },
    { word: 'Bag', emoji: '🎒', hindi: 'बस्ता' },
    { word: 'Teacher', emoji: '👩‍🏫', hindi: 'शिक्षक' },
    { word: 'Chair', emoji: '🪑', hindi: 'कुर्सी' },
    { word: 'Table', emoji: '🪑', hindi: 'मेज़' },
    { word: 'Class', emoji: '🏫', hindi: 'कक्षा' },
  ],
  shapes: [
    { word: 'Circle', emoji: '⭕', hindi: 'वृत्त' },
    { word: 'Triangle', emoji: '🔺', hindi: 'त्रिभुज' },
    { word: 'Square', emoji: '🟧', hindi: 'वर्ग' },
    { word: 'Rectangle', emoji: '▬', hindi: 'आयत' },
  ],
};

export const speakingConversations = [
  {
    title: 'Introduction',
    emoji: '👋',
    conversations: [
      { q: 'What is your name?', a: 'My name is ____.' },
      { q: 'How old are you?', a: 'I am ___ years old.' },
      { q: 'Where do you live?', a: 'I live in Indore.' },
      { q: 'What is your school name?', a: 'My school is Ideal Academy.' },
      { q: 'What class do you study in?', a: 'I study in Class 1.' },
    ]
  },
  {
    title: 'Favourites',
    emoji: '❤️',
    conversations: [
      { q: 'What is your favourite fruit?', a: 'My favourite fruit is mango.' },
      { q: 'What is your favourite colour?', a: 'My favourite colour is blue.' },
      { q: 'What is your favourite animal?', a: 'My favourite animal is dog.' },
      { q: 'What is your favourite food?', a: 'My favourite food is rice.' },
    ]
  },
  {
    title: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    conversations: [
      { q: 'Who is in your family?', a: 'There are ___ people in my family.' },
      { q: 'What is your father\'s name?', a: 'My father\'s name is ____.' },
      { q: 'What is your mother\'s name?', a: 'My mother\'s name is ____.' },
      { q: 'Do you have a brother or sister?', a: 'Yes, I have a ___.' },
    ]
  },
  {
    title: 'Daily Routine',
    emoji: '🌅',
    conversations: [
      { q: 'When do you wake up?', a: 'I wake up at 6 o\'clock.' },
      { q: 'What do you eat for breakfast?', a: 'I eat bread and milk.' },
      { q: 'When do you go to school?', a: 'I go to school at 8 o\'clock.' },
      { q: 'What do you do after school?', a: 'I play with my friends.' },
    ]
  },
];

export const englishLessons: Lesson[] = [
  {
    id: 'e1', subject: 'english', unit: 'Alphabet', topic: 'Capital Letters A-M', title: 'Capital Letters A to M', difficulty: 'easy', duration: 10,
    explanation: 'English has 26 capital letters. Let us learn A to M first.',
    examples: ['A for Apple 🍎', 'B for Ball ⚽', 'C for Cat 🐱', 'D for Dog 🐕', 'E for Elephant 🐘', 'F for Fish 🐟', 'G for Grapes 🍇', 'H for Hat 🎩', 'I for Ice cream 🍦', 'J for Jug 🏺', 'K for Kite 🪁', 'L for Lion 🦁', 'M for Mango 🥭'],
    activities: ['Write each letter 5 times', 'Say the sound of each letter', 'Find objects starting with each letter'],
    questions: [
      { id: 'e1q1', type: 'mcq', question: 'A is for ___?', options: ['Apple', 'Ball', 'Cat'], answer: 'Apple' },
      { id: 'e1q2', type: 'mcq', question: 'Which letter comes after C?', options: ['D', 'B', 'E'], answer: 'D' },
      { id: 'e1q3', type: 'write', question: 'Write the letter M', answer: 'M' },
    ],
    prerequisites: [], parentGuide: ['Show each letter clearly', 'Say the sound, not just the name', 'A says "ah", B says "buh"']
  },
  {
    id: 'e2', subject: 'english', unit: 'Alphabet', topic: 'Capital Letters N-Z', title: 'Capital Letters N to Z', difficulty: 'easy', duration: 10,
    explanation: 'Now let us learn the remaining capital letters N to Z.',
    examples: ['N for Nest 🪺', 'O for Orange 🍊', 'P for Parrot 🦜', 'Q for Queen 👑', 'R for Rabbit 🐇', 'S for Sun ☀️', 'T for Tiger 🐯', 'U for Umbrella ☂️', 'V for Van 🚐', 'W for Watch ⌚', 'X for Xmas 🎄', 'Y for Yak 🐂', 'Z for Zebra 🦓'],
    activities: ['Write each letter 5 times', 'Match letter to picture'],
    questions: [
      { id: 'e2q1', type: 'mcq', question: 'S is for ___?', options: ['Sun', 'Moon', 'Star'], answer: 'Sun' },
      { id: 'e2q2', type: 'mcq', question: 'Which letter comes after T?', options: ['U', 'S', 'V'], answer: 'U' },
    ],
    prerequisites: ['e1'], parentGuide: ['Continue with sounds', 'Mix A-Z for practice']
  },
  {
    id: 'e3', subject: 'english', unit: 'Alphabet', topic: 'Small Letters a-m', title: 'Small Letters a to m', difficulty: 'easy', duration: 10,
    explanation: 'Every capital letter has a small letter. A becomes a, B becomes b.',
    examples: ['A → a', 'B → b', 'C → c', 'D → d', 'E → e'],
    activities: ['Write small letters', 'Match capital to small'],
    questions: [
      { id: 'e3q1', type: 'mcq', question: 'Small letter of A is?', options: ['a', 'b', 'c'], answer: 'a' },
      { id: 'e3q2', type: 'mcq', question: 'Small letter of B is?', options: ['d', 'b', 'a'], answer: 'b' },
    ],
    prerequisites: ['e1'], parentGuide: ['Show capital and small side by side', 'Help with formation']
  },
  {
    id: 'e4', subject: 'english', unit: 'Alphabet', topic: 'Small Letters n-z', title: 'Small Letters n to z', difficulty: 'easy', duration: 10,
    explanation: 'Let us learn the remaining small letters.',
    examples: ['N → n', 'O → o', 'P → p', 'Q → q', 'R → r'],
    activities: ['Write small letters n to z', 'Match capital to small'],
    questions: [
      { id: 'e4q1', type: 'mcq', question: 'Small letter of S is?', options: ['s', 'z', 'r'], answer: 's' },
    ],
    prerequisites: ['e3'], parentGuide: ['Complete all 26 letters']
  },
  {
    id: 'e5', subject: 'english', unit: 'Phonics', topic: 'Vowel Sounds', title: 'Vowels - a, e, i, o, u', difficulty: 'easy', duration: 10,
    explanation: 'Vowels are special letters. There are 5 vowels: a, e, i, o, u. Every word needs a vowel!',
    examples: ['a as in apple 🍎', 'e as in egg 🥚', 'i as in igloo 🏠', 'o as in orange 🍊', 'u as in umbrella ☂️'],
    activities: ['Say each vowel sound', 'Find vowels in words', 'Clap for each vowel in a word'],
    questions: [
      { id: 'e5q1', type: 'mcq', question: 'How many vowels are there?', options: ['5', '3', '7'], answer: '5' },
      { id: 'e5q2', type: 'mcq', question: 'Which is NOT a vowel?', options: ['b', 'a', 'e'], answer: 'b' },
      { id: 'e5q3', type: 'mcq', question: 'Which word starts with a vowel?', options: ['apple', 'ball', 'cat'], answer: 'apple' },
    ],
    prerequisites: ['e1'], parentGuide: ['Teach sounds, not names', 'a says "ah", e says "eh", i says "ih", o says "oh", u says "uh"']
  },
  {
    id: 'e6', subject: 'english', unit: 'Unit 1', topic: 'Myself', title: 'About Myself', difficulty: 'easy', duration: 10,
    explanation: 'Let us talk about ourselves! We will learn to say our name, age, and school.',
    examples: ['My name is ____.', 'I am 6 years old.', 'I study in Class 1.', 'I go to Ideal Academy.'],
    activities: ['Say your name', 'Tell your age', 'Write your name'],
    questions: [
      { id: 'e6q1', type: 'fill', question: 'My ___ is Ram.', answer: 'name' },
      { id: 'e6q2', type: 'fill', question: 'I am ___ years old.', answer: '6' },
    ],
    prerequisites: ['e1'], parentGuide: ['Help child speak in full sentences', 'Practice daily']
  },
  {
    id: 'e7', subject: 'english', unit: 'Unit 1', topic: 'My Family', title: 'Meet My Family', difficulty: 'easy', duration: 10,
    explanation: 'A family has father, mother, brother, sister, and grandparents.',
    examples: ['Father - Papa 👨', 'Mother - Mummy 👩', 'Brother - Bhaiya 👦', 'Sister - Didi 👧', 'Grandfather - Dada/Dada ji 👴', 'Grandmother - Dadi/Dadi ji 👵'],
    activities: ['Draw your family', 'Name each family member', 'Say who is in your family'],
    questions: [
      { id: 'e7q1', type: 'mcq', question: 'Father\'s other name is?', options: ['Papa', 'Mummy', 'Didi'], answer: 'Papa' },
      { id: 'e7q2', type: 'mcq', question: 'Mother\'s mother is called?', options: ['Grandmother', 'Grandfather', 'Sister'], answer: 'Grandmother' },
    ],
    prerequisites: ['e6'], parentGuide: ['Use family photos', 'Point and name each person']
  },
  {
    id: 'e8', subject: 'english', unit: 'Unit 2', topic: 'Domestic Animals', title: 'Animals Around Us', difficulty: 'easy', duration: 10,
    explanation: 'Some animals live with us. They are called domestic animals.',
    examples: ['Dog 🐕 - says "Woof"', 'Cat 🐈 - says "Meow"', 'Cow 🐄 - says "Moo"', 'Horse 🐴 - says "Neigh"', 'Goat 🐐 - says "Baa"'],
    activities: ['Make animal sounds', 'Match animal to sound', 'Draw your favourite animal'],
    questions: [
      { id: 'e8q1', type: 'mcq', question: 'A dog says ___?', options: ['Woof', 'Meow', 'Moo'], answer: 'Woof' },
      { id: 'e8q2', type: 'mcq', question: 'Which animal gives us milk?', options: ['Cow', 'Dog', 'Cat'], answer: 'Cow' },
    ],
    prerequisites: ['e5'], parentGuide: ['Make sounds together', 'Use toy animals if available']
  },
  {
    id: 'e9', subject: 'english', unit: 'Unit 2', topic: 'Wild Animals', title: 'Animals in the Jungle', difficulty: 'easy', duration: 10,
    explanation: 'Some animals live in the jungle. They are called wild animals.',
    examples: ['Lion 🦁 - King of jungle', 'Tiger 🐯 - Has stripes', 'Elephant 🐘 - Biggest animal', 'Monkey 🐒 - Loves bananas', 'Bear 🐻 - Loves honey'],
    activities: ['Act like animals', 'Draw a jungle scene', 'Name baby animals'],
    questions: [
      { id: 'e9q1', type: 'mcq', question: 'Who is the king of the jungle?', options: ['Lion', 'Tiger', 'Elephant'], answer: 'Lion' },
      { id: 'e9q2', type: 'mcq', question: 'Baby cat is called?', options: ['Kitten', 'Puppy', 'Calf'], answer: 'Kitten' },
    ],
    prerequisites: ['e8'], parentGuide: ['Watch animal videos together', 'Visit zoo if possible']
  },
  {
    id: 'e10', subject: 'english', unit: 'Unit 3', topic: 'School Objects', title: 'Things in My School Bag', difficulty: 'easy', duration: 10,
    explanation: 'We use many things in school. Let us learn their names.',
    examples: ['Book 📖', 'Pen 🖊️', 'Pencil ✏️', 'Eraser', 'Sharpener', 'Bag 🎒', 'Box', 'Ruler'],
    activities: ['Name things in your bag', 'Draw your school bag', 'Match object to name'],
    questions: [
      { id: 'e10q1', type: 'mcq', question: 'We write with a ___?', options: ['Pencil', 'Eraser', 'Bag'], answer: 'Pencil' },
      { id: 'e10q2', type: 'mcq', question: 'We erase with an ___?', options: ['Eraser', 'Pencil', 'Book'], answer: 'Eraser' },
    ],
    prerequisites: ['e5'], parentGuide: ['Show real objects', 'Let child touch and name each']
  },
  {
    id: 'e11', subject: 'english', unit: 'Grammar', topic: 'Naming Words', title: 'Naming Words (Nouns)', difficulty: 'medium', duration: 15,
    explanation: 'A naming word is the name of a person, place, animal, or thing.',
    examples: ['Person: Ram, Sita, Teacher', 'Place: School, Home, Park', 'Animal: Dog, Cat, Bird', 'Thing: Book, Pen, Ball'],
    activities: ['Find naming words in sentences', 'List naming words around you'],
    questions: [
      { id: 'e11q1', type: 'mcq', question: 'Which is a naming word?', options: ['Dog', 'Runs', 'Big'], answer: 'Dog' },
      { id: 'e11q2', type: 'mcq', question: 'In "The cat sits" which is the naming word?', options: ['cat', 'sits', 'The'], answer: 'cat' },
    ],
    prerequisites: ['e6'], parentGuide: ['Explain simply: naming word = name', 'Point and name things around the house']
  },
  {
    id: 'e12', subject: 'english', unit: 'Grammar', topic: 'Describing Words', title: 'Describing Words (Adjectives)', difficulty: 'medium', duration: 15,
    explanation: 'A describing word tells us about a naming word. It tells us how something looks, feels, or is.',
    examples: ['Big elephant', 'Small cat', 'Red apple', 'Happy child', 'Tall tree', 'Hot sun'],
    activities: ['Describe things around you', 'Match describing words to objects'],
    questions: [
      { id: 'e12q1', type: 'mcq', question: 'In "big dog" which is the describing word?', options: ['big', 'dog', 'the'], answer: 'big' },
      { id: 'e12q2', type: 'mcq', question: 'The sun is ___?', options: ['hot', 'run', 'book'], answer: 'hot' },
    ],
    prerequisites: ['e11'], parentGuide: ['Use real objects', 'Ask: What colour? How big? How does it feel?']
  },
  {
    id: 'e13', subject: 'english', unit: 'Grammar', topic: 'Action Words', title: 'Action Words (Verbs)', difficulty: 'medium', duration: 15,
    explanation: 'An action word tells us what someone or something does.',
    examples: ['Run 🏃', 'Jump 🤸', 'Sit 🪑', 'Eat 🍽️', 'Read 📖', 'Write ✍️', 'Play ⚽', 'Sleep 😴'],
    activities: ['Act out action words', 'Find action words in sentences'],
    questions: [
      { id: 'e13q1', type: 'mcq', question: 'Which is an action word?', options: ['Run', 'Big', 'Dog'], answer: 'Run' },
      { id: 'e13q2', type: 'mcq', question: 'In "The bird flies" which is the action word?', options: ['flies', 'bird', 'The'], answer: 'flies' },
    ],
    prerequisites: ['e11'], parentGuide: ['Do the actions together', 'Ask: What are you doing?']
  },
  {
    id: 'e14', subject: 'english', unit: 'Grammar', topic: 'Singular and Plural', title: 'One and Many', difficulty: 'medium', duration: 15,
    explanation: 'One = singular, More than one = plural. We add "s" or "es" to make plural.',
    examples: ['cat → cats', 'dog → dogs', 'box → boxes', 'baby → babies', 'child → children'],
    activities: ['Count objects and say singular/plural', 'Add s to make plural'],
    questions: [
      { id: 'e14q1', type: 'mcq', question: 'Plural of "cat" is?', options: ['cats', 'cat', 'cates'], answer: 'cats' },
      { id: 'e14q2', type: 'mcq', question: 'Plural of "box" is?', options: ['boxes', 'boxs', 'box'], answer: 'boxes' },
    ],
    prerequisites: ['e11'], parentGuide: ['Use real objects', 'Show 1 pen, then 2 pens', 'Ask: One or many?']
  },
  {
    id: 'e15', subject: 'english', unit: 'Sentences', topic: 'Simple Sentences', title: 'Making Simple Sentences', difficulty: 'medium', duration: 15,
    explanation: 'A sentence is a group of words that makes complete sense. It starts with a capital letter and ends with a full stop.',
    examples: ['The cat is small.', 'I like mango.', 'Ram plays cricket.', 'The sun is hot.'],
    activities: ['Make sentences from given words', 'Add full stops', 'Start with capital letter'],
    questions: [
      { id: 'e15q1', type: 'mcq', question: 'Which is a correct sentence?', options: ['The cat is small.', 'cat is small', 'the Cat Is Small'], answer: 'The cat is small.' },
      { id: 'e15q2', type: 'fill', question: 'The dog ___ big. (is/am)', answer: 'is' },
    ],
    prerequisites: ['e11', 'e12', 'e13'], parentGuide: ['Every sentence needs: Who + What', 'Capital at start, full stop at end']
  },
  {
    id: 'e16', subject: 'english', unit: 'Unit 4', topic: 'Nature', title: 'Nature\'s Wonders', difficulty: 'easy', duration: 10,
    explanation: 'Look around! The sun, moon, stars, sky, and weather are all part of nature.',
    examples: ['Sun ☀️ - gives us light', 'Moon 🌙 - shines at night', 'Stars ⭐ - in the sky', 'Rain 🌧️ - water from clouds', 'Rainbow 🌈 - after rain'],
    activities: ['Look at the sky', 'Draw sun and moon', 'Name things in nature'],
    questions: [
      { id: 'e16q1', type: 'mcq', question: 'What gives us light during the day?', options: ['Sun', 'Moon', 'Stars'], answer: 'Sun' },
      { id: 'e16q2', type: 'mcq', question: 'When do we see the moon?', options: ['Night', 'Morning', 'Afternoon'], answer: 'Night' },
    ],
    prerequisites: ['e5'], parentGuide: ['Go outside and observe', 'Point at sky, ask what do you see?']
  },
  {
    id: 'e17', subject: 'english', unit: 'Grammar', topic: 'This/That', title: 'This and That', difficulty: 'medium', duration: 10,
    explanation: 'This = near (close to us). That = far (away from us).',
    examples: ['This is a pen. (near)', 'That is a tree. (far)', 'This is my book. (in my hand)', 'That is a bird. (in the sky)'],
    activities: ['Point near and say "This is..."', 'Point far and say "That is..."'],
    questions: [
      { id: 'e17q1', type: 'mcq', question: 'The book in your hand - ___ is my book.', options: ['This', 'That', 'These'], answer: 'This' },
      { id: 'e17q2', type: 'mcq', question: 'A bird in the sky - ___ is a bird.', options: ['That', 'This', 'These'], answer: 'That' },
    ],
    prerequisites: ['e15'], parentGuide: ['Use real objects near and far', 'Practice pointing']
  },
  {
    id: 'e18', subject: 'english', unit: 'Grammar', topic: 'Is/Am/Are', title: 'Is, Am, Are', difficulty: 'medium', duration: 15,
    explanation: 'I → am, He/She/It → is, We/You/They → are',
    examples: ['I am a student.', 'He is my friend.', 'She is happy.', 'We are playing.', 'They are coming.'],
    activities: ['Fill in is/am/are', 'Make sentences'],
    questions: [
      { id: 'e18q1', type: 'fill', question: 'I ___ happy. (is/am/are)', answer: 'am' },
      { id: 'e18q2', type: 'fill', question: 'She ___ my sister. (is/am/are)', answer: 'is' },
      { id: 'e18q3', type: 'fill', question: 'They ___ playing. (is/am/are)', answer: 'are' },
    ],
    prerequisites: ['e15'], parentGuide: ['I am, He is, They are - repeat together', 'Make sentences with each']
  },
  {
    id: 'e19', subject: 'english', unit: 'Reading', topic: 'Simple Passage', title: 'Reading Practice - My Pet', difficulty: 'medium', duration: 15,
    explanation: 'Read the passage and answer the questions.',
    examples: ['I have a pet dog. His name is Tom. Tom is brown. He likes to play. Tom eats bread and milk. I love Tom.'],
    activities: ['Read the passage aloud', 'Answer questions', 'Draw Tom the dog'],
    questions: [
      { id: 'e19q1', type: 'mcq', question: 'What pet does the child have?', options: ['Dog', 'Cat', 'Bird'], answer: 'Dog' },
      { id: 'e19q2', type: 'mcq', question: 'What is the dog\'s name?', options: ['Tom', 'Ram', 'Max'], answer: 'Tom' },
      { id: 'e19q3', type: 'mcq', question: 'What colour is Tom?', options: ['Brown', 'Black', 'White'], answer: 'Brown' },
    ],
    prerequisites: ['e15'], parentGuide: ['Let child read slowly', 'Help with difficult words', 'Ask questions after each line']
  },
  {
    id: 'e20', subject: 'english', unit: 'Speaking', topic: 'Daily Conversation', title: 'Everyday English Speaking', difficulty: 'medium', duration: 15,
    explanation: 'Let us practice speaking English for everyday situations.',
    examples: ['Good morning, Teacher!', 'Thank you, Mummy.', 'May I come in?', 'I am sorry.', 'Please help me.'],
    activities: ['Role play conversations', 'Practice greetings', 'Say please and thank you'],
    questions: [
      { id: 'e20q1', type: 'oral', question: 'How do you greet your teacher in the morning?', answer: 'Good morning, Teacher!' },
      { id: 'e20q2', type: 'oral', question: 'What do you say when someone helps you?', answer: 'Thank you!' },
    ],
    prerequisites: ['e6'], parentGuide: ['Practice every morning', 'Use English at home for simple things']
  },
];

// Additional lessons to reach 30
export const englishAdditionalLessons: Lesson[] = [
  {
    id: 'e21', subject: 'english', unit: 'Sight Words', topic: 'Common Sight Words', title: 'Words We See Every Day', difficulty: 'easy', duration: 10,
    explanation: 'Some words we see very often. We should recognize them quickly.',
    examples: ['the', 'is', 'am', 'a', 'my', 'this', 'that', 'we', 'he', 'she', 'it', 'can', 'see', 'like', 'go'],
    activities: ['Flash card practice', 'Find words in sentences', 'Write each word'],
    questions: [
      { id: 'e21q1', type: 'mcq', question: 'Which is a sight word?', options: ['the', 'elephant', 'beautiful'], answer: 'the' },
    ],
    prerequisites: ['e1'], parentGuide: ['Show word cards daily', '5 minutes practice']
  },
  {
    id: 'e22', subject: 'english', unit: 'Spelling', topic: 'Simple Spelling', title: 'Spell Simple Words', difficulty: 'medium', duration: 10,
    explanation: 'Let us learn to spell simple words letter by letter.',
    examples: ['cat = c-a-t', 'dog = d-o-g', 'sun = s-u-n', 'pen = p-e-n', 'cup = c-u-p'],
    activities: ['Spell words aloud', 'Write letters in order', 'Spell your name'],
    questions: [
      { id: 'e22q1', type: 'fill', question: 'Spell "cat": ___-___-___', answer: 'c-a-t' },
      { id: 'e22q2', type: 'fill', question: 'Spell "dog": ___-___-___', answer: 'd-o-g' },
    ],
    prerequisites: ['e1'], parentGuide: ['Sound out each letter', 'Clap for each letter']
  },
  {
    id: 'e23', subject: 'english', unit: 'Unit 2', topic: 'Birds', title: 'Birds Around Us', difficulty: 'easy', duration: 10,
    explanation: 'Birds can fly. They have wings and feathers.',
    examples: ['Parrot 🦜 - green bird', 'Sparrow - small brown bird', 'Peacock 🦚 - beautiful bird', 'Crow - black bird', 'Pigeon - grey bird'],
    activities: ['Watch birds outside', 'Make bird sounds', 'Draw a bird'],
    questions: [
      { id: 'e23q1', type: 'mcq', question: 'Which bird can talk?', options: ['Parrot', 'Crow', 'Pigeon'], answer: 'Parrot' },
      { id: 'e23q2', type: 'mcq', question: 'What do birds have to fly?', options: ['Wings', 'Legs', 'Tail'], answer: 'Wings' },
    ],
    prerequisites: ['e8'], parentGuide: ['Look for birds together', 'Name each bird you see']
  },
  {
    id: 'e24', subject: 'english', unit: 'Grammar', topic: 'Has/Have', title: 'Has and Have', difficulty: 'medium', duration: 10,
    explanation: 'He/She/It → has. I/We/You/They → have.',
    examples: ['I have a book.', 'She has a doll.', 'We have a garden.', 'He has a ball.'],
    activities: ['Fill has/have', 'Make sentences about what you have'],
    questions: [
      { id: 'e24q1', type: 'fill', question: 'I ___ a pen. (has/have)', answer: 'have' },
      { id: 'e24q2', type: 'fill', question: 'She ___ a doll. (has/have)', answer: 'has' },
    ],
    prerequisites: ['e18'], parentGuide: ['I have, She has - practice together']
  },
  {
    id: 'e25', subject: 'english', unit: 'Reading', topic: 'Poem', title: 'Poem - Twinkle Twinkle', difficulty: 'easy', duration: 10,
    explanation: 'Twinkle, twinkle, little star, How I wonder what you are! Up above the world so high, Like a diamond in the sky.',
    examples: ['Read the poem', 'Sing the poem', 'Draw a star'],
    activities: ['Sing together', 'Draw what you hear', 'Say the poem from memory'],
    questions: [
      { id: 'e25q1', type: 'oral', question: 'Sing Twinkle Twinkle', answer: 'Twinkle twinkle little star...' },
    ],
    prerequisites: [], parentGuide: ['Sing together', 'Make it fun!']
  },
  {
    id: 'e26', subject: 'english', unit: 'Unit 3', topic: 'Games', title: 'Fun and Games', difficulty: 'easy', duration: 10,
    explanation: 'We play many games. Let us learn their names in English.',
    examples: ['Cricket 🏏', 'Football ⚽', 'Chess ♟️', 'Hide and Seek', 'Tag', 'Ludo 🎲'],
    activities: ['Name games you play', 'Draw your favourite game', 'Say "I like to play ___"'],
    questions: [
      { id: 'e26q1', type: 'mcq', question: 'We play cricket with a ___?', options: ['Bat and ball', 'Racket', 'Chess'], answer: 'Bat and ball' },
    ],
    prerequisites: ['e10'], parentGuide: ['Talk about games in English']
  },
  {
    id: 'e27', subject: 'english', unit: 'Unit 4', topic: 'Seasons', title: 'Weather and Seasons', difficulty: 'easy', duration: 10,
    explanation: 'We have different seasons: Summer, Winter, Rainy.',
    examples: ['Summer ☀️ - Hot, we eat ice cream', 'Winter ❄️ - Cold, we wear sweaters', 'Rainy 🌧️ - Rain, we use umbrella'],
    activities: ['What season is it now?', 'Draw each season', 'What do we wear in each season?'],
    questions: [
      { id: 'e27q1', type: 'mcq', question: 'In summer it is ___?', options: ['Hot', 'Cold', 'Rainy'], answer: 'Hot' },
      { id: 'e27q2', type: 'mcq', question: 'We use umbrella in ___?', options: ['Rainy season', 'Summer', 'Winter'], answer: 'Rainy season' },
    ],
    prerequisites: ['e16'], parentGuide: ['Look outside, what weather is it?']
  },
  {
    id: 'e28', subject: 'english', unit: 'Grammar', topic: 'Articles', title: 'A, An, The', difficulty: 'medium', duration: 15,
    explanation: 'A = before consonant sounds. An = before vowel sounds. The = for something specific.',
    examples: ['A cat', 'An apple', 'The sun', 'A dog', 'An egg', 'The moon'],
    activities: ['Fill a/an', 'Use the correctly'],
    questions: [
      { id: 'e28q1', type: 'fill', question: '___ apple (a/an)', answer: 'An' },
      { id: 'e28q2', type: 'fill', question: '___ cat (a/an)', answer: 'A' },
      { id: 'e28q3', type: 'fill', question: '___ sun is hot. (A/The)', answer: 'The' },
    ],
    prerequisites: ['e5'], parentGuide: ['Vowel before "an", consonant before "a"']
  },
  {
    id: 'e29', subject: 'english', unit: 'Writing', topic: 'Sentence Writing', title: 'Write Your Own Sentences', difficulty: 'hard', duration: 15,
    explanation: 'Now let us write our own sentences!',
    examples: ['I like mango.', 'My school is big.', 'I have a dog.', 'The sky is blue.'],
    activities: ['Write 5 sentences about yourself', 'Write about your family', 'Write about your school'],
    questions: [
      { id: 'e29q1', type: 'write', question: 'Write: I like to play.', answer: 'I like to play.' },
      { id: 'e29q2', type: 'write', question: 'Write: My name is ___.', answer: 'My name is' },
    ],
    prerequisites: ['e15'], parentGuide: ['Start with simple sentences', 'Help with spelling']
  },
  {
    id: 'e30', subject: 'english', unit: 'Revision', topic: 'Mixed Practice', title: 'English Mixed Practice', difficulty: 'medium', duration: 20,
    explanation: 'Let us practice everything we have learned!',
    examples: ['Alphabet', 'Vowels', 'Naming/Describing/Action words', 'Sentences'],
    activities: ['Alphabet quiz', 'Grammar quiz', 'Reading passage', 'Sentence writing'],
    questions: [
      { id: 'e30q1', type: 'mcq', question: 'How many vowels?', options: ['5', '3', '7'], answer: '5' },
      { id: 'e30q2', type: 'mcq', question: '"Run" is a ___ word.', options: ['Action', 'Naming', 'Describing'], answer: 'Action' },
      { id: 'e30q3', type: 'fill', question: 'She ___ my friend. (is/am/are)', answer: 'is' },
    ],
    prerequisites: ['e15', 'e18'], parentGuide: ['Mix all topics', 'Focus on weak areas']
  },
];

export const allEnglishLessons = [...englishLessons, ...englishAdditionalLessons];
