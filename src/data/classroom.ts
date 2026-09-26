// Google Classroom Integration - Simulated data from Ideal Academy Class 1
// In production, this would connect to Google Classroom API

export interface ClassroomAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  teacher: string;
  subject: string;
  emoji: string;
  attachments?: string[];
}

export interface ClassroomAssignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  description: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  materials: ClassroomMaterial[];
  emoji: string;
}

export interface ClassroomMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'doc' | 'image';
  url?: string;
  content?: string;
  emoji: string;
}

export interface ClassroomClasswork {
  id: string;
  title: string;
  subject: string;
  type: 'assignment' | 'quiz' | 'question' | 'material';
  emoji: string;
  description: string;
  content?: string;
  questions?: { q: string; a: string; options?: string[] }[];
}

export const classroomConfig = {
  schoolName: 'Ideal Academy, Indore',
  className: 'Class 1 - A',
  teacher: 'Mrs. Sharma',
  classCode: 'abc123xyz',
  academicYear: '2026-27',
  subjects: [
    { name: 'English', teacher: 'Mrs. Verma', emoji: '📖', color: 'from-blue-400 to-cyan-400' },
    { name: 'Hindi', teacher: 'Mrs. Sharma', emoji: '✏️', color: 'from-orange-400 to-red-400' },
    { name: 'Mathematics', teacher: 'Mrs. Gupta', emoji: '🔢', color: 'from-green-400 to-emerald-400' },
    { name: 'EVS', teacher: 'Mrs. Patel', emoji: '🌱', color: 'from-yellow-400 to-orange-400' },
    { name: 'Art', teacher: 'Mrs. Singh', emoji: '🎨', color: 'from-pink-400 to-rose-400' },
    { name: 'Safety', teacher: 'Mrs. Khan', emoji: '🛡️', color: 'from-purple-400 to-pink-400' },
  ],
};

export const announcements: ClassroomAnnouncement[] = [
  {
    id: 'a1',
    title: '🎉 Welcome to New Session 2026-27!',
    content: 'Dear parents and students, welcome to the new academic session! We are excited to begin this journey of learning together. Please ensure your child has all the required books and supplies.',
    date: '2026-04-01',
    teacher: 'Mrs. Sharma',
    subject: 'All',
    emoji: '🎉',
  },
  {
    id: 'a2',
    title: '📚 Book List for Class 1',
    content: 'Please find the book list for Class 1:\n\n• English: Treasures of English Part 1 (Cordova)\n• Hindi: e-son Chirieya (Rachna Sagar)\n• Maths: e-Maths Xplorer (Rachna Sagar)\n• EVS: Learning Science 2.0 (Creative Kids)\n• Safety: My First Safety Workbook (Edusynergies)\n• Art: Integration of Arts in Pedagogy (APC)',
    date: '2026-04-02',
    teacher: 'Mrs. Sharma',
    subject: 'All',
    emoji: '📚',
    attachments: ['Booklist-Class-1.pdf'],
  },
  {
    id: 'a3',
    title: '✏️ Hindi Writing Practice Important',
    content: 'Dear parents, please ensure your child practices Hindi writing daily for at least 15 minutes. Focus on:\n\n1. स्वर (अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ)\n2. मात्रा practice (आ की, इ की, ई की, etc.)\n3. Simple words and sentences\n\nRegular practice will help build strong foundation.',
    date: '2026-04-15',
    teacher: 'Mrs. Sharma',
    subject: 'Hindi',
    emoji: '✏️',
  },
  {
    id: 'a4',
    title: '➕ Maths - Addition Practice',
    content: 'This week we are learning addition within 20. Please help your child practice:\n\n• 2 + 3 = 5\n• 5 + 4 = 9\n• 7 + 6 = 13\n\nUse objects like pencils, buttons, or fruits for visual learning.',
    date: '2026-04-20',
    teacher: 'Mrs. Gupta',
    subject: 'Mathematics',
    emoji: '➕',
  },
  {
    id: 'a5',
    title: '🗣️ English Speaking Day',
    content: 'Every Wednesday is English Speaking Day! Children should try to speak in English throughout the day. Parents, please encourage your child to use simple English sentences at home.',
    date: '2026-04-22',
    teacher: 'Mrs. Verma',
    subject: 'English',
    emoji: '🗣️',
  },
  {
    id: 'a6',
    title: '🌱 EVS - Plant a Seed Activity',
    content: 'This week\'s activity: Plant a moong dal seed in a cotton ball. Observe it daily and note what happens. Bring your observation to class on Friday.',
    date: '2026-04-25',
    teacher: 'Mrs. Patel',
    subject: 'EVS',
    emoji: '🌱',
  },
];

export const assignments: ClassroomAssignment[] = [
  {
    id: 'as1',
    title: 'Hindi Writing - स्वर Practice',
    subject: 'Hindi',
    dueDate: '2026-04-18',
    description: 'Write each स्वर (अ, आ, इ, ई, उ, ऊ) 5 times in your notebook. Also write the word for each letter.',
    points: 10,
    status: 'submitted',
    grade: 9,
    materials: [
      { id: 'm1', title: 'Swar Writing Sheet', type: 'pdf', emoji: '📄' },
      { id: 'm2', title: 'Video: How to write स्वर', type: 'video', emoji: '🎥' },
    ],
    emoji: '✏️',
  },
  {
    id: 'as2',
    title: 'Maths - Addition Worksheet',
    subject: 'Mathematics',
    dueDate: '2026-04-22',
    description: 'Solve the following addition problems:\n1. 3 + 4 = ?\n2. 5 + 2 = ?\n3. 6 + 3 = ?\n4. 7 + 1 = ?\n5. 4 + 4 = ?',
    points: 10,
    status: 'graded',
    grade: 10,
    materials: [
      { id: 'm3', title: 'Addition Worksheet', type: 'pdf', emoji: '📄' },
    ],
    emoji: '➕',
  },
  {
    id: 'as3',
    title: 'English - My Family Drawing',
    subject: 'English',
    dueDate: '2026-04-20',
    description: 'Draw your family and write 3 sentences about them:\n1. This is my ___.\n2. My ___ is ___.\n3. I love my ___.',
    points: 10,
    status: 'submitted',
    grade: 8,
    materials: [
      { id: 'm4', title: 'Family Words List', type: 'doc', emoji: '📝' },
    ],
    emoji: '📖',
  },
  {
    id: 'as4',
    title: 'EVS - My Body Parts',
    subject: 'EVS',
    dueDate: '2026-04-25',
    description: 'Draw a human body and label these parts:\n• Head, Eyes, Ears, Nose, Mouth\n• Hands, Legs, Feet\n\nWrite one sentence about what each part does.',
    points: 10,
    status: 'pending',
    materials: [
      { id: 'm5', title: 'Body Parts Worksheet', type: 'pdf', emoji: '📄' },
      { id: 'm6', title: 'Video: My Body', type: 'video', emoji: '🎥' },
    ],
    emoji: '🌱',
  },
  {
    id: 'as5',
    title: 'Hindi - Matra Practice (आ की मात्रा)',
    subject: 'Hindi',
    dueDate: '2026-04-28',
    description: 'Practice आ की मात्रा:\n\nWrite these words 3 times each:\n• काम\n• नाम\n• ताला\n• पानी\n\nAlso make 3 new words with आ की मात्रा.',
    points: 10,
    status: 'pending',
    materials: [
      { id: 'm7', title: 'Matra Practice Sheet', type: 'pdf', emoji: '📄' },
    ],
    emoji: '✏️',
  },
  {
    id: 'as6',
    title: 'Maths - Subtraction Practice',
    subject: 'Mathematics',
    dueDate: '2026-04-30',
    description: 'Solve these subtraction problems:\n1. 5 - 2 = ?\n2. 8 - 3 = ?\n3. 7 - 4 = ?\n4. 9 - 5 = ?\n5. 10 - 6 = ?',
    points: 10,
    status: 'pending',
    materials: [
      { id: 'm8', title: 'Subtraction Worksheet', type: 'pdf', emoji: '📄' },
    ],
    emoji: '➖',
  },
];

export const classwork: ClassroomClasswork[] = [
  {
    id: 'cw1',
    title: 'English - Sight Words Quiz',
    subject: 'English',
    type: 'quiz',
    emoji: '📖',
    description: 'Match the sight words with their meanings',
    questions: [
      { q: 'What does "the" mean in Hindi?', a: 'वह/यह', options: ['वह/यह', 'और', 'में'] },
      { q: 'What does "is" mean in Hindi?', a: 'है', options: ['है', 'हैं', 'था'] },
      { q: 'What does "my" mean in Hindi?', a: 'मेरा', options: ['मेरा', 'तुम्हारा', 'उसका'] },
    ],
  },
  {
    id: 'cw2',
    title: 'Hindi - Swar Recognition',
    subject: 'Hindi',
    type: 'quiz',
    emoji: '✏️',
    description: 'Identify the correct स्वर',
    questions: [
      { q: 'अ से क्या होता है?', a: 'अनार', options: ['अनार', 'आम', 'इमली'] },
      { q: 'आ से क्या होता है?', a: 'आम', options: ['आम', 'अनार', 'ईख'] },
      { q: 'इ से क्या होता है?', a: 'इमली', options: ['इमली', 'आम', 'उल्लू'] },
    ],
  },
  {
    id: 'cw3',
    title: 'Maths - Number Recognition',
    subject: 'Mathematics',
    type: 'quiz',
    emoji: '🔢',
    description: 'Recognize numbers and their names',
    questions: [
      { q: 'What number is "seven"?', a: '7', options: ['7', '6', '8'] },
      { q: 'What comes after 12?', a: '13', options: ['13', '11', '14'] },
      { q: 'Which is bigger: 15 or 20?', a: '20', options: ['20', '15', 'Same'] },
    ],
  },
  {
    id: 'cw4',
    title: 'EVS - Sense Organs',
    subject: 'EVS',
    type: 'quiz',
    emoji: '🌱',
    description: 'Match sense organs with their function',
    questions: [
      { q: 'We see with our?', a: 'Eyes', options: ['Eyes', 'Ears', 'Nose'] },
      { q: 'We hear with our?', a: 'Ears', options: ['Ears', 'Eyes', 'Tongue'] },
      { q: 'We smell with our?', a: 'Nose', options: ['Nose', 'Eyes', 'Skin'] },
    ],
  },
  {
    id: 'cw5',
    title: 'Hindi - Matra Practice',
    subject: 'Hindi',
    type: 'material',
    emoji: '✏️',
    description: 'Learn and practice all matras',
    content: `
आ की मात्रा (ा): क → का, त → ता, न → ना
इ की मात्रा (ि): क → कि, त → ति, न → नि  
ई की मात्रा (ी): क → की, त → ती, न → नी
उ की मात्रा (ु): क → कु, त → तु, न → नु
ऊ की मात्रा (ू): क → कू, त → तू, न → नू
ए की मात्रा (े): क → के, त → ते, न → ने
ओ की मात्रा (ो): क → को, त → तो, न → नो
    `,
  },
  {
    id: 'cw6',
    title: 'English - Phonics Song',
    subject: 'English',
    type: 'material',
    emoji: '📖',
    description: 'Learn the alphabet sounds',
    content: `
A says /a/ as in Apple 🍎
B says /b/ as in Ball ⚽
C says /k/ as in Cat 🐱
D says /d/ as in Dog 🐕
E says /e/ as in Egg 🥚
F says /f/ as in Fish 🐟
G says /g/ as in Grapes 🍇
H says /h/ as in Hat 🎩
    `,
  },
  {
    id: 'cw7',
    title: 'Maths - Tables 2, 5, 10',
    subject: 'Mathematics',
    type: 'material',
    emoji: '🔢',
    description: 'Learn multiplication tables',
    content: `
Table of 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
Table of 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
Table of 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
    `,
  },
];

export const schedule = [
  { day: 'Monday', subjects: ['Hindi', 'English', 'Maths', 'EVS', 'Art'] },
  { day: 'Tuesday', subjects: ['English', 'Hindi', 'Maths', 'EVS', 'Safety'] },
  { day: 'Wednesday', subjects: ['Hindi', 'Maths', 'English', 'Art', 'EVS'] },
  { day: 'Thursday', subjects: ['Maths', 'English', 'Hindi', 'EVS', 'Art'] },
  { day: 'Friday', subjects: ['English', 'Hindi', 'Maths', 'Safety', 'EVS'] },
  { day: 'Saturday', subjects: ['Revision', 'Fun Activities', 'Speaking Practice'] },
];

export const upcomingEvents = [
  { date: '2026-05-01', title: 'May Day Holiday', emoji: '🎉' },
  { date: '2026-05-15', title: 'Hindi Writing Test', emoji: '✏️' },
  { date: '2026-05-20', title: 'Maths Addition Test', emoji: '➕' },
  { date: '2026-05-25', title: 'English Speaking Assessment', emoji: '🗣️' },
  { date: '2026-06-01', title: 'Monthly Test - All Subjects', emoji: '📝' },
];
