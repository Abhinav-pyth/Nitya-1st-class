// Public SEO landing-page content (rendered statically at build time by scripts/prerender.mjs).
// NOTE: keep this file free of imports so the prerender script can evaluate it directly.

export interface SeoPage {
  route: string;            // e.g. "/class-1-maths/"
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  sampleQuestions: { question: string; answer: string; explain: string }[];
  related: { label: string; href: string }[];
  breadcrumb: { name: string; href: string }[];
  appLink: { label: string; page: string }; // deep link into the SPA via /?open=<page>
}

export const seoPages: SeoPage[] = [
  {
    route: '/',
    title: 'Class 1 Learning Games & CBSE Practice | Nitya Learning Buddy',
    description: 'Explore interactive Class 1 English, Maths, Hindi, EVS and GK lessons aligned with the supplied 2026–27 syllabus, with quizzes, learning games and fun practice activities.',
    h1: 'Class 1 Learning Buddy — Fun CBSE Lessons, Quizzes & Games',
    intro: 'Nitya Learning Buddy is a free, ad-free learning companion for Class 1 children (ages 5–7). It covers English (Mridang), Mathematics (Joyful Mathematics), Hindi (Sarangi), EVS and General Knowledge with short interactive lessons, practice questions with instant feedback, educational games and gentle progress tracking — all mobile-friendly and in simple language.',
    sections: [
      { heading: 'What your child can learn here', body: 'Numbers 1–99, addition & subtraction with pictures, shapes, patterns, money and measurement in Maths. Alphabet, phonics, three-letter words, grammar basics and reading in English. Devanagari varnamala, matras and simple sentences in Hindi. Body, senses, plants, animals, weather and community helpers in EVS. Days, months, colours, shapes, festivals and transport in core GK — plus an optional GK Explorer for curious older kids.' },
      { heading: 'How the app works', body: 'Pick a subject, open a topic, read a short lesson with examples, then answer practice questions. Correct answers earn stars; topics with repeated mistakes are suggested again for revision. There are no timers, no punishments and no ads — only encouragement.' },
      { heading: 'Games that teach', body: 'Play & Learn includes counting adventures, word builder, alphabet quest, memory match, mazes, jigsaw puzzles, pattern detective, shadow matching, tracing studio and more — each connected to real Class 1 skills.' },
    ],
    sampleQuestions: [
      { question: 'How many days are there in a week?', answer: '7', explain: 'Monday through Sunday — seven days make one week.' },
      { question: 'What is 6 + 3?', answer: '9', explain: 'Count on from 6: 7, 8, 9.' },
      { question: 'Which festival is known as the festival of lights?', answer: 'Diwali', explain: 'Diwali is celebrated with diyas, lights and sweets.' },
    ],
    related: [
      { label: 'Class 1 Maths practice', href: '/class-1-maths/' },
      { label: 'Class 1 English lessons', href: '/class-1-english/' },
      { label: 'Hindi varnamala practice', href: '/class-1-hindi/' },
      { label: 'GK questions for ages 7–8', href: '/gk-questions-for-ages-7-8/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }],
    appLink: { label: 'Start Learning Now →', page: 'home' },
  },
  {
    route: '/class-1-english/',
    title: 'Class 1 English (Mridang) Lessons: Phonics, Words & Grammar',
    description: 'Free interactive Class 1 English lessons — alphabet A–Z, phonics, vowels, three-letter words, a/an, this/that, pronouns, punctuation and picture reading with practice quizzes.',
    h1: 'Class 1 English — Mridang Syllabus Practice',
    intro: 'These English lessons follow the Class 1 (Mridang) themes: My Family and Me, Life Around Us, Food, Seasons, Alphabet & Phonics, and Basic Grammar. Every topic has a mini-lesson, examples you can hear aloud, and at least five practice questions with instant feedback.',
    sections: [
      { heading: 'Alphabet & phonics', body: 'Recognise capital and small letters, learn letter sounds, spot vowels (a, e, i, o, u) among consonants, and match letters to pictures like A for Apple, B for Ball.' },
      { heading: 'Words & sentences', body: 'Build three-letter words such as CAT, SUN and PEN with letter tiles, fill missing letters, learn singular and plural, and use a/an, this/that, he/she/it in simple sentences.' },
      { heading: 'Reading & listening', body: 'Read short picture-based passages, sequence story events (like the traditional tale The Cap-seller and the Monkeys), and answer who/what/where questions about stories.' },
    ],
    sampleQuestions: [
      { question: 'Which word starts with the short "a" sound?', answer: 'Apple', explain: 'A says /a/ in Apple, Ant and Axe.' },
      { question: 'Fill the blank: I ___ a student.', answer: 'am', explain: 'We use "am" with I: I am happy, I am six.' },
      { question: 'One mouse, two ...?', answer: 'mice', explain: 'Mouse changes to mice — an irregular plural.' },
    ],
    related: [
      { label: 'Hindi letters & sounds', href: '/class-1-hindi/' },
      { label: 'Maths number games', href: '/class-1-maths/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Class 1 English', href: '/class-1-english/' }],
    appLink: { label: 'Open English Lessons →', page: 'english' },
  },
  {
    route: '/class-1-maths/',
    title: 'Class 1 Maths (Joyful Mathematics): Counting, Addition & Shapes',
    description: 'Interactive Class 1 maths practice — numbers 1–99, counting, before/after/between, addition and subtraction with pictures, shapes, patterns, money, time and measurement.',
    h1: 'Class 1 Mathematics — Joyful Mathematics Practice',
    intro: 'Aligned to the Joyful Mathematics chapters, this section builds number sense step by step: pre-number ideas (big/small, more/less), counting with visual groups and tens, single-digit then double-digit addition and subtraction, shapes, patterns, measurement, time, money and simple data handling.',
    sections: [
      { heading: 'Number sense 1–99', body: 'Count objects, recognise numerals, match numbers to quantities, find numbers before/after/between, order numbers ascending and descending, and understand tens and ones with bundle-of-ten pictures.' },
      { heading: 'Addition & subtraction', body: 'Add by joining groups, subtract by crossing objects away, hop along the number line, solve number bonds and read tiny word problems like "Riya had 5 apples, she ate 2 — how many left?"' },
      { heading: 'Shapes, patterns & measures', body: 'Identify circles, squares, triangles and rectangles in daily objects, complete shape and colour patterns, compare long/short and heavy/light, recognise Indian coins and tell morning from night.' },
    ],
    sampleQuestions: [
      { question: 'What number comes just after 49?', answer: '50', explain: 'After 49 we complete four tens and get 50.' },
      { question: '7 + 5 = ?', answer: '12', explain: 'Take 3 from the 5 to make 7 into 10, then add the remaining 2 → 12.' },
      { question: 'How many sides does a rectangle have?', answer: '4', explain: 'A rectangle has 4 sides — two long and two short.' },
    ],
    related: [
      { label: 'Colours & shapes for kids', href: '/colours-and-shapes-for-kids/' },
      { label: 'Days & months (time unit)', href: '/days-and-months-for-kids/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Class 1 Maths', href: '/class-1-maths/' }],
    appLink: { label: 'Open Maths Lessons →', page: 'maths' },
  },
  {
    route: '/class-1-hindi/',
    title: 'कक्षा 1 हिंदी (सारंगी): स्वर, व्यंजन, मात्राएँ और शब्द',
    description: 'इंटरैक्टिव कक्षा 1 हिंदी पाठ — अ से अः स्वर, क से ज्ञ व्यंजन, मात्राएँ, सरल शब्द, विलोम और कहानियाँ, अभ्यास प्रश्नों के साथ।',
    h1: 'कक्षा 1 की हिंदी — सारंगी पाठ्यक्रम का अभ्यास',
    intro: 'यह खंड कक्षा 1 की हिंदी (सारंगी) के अनुसार है: देवनागरी वर्णमाला, अक्षर पहचान, अक्षर-चित्र मिलान, मात्राएँ, दो-तीन-चार अक्षरों के सरल शब्द, मेरा परिचय, परिवार, पशु-पक्षी, त्योहार, ऋतुएँ और छोटी कहानियाँ। हर पाठ में उदाहरण, सुनने का अभ्यास और प्रश्न हैं।',
    sections: [
      { heading: 'वर्णमाला और ध्वनियाँ', body: 'अ से अः तक स्वर और क से ज्ञ तक व्यंजन पहचानें, अक्षर को सही चित्र से मिलाएँ (अ – अनार, आ – आम), और अक्षरों का क्रम सीखें।' },
      { heading: 'मात्राएँ और शब्द', body: 'ा, ि, ी, ु, ू, े, ै, ो, ौ की पहचान करें, "क + ा = का" जैसे जोड़े बनाएँ और रिक्त स्थान भरें।' },
      { heading: 'कहानियाँ और वाक्य', body: 'छोटी हिंदी कहानियाँ सुनें, पात्रों के बारे में उत्तर दें, विलोम शब्द (दिन–रात) खेलें और सरल वाक्य बनाएँ।' },
    ],
    sampleQuestions: [
      { question: '"आ" से कौन सा फल शुरू होता है?', answer: 'आम', explain: '"आ" से आम बनता है; अंजीर "अ" से शुरू होता है।' },
      { question: 'दिन का विलोम क्या है?', answer: 'रात', explain: 'दिन के बाद रात आती है।' },
      { question: '"म" + "ा" से कौन सा अक्षर बना?', answer: 'मा', explain: 'व्यंजन के साथ मात्रा जुड़कर मा बनता है।' },
    ],
    related: [
      { label: 'English lessons', href: '/class-1-english/' },
      { label: 'EVS for kids', href: '/class-1-evs/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'कक्षा 1 हिंदी', href: '/class-1-hindi/' }],
    appLink: { label: 'हिंदी पाठ खोलें →', page: 'hindi' },
  },
  {
    route: '/class-1-evs/',
    title: 'Class 1 EVS: Body, Senses, Plants, Animals & Weather Lessons',
    description: 'Fun Class 1 environmental studies — my body and five senses, family and school, plants and trees, animals and habitats, water, seasons, transport and safety, with quizzes.',
    h1: 'Class 1 EVS — Explore the World Around You',
    intro: 'Our EVS lessons turn everyday surroundings into discoveries: the human body and five senses, healthy habits, family and community helpers, plants and their parts, domestic vs wild animals, birds and their sounds, water uses and conservation, weather and the four seasons of India, land/water/air transport, and safety rules.',
    sections: [
      { heading: 'Me and my world', body: 'Name body parts, match each sense to its organ, practise hygiene habits and learn who helps us — doctor, teacher, farmer, police.' },
      { heading: 'Plants & animals', body: 'Root, stem, leaf, flower — learn each part with pictures. Sort animals into pets, wild animals and farm animals; match animal sounds and babies (cow–calf).' },
      { heading: 'Water, air & seasons', body: 'Where does rain come from? List uses of water, dress for each season and observe sunny, rainy, cloudy and windy days.' },
    ],
    sampleQuestions: [
      { question: 'Which part of a plant drinks water from the soil?', answer: 'Roots', explain: 'Roots hold the plant and take in water.' },
      { question: 'We see with our...', answer: 'eyes', explain: 'Eyes are the organ of sight.' },
      { question: 'Baby of a cow is called?', answer: 'Calf', explain: 'A young cow is a calf.' },
    ],
    related: [
      { label: 'Transport for kids', href: '/transport-for-kids/' },
      { label: 'Festivals of India', href: '/indian-festivals-for-kids/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Class 1 EVS', href: '/class-1-evs/' }],
    appLink: { label: 'Open EVS Lessons →', page: 'evs' },
  },
  {
    route: '/class-1-gk/',
    title: 'Class 1 General Knowledge: Days, Months, Colours & Festivals',
    description: 'Prescribed Class 1 GK made easy — days of the week, months of the year, colours, shapes, Indian festivals and modes of transport with interactive practice questions.',
    h1: 'Class 1 GK — Core General Knowledge Practice',
    intro: 'The required Class 1 GK topics, practised the fun way: put the days of the week in order, match months to names, identify colours and shapes, connect festivals to pictures and sort transport into land, water and air. Each topic includes short lessons and five or more validated questions.',
    sections: [
      { heading: 'Calendar basics', body: 'Seven days make a week (Monday first, weekend = Saturday & Sunday); twelve months make a year (January first, December last).' },
      { heading: 'Colours & shapes', body: 'Name the colour of the sky, leaves and snow; count sides of triangles and squares; find shapes hidden in everyday objects.' },
      { heading: 'Festivals & transport', body: 'Diwali = lights, Holi = colours, Onam = Kerala harvest; boats float, cycles roll, planes fly — sort them into land, water and air.' },
    ],
    sampleQuestions: [
      { question: 'Which day comes after Wednesday?', answer: 'Thursday', explain: 'The week goes Mon, Tue, Wed, Thu…' },
      { question: 'Which is the first month of the year?', answer: 'January', explain: 'Every new year begins in January.' },
      { question: 'Which vehicle travels on water?', answer: 'Boat', explain: 'Boats and ships float and move on water.' },
    ],
    related: [
      { label: 'Days & months drill', href: '/days-and-months-for-kids/' },
      { label: 'Extra GK for ages 7–8', href: '/gk-questions-for-ages-7-8/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Class 1 GK', href: '/class-1-gk/' }],
    appLink: { label: 'Open GK Lessons →', page: 'gk' },
  },
  {
    route: '/days-and-months-for-kids/',
    title: 'Days of the Week & Months of the Year for Kids | Class 1',
    description: 'Learn the 7 days and 12 months with songs, ordering games and quick quizzes designed for Class 1 children.',
    h1: 'Days and Months for Kids',
    intro: 'A week has 7 days and a year has 12 months. Kids remember best through rhythm and repetition — say the days song every morning, point at a calendar, then test yourself with these mini-quizzes.',
    sections: [
      { heading: 'The 7 days', body: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. School runs Monday to Friday; Saturday and Sunday are the weekend.' },
      { heading: 'The 12 months', body: 'January, February, March, April, May, June, July, August, September, October, November, December. February is the shortest month.' },
      { heading: 'Practice games', body: 'In the app you can put days into order, name the day that comes after a given day, and match birthdays to months.' },
    ],
    sampleQuestions: [
      { question: 'What comes before Friday?', answer: 'Thursday', explain: 'Thursday → Friday → Saturday.' },
      { question: 'How many months have 31 days in a year?', answer: '7', explain: 'Jan, Mar, May, Jul, Aug, Oct, Dec — seven big months.' },
      { question: 'The last day of the week is...', answer: 'Sunday', explain: 'After Sunday, a brand-new week starts with Monday.' },
    ],
    related: [
      { label: 'Core GK lessons', href: '/class-1-gk/' },
      { label: 'Maths time & calendar unit', href: '/class-1-maths/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Days & Months', href: '/days-and-months-for-kids/' }],
    appLink: { label: 'Play the Days & Months Quiz →', page: 'gk' },
  },
  {
    route: '/colours-and-shapes-for-kids/',
    title: 'Colours and Shapes for Kids | Class 1 Practice',
    description: 'Teach Class 1 kids colours and basic shapes with picture matching, sorting games and easy quizzes.',
    h1: 'Colours and Shapes for Kids',
    intro: 'Colour and shape words are a child\'s first vocabulary for describing the world. Start with red, blue, green, yellow; then circle, square, triangle and rectangle — found everywhere in toys, windows, plates and roads.',
    sections: [
      { heading: 'Rainbow colours', body: 'VIBGYOR stands for the rainbow: Violet, Indigo, Blue, Green, Yellow, Orange, Red. A rainbow appears when sunlight passes through raindrops.' },
      { heading: 'Shape hunt', body: 'A clock is a circle, a slice of pizza is a triangle, a book is a rectangle. Play "find three round things" at home.' },
      { heading: 'Sorting games', body: 'In the app, tap objects into colour and shape baskets — building observation skills used later in maths data handling.' },
    ],
    sampleQuestions: [
      { question: 'How many colours are in a rainbow?', answer: '7', explain: 'Remember VIBGYOR — seven bands of colour.' },
      { question: 'Which shape rolls easily?', answer: 'Circle', explain: 'Round shapes with no corners can roll.' },
      { question: 'Leaf colour is usually...', answer: 'Green', explain: 'Leaves contain chlorophyll which makes them green.' },
    ],
    related: [
      { label: 'Maths shapes unit', href: '/class-1-maths/' },
      { label: 'GK core topics', href: '/class-1-gk/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Colours & Shapes', href: '/colours-and-shapes-for-kids/' }],
    appLink: { label: 'Play Sorting Games →', page: 'games' },
  },
  {
    route: '/indian-festivals-for-kids/',
    title: 'Festivals of India for Kids | Class 1 GK Lesson',
    description: 'Simple Class 1 lesson on Diwali, Holi, Eid, Christmas, Onam and more — what each festival means, with matching quizzes for children.',
    h1: 'Indian Festivals for Kids',
    intro: 'India is a land of many festivals celebrated together with joy. Kids learn which festival brings lights, which brings colours, and which belongs to the harvest — building respect for different cultures.',
    sections: [
      { heading: 'Diwali', body: 'The festival of lights — families light diyas, share sweets and celebrate togetherness.' },
      { heading: 'Holi', body: 'The festival of colours — people play with gulal and welcome spring.' },
      { heading: 'Eid, Christmas, Gurpurab, Onam', body: 'Eid follows Ramadan with prayers and feasts; Christmas is on 25 December; Gurpurab celebrates Guru Nanak Ji; Onam is Kerala\'s joyful harvest festival.' },
    ],
    sampleQuestions: [
      { question: 'Which festival do we light diyas?', answer: 'Diwali', explain: 'Rows of little lamps glow on Diwali night.' },
      { question: 'Onam belongs to which state?', answer: 'Kerala', explain: 'Kerala welcomes the harvest with Onam sadya feasts.' },
      { question: 'Christmas is in which month?', answer: 'December', explain: 'Every 25th of December.' },
    ],
    related: [
      { label: 'Core GK lessons', href: '/class-1-gk/' },
      { label: 'EVS seasons & culture', href: '/class-1-evs/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Indian Festivals', href: '/indian-festivals-for-kids/' }],
    appLink: { label: 'Take the Festival Quiz →', page: 'gk' },
  },
  {
    route: '/transport-for-kids/',
    title: 'Modes of Transport for Kids: Land, Water & Air | Class 1',
    description: 'Help Class 1 children sort vehicles into land, water and air transport with pictures, sounds and quick quizzes.',
    h1: 'Modes of Transport for Kids',
    intro: 'Transport carries us from place to place. We sort vehicles into three families: land (bus, train, bicycle), water (boat, ship) and air (aeroplane, helicopter). Great vocabulary, observation and science-start skill for Class 1.',
    sections: [
      { heading: 'Land transport', body: 'Buses, cars, trains, cycles and autos run on roads and tracks. A train runs on rails and can pull many coaches.' },
      { heading: 'Water transport', body: 'Boats, ferries and ships float on rivers, lakes and seas — they carry people and heavy goods across water.' },
      { heading: 'Air transport', body: 'Aeroplanes and helicopters fly in the sky — the fastest way to travel far away. Helicopters can even lift straight up.' },
    ],
    sampleQuestions: [
      { question: 'Which transport crosses a river most easily?', answer: 'Boat', explain: 'Boats float and row across rivers.' },
      { question: 'A helicopter flies in the...', answer: 'air', explain: 'Helicopters are air transport.' },
      { question: 'Which one runs on tracks?', answer: 'Train', explain: 'Trains need railway tracks to roll.' },
    ],
    related: [
      { label: 'EVS transport lessons', href: '/class-1-evs/' },
      { label: 'GK core lessons', href: '/class-1-gk/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'Transport for Kids', href: '/transport-for-kids/' }],
    appLink: { label: 'Play Transport Sorting →', page: 'gk' },
  },
  {
    route: '/gk-questions-for-ages-7-8/',
    title: 'GK Questions for Ages 7-8: Solar System, India & World Quiz',
    description: 'Curated general-knowledge enrichment for 7–8 year olds — states & capitals, monuments, planets, animals, sports, scientists, safety and logic brain teasers.',
    h1: 'GK Explorer — Beyond-the-Syllabus Questions (Ages 7–8)',
    intro: 'Ready for more? This optional enrichment zone stretches curious minds with gently graded GK: Indian states and capitals, monuments, Madhya Pradesh geography, the solar system, wildlife habitats, great Indians including women achievers, sports, music, road safety, digital citizenship, world landmarks, recycling and logic puzzles. Enrichment stays separate from required syllabus work.',
    sections: [
      { heading: 'India module', body: 'Capitals of Uttar Pradesh, Bihar, Punjab, Tamil Nadu; Taj Mahal in Agra; Gateway of India in Mumbai; why MP is the Heart of India.' },
      { heading: 'World & space module', body: 'Jupiter is the biggest planet, Saturn wears rings, Mercury hugs the Sun; Eiffel Tower in Paris, pyramids in Egypt, Great Wall in China.' },
      { heading: 'People & planet module', body: 'Dr. Kalam the Missile Man, astronaut Kalpana Chawla, boxer Mary Kom; plus the 3 Rs — Reduce, Reuse, Recycle.' },
    ],
    sampleQuestions: [
      { question: 'Which planet is called the red planet?', answer: 'Mars', explain: 'Iron dust gives Mars its rusty red colour.' },
      { question: 'Capital of Uttar Pradesh?', answer: 'Lucknow', explain: 'Lucknow is famous for its culture and cuisine.' },
      { question: 'Who was the first Indian woman in space?', answer: 'Kalpana Chawla', explain: 'She flew aboard the Space Shuttle Columbia.' },
    ],
    related: [
      { label: 'Required Class 1 GK first', href: '/class-1-gk/' },
      { label: 'Science & EVS', href: '/class-1-evs/' },
      { label: 'Home', href: '/' },
    ],
    breadcrumb: [{ name: 'Home', href: '/' }, { name: 'GK Explorer', href: '/gk-questions-for-ages-7-8/' }],
    appLink: { label: 'Open GK Explorer →', page: 'gk-explorer' },
  },
];
