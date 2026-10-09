import { Lesson } from '../types';

// General Knowledge + Science Explorer question bank (also powers the GK subject and the Science Explorer game)
export const gkLessons: Lesson[] = [
  {
    id: 'g1', subject: 'gk', unit: 'Solar System', topic: 'Planets', title: 'The Solar System 🪐', difficulty: 'easy', duration: 10,
    explanation: 'The Sun and the planets that go around it make our solar system. There are 8 planets. Earth is the planet we live on!',
    examples: ['Sun ☀️ is a star at the centre', 'Earth 🌍 — our home, has water and life', 'Moon 🌙 goes around Earth', 'Mars 🔴 is called the red planet'],
    activities: ['Name the 8 planets in order', 'Draw the Sun and Earth', 'Count how many planets have names starting with M'],
    questions: [
      { id: 'g1q1', type: 'mcq', question: 'Which planet do we live on?', options: ['Mars', 'Earth', 'Venus'], answer: 'Earth' },
      { id: 'g1q2', type: 'mcq', question: 'What is the Sun?', options: ['A planet', 'A star', 'A moon'], answer: 'A star' },
      { id: 'g1q3', type: 'mcq', question: 'Which is called the red planet?', options: ['Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
      { id: 'g1q4', type: 'mcq', question: 'What goes around Earth?', options: ['The Sun', 'The Moon', 'Mars'], answer: 'The Moon' },
    ],
    prerequisites: [], parentGuide: ['Look at the night sky together', 'Use a ball to show planets going round']
  },
  {
    id: 'g2', subject: 'gk', unit: 'India', topic: 'National Symbols', title: 'India My Country 🇮🇳', difficulty: 'easy', duration: 10,
    explanation: 'India is our country. It has a national flag, national animal, national bird and many more symbols that make us proud.',
    examples: ['Flag 🇮🇳 — saffron, white and green with a blue chakra', 'National animal — Tiger 🐅', 'National bird — Peacock 🦚', 'National flower — Lotus 🪷', 'National sport — Hockey 🏑'],
    activities: ['Draw the Indian flag', 'Learn the national anthem', 'Find India on a map'],
    questions: [
      { id: 'g2q1', type: 'mcq', question: 'What is the national animal of India?', options: ['Lion', 'Tiger', 'Elephant'], answer: 'Tiger' },
      { id: 'g2q2', type: 'mcq', question: 'What is the national bird of India?', options: ['Peacock', 'Parrot', 'Crow'], answer: 'Peacock' },
      { id: 'g2q3', type: 'mcq', question: 'Which wheel is on our flag?', options: ['Ashoka Chakra', 'Bicycle wheel', 'Sun'], answer: 'Ashoka Chakra' },
      { id: 'g2q4', type: 'mcq', question: 'What is the national flower of India?', options: ['Rose', 'Lotus', 'Sunflower'], answer: 'Lotus' },
    ],
    prerequisites: [], parentGuide: ['Show the tricolour', 'Talk about Republic Day and Independence Day']
  },
  {
    id: 'g3', subject: 'gk', unit: 'Geography', topic: 'States & Capitals', title: 'Indian States & Capitals 🗺️', difficulty: 'medium', duration: 15,
    explanation: 'India has many states. Each state has a capital city, which is its main city. Let us learn some!',
    examples: ['Madhya Pradesh — Bhopal 🏛️', 'Maharashtra — Mumbai 🌊', 'Delhi — New Delhi 🕌', 'Rajasthan — Jaipur 🐪', 'Karnataka — Bengaluru 💻'],
    activities: ['Point to Indore on a map', 'Match 5 states with capitals', 'Colour an India map'],
    questions: [
      { id: 'g3q1', type: 'mcq', question: 'What is the capital of Madhya Pradesh?', options: ['Indore', 'Bhopal', 'Gwalior'], answer: 'Bhopal' },
      { id: 'g3q2', type: 'mcq', question: 'What is the capital of Rajasthan?', options: ['Jaipur', 'Udaipur', 'Jodhpur'], answer: 'Jaipur' },
      { id: 'g3q3', type: 'mcq', question: 'Mumbai is the capital of...', options: ['Gujarat', 'Maharashtra', 'Goa'], answer: 'Maharashtra' },
      { id: 'g3q4', type: 'mcq', question: 'Our national capital is...', options: ['Mumbai', 'New Delhi', 'Kolkata'], answer: 'New Delhi' },
    ],
    prerequisites: [], parentGuide: ['Use a map or globe', 'Start with your own state first']
  },
  {
    id: 'g4', subject: 'gk', unit: 'World', topic: 'Continents & Oceans', title: 'Continents & Oceans 🌏', difficulty: 'medium', duration: 10,
    explanation: 'The big land masses are called continents — there are 7. The huge water areas are oceans — there are 5. Asia is the biggest continent, and India is in Asia!',
    examples: ['Asia 🐘 — biggest continent (India lives here)', 'Africa 🦁 — second biggest', 'Antarctica ❄️ — coldest, covered in ice', 'Pacific Ocean 🌊 — biggest ocean'],
    activities: ['Find Asia on a globe', 'Name the 7 continents', 'Which continent has pandas? (Asia)'],
    questions: [
      { id: 'g4q1', type: 'mcq', question: 'Which is the biggest continent?', options: ['Africa', 'Asia', 'Europe'], answer: 'Asia' },
      { id: 'g4q2', type: 'mcq', question: 'In which continent is India?', options: ['Asia', 'Africa', 'Australia'], answer: 'Asia' },
      { id: 'g4q3', type: 'mcq', question: 'Which is the biggest ocean?', options: ['Pacific', 'Indian', 'Atlantic'], answer: 'Pacific' },
      { id: 'g4q4', type: 'mcq', question: 'How many continents are there?', options: ['5', '7', '9'], answer: '7' },
    ],
    prerequisites: [], parentGuide: ['A puzzle map of the world helps a lot']
  },
  {
    id: 'g5', subject: 'gk', unit: 'Technology', topic: 'Computers', title: 'Basic Computer Knowledge 💻', difficulty: 'easy', duration: 10,
    explanation: 'A computer helps us work, learn and play. It has a screen (monitor), a keyboard for typing, and a mouse for clicking.',
    examples: ['Monitor 🖥️ shows pictures and words', 'Keyboard ⌨️ is used to type', 'Mouse 🖱️ is used to click', 'CPU is the brain of the computer'],
    activities: ['Type your name with help', 'Point out monitor/keyboard/mouse', 'Learn what "click" means'],
    questions: [
      { id: 'g5q1', type: 'mcq', question: 'Which do we use to type?', options: ['Mouse', 'Keyboard', 'Speaker'], answer: 'Keyboard' },
      { id: 'g5q2', type: 'mcq', question: 'Which is the brain of the computer?', options: ['CPU', 'Mouse', 'Monitor'], answer: 'CPU' },
      { id: 'g5q3', type: 'mcq', question: 'What does the monitor do?', options: ['Shows pictures', 'Makes sound', 'Types words'], answer: 'Shows pictures' },
    ],
    prerequisites: [], parentGuide: ['Let the child see real parts of a computer']
  },
  {
    id: 'g6', subject: 'gk', unit: 'Road Safety', topic: 'Traffic Signals', title: 'Traffic Signals & Signs 🚦', difficulty: 'easy', duration: 10,
    explanation: 'Traffic lights tell vehicles when to stop and go. Red means STOP, Green means GO, Yellow means GET READY.',
    examples: ['🔴 Red — Stop! Wait.', '🟢 Green — Go, walk, move.', '🟡 Yellow — Get ready / slow down.', 'Zebra crossing 🦓 — safe place to cross the road'],
    activities: ['Play red-light green-light', 'Spot signals on the road with parents', 'Draw a traffic light'],
    questions: [
      { id: 'g6q1', type: 'mcq', question: 'Which light means STOP?', options: ['Green', 'Red', 'Yellow'], answer: 'Red' },
      { id: 'g6q2', type: 'mcq', question: 'Where should we cross a busy road?', options: ['Zebra crossing', 'Anywhere', 'Between cars'], answer: 'Zebra crossing' },
      { id: 'g6q3', type: 'mcq', question: 'Yellow light means...', options: ['Go fast', 'Get ready / slow down', 'Sleep'], answer: 'Get ready / slow down' },
    ],
    prerequisites: [], parentGuide: ['Practise at real signals while walking']
  },
  {
    id: 'g7', subject: 'gk', unit: 'Space & Time', topic: 'Days Months Seasons', title: 'Days, Months & Calendar 📅', difficulty: 'easy', duration: 10,
    explanation: 'A week has 7 days. A year has 12 months. A year has about 365 days and 3 main seasons in India.',
    examples: ['Week: Mon, Tue, Wed, Thu, Fri, Sat, Sun', 'Year: January … December (12 months)', 'Today, tomorrow, yesterday', 'Sunday is usually a holiday 🎉'],
    activities: ['Sing the days-of-the-week song', 'Find today\'s date on a calendar', 'Count months till your birthday'],
    questions: [
      { id: 'g7q1', type: 'mcq', question: 'How many days in a week?', options: ['5', '7', '10'], answer: '7' },
      { id: 'g7q2', type: 'mcq', question: 'How many months in a year?', options: ['12', '10', '7'], answer: '12' },
      { id: 'g7q3', type: 'mcq', question: 'The day after Monday is...', options: ['Tuesday', 'Sunday', 'Wednesday'], answer: 'Tuesday' },
      { id: 'g7q4', type: 'mcq', question: 'Which is the first month of the year?', options: ['December', 'January', 'June'], answer: 'January' },
    ],
    prerequisites: [], parentGuide: ['Keep a wall calendar and mark dates together']
  },
  {
    id: 'g8', subject: 'gk', unit: 'Famous People', topic: 'Inventors', title: 'Famous Indians & Inventors 🌟', difficulty: 'medium', duration: 10,
    explanation: 'Some special people did great things. Dr APJ Abdul Kalam gave us missiles and was President. Mother Teresa helped poor people. Scientists invent new things.',
    examples: ['Dr APJ Abdul Kalam 🚀 — Missile Man, ex-President', 'Mother Teresa 🤲 — helped the needy', 'Ramanujan 🧮 — great mathematician', 'Edison 💡 — invented the light bulb'],
    activities: ['Tell one thing about Dr Kalam', 'Who invented the bulb?', 'Draw your favourite hero'],
    questions: [
      { id: 'g8q1', type: 'mcq', question: 'Who is called the Missile Man of India?', options: ['Dr APJ Abdul Kalam', 'Rabindranath Tagore', 'Virat Kohli'], answer: 'Dr APJ Abdul Kalam' },
      { id: 'g8q2', type: 'mcq', question: 'Who invented the light bulb?', options: ['Edison', 'Newton', 'Gandhi'], answer: 'Edison' },
      { id: 'g8q3', type: 'mcq', question: 'Mother Teresa was known for...', options: ['Helping poor people', 'Singing songs', 'Flying planes'], answer: 'Helping poor people' },
    ],
    prerequisites: [], parentGuide: ['Simple stories work best for these names']
  },
  {
    id: 'g9', subject: 'gk', unit: 'Science', topic: 'Animal Habitats', title: 'Where Animals Live 🏠', difficulty: 'easy', duration: 10,
    explanation: 'Every animal has a special home called a habitat. Fish live in water, birds in nests, bees in hives.',
    examples: ['Bee 🐝 — hive', 'Bird 🐦 — nest', 'Fish 🐟 — water', 'Dog 🐕 — kennel', 'Lion 🦁 — jungle/cave'],
    activities: ['Match animals to homes', 'Watch birds make nests', 'Sort land and water animals'],
    questions: [
      { id: 'g9q1', type: 'mcq', question: 'Where does a bee live?', options: ['Hive', 'Nest', 'Kennel'], answer: 'Hive' },
      { id: 'g9q2', type: 'mcq', question: 'A fish lives in...', options: ['Water', 'Tree', 'Cave'], answer: 'Water' },
      { id: 'g9q3', type: 'mcq', question: 'A dog lives in a...', options: ['Kennel', 'Stable', 'Coop'], answer: 'Kennel' },
    ],
    prerequisites: [], parentGuide: ['Use picture cards for matching']
  },
  {
    id: 'g10', subject: 'gk', unit: 'Science', topic: 'Everyday Facts', title: 'Cool Science Facts 🔬', difficulty: 'easy', duration: 10,
    explanation: 'Our world is full of amazing facts! Water can be ice, liquid and steam. Plants make our food. The Earth moves around the Sun.',
    examples: ['Ice, water, steam — same thing, 3 forms! 🧊💧☁️', 'Bees make honey 🍯', 'Chameleons change colour 🦎', 'A rainbow has 7 colours 🌈'],
    activities: ['Watch ice melt', 'Spot a rainbow after rain', 'List 3 things that need water'],
    questions: [
      { id: 'g10q1', type: 'mcq', question: 'How many colours in a rainbow?', options: ['5', '7', '10'], answer: '7' },
      { id: 'g10q2', type: 'mcq', question: 'Which animal changes colour?', options: ['Chameleon', 'Cow', 'Sparrow'], answer: 'Chameleon' },
      { id: 'g10q3', type: 'mcq', question: 'Ice melting becomes...', options: ['Water', 'Steam', 'Stone'], answer: 'Water' },
      { id: 'g10q4', type: 'mcq', question: 'Who makes honey?', options: ['Butterfly', 'Bee', 'Ant'], answer: 'Bee' },
    ],
    prerequisites: [], parentGuide: ['Encourage "why?" questions — this builds curiosity']
  },
];

export const allGkLessons = gkLessons;
