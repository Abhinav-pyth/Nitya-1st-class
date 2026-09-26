import { Lesson } from '../types';

export const mathsLessons: Lesson[] = [
  {
    id: 'm1', subject: 'maths', unit: 'Spatial Concepts', topic: 'Top and Bottom', title: 'Top and Bottom', difficulty: 'easy', duration: 10,
    explanation: 'Top means the highest position. Bottom means the lowest position.',
    examples: ['The bird is on TOP of the tree 🌳', 'The cat is at the BOTTOM of the tree 🐱', 'Fan is on TOP of the ceiling', 'Shoes are at the BOTTOM (floor)'],
    activities: ['Point to the top of the room', 'Point to the bottom', 'Draw: star on top, ball at bottom'],
    questions: [
      { id: 'm1q1', type: 'mcq', question: 'Where does a bird sit on a tree?', options: ['Top', 'Bottom', 'Middle'], answer: 'Top' },
      { id: 'm1q2', type: 'mcq', question: 'Where are your shoes?', options: ['Bottom (floor)', 'Top (ceiling)', 'Middle'], answer: 'Bottom (floor)' },
    ],
    prerequisites: [], parentGuide: ['Use real objects', 'Put a toy on top of table, ask where is it?']
  },
  {
    id: 'm2', subject: 'maths', unit: 'Spatial Concepts', topic: 'Big and Small', title: 'Big and Small', difficulty: 'easy', duration: 10,
    explanation: 'Big means large in size. Small means little in size.',
    examples: ['Elephant is BIG 🐘', 'Ant is SMALL 🐜', 'Ball can be big or small', 'Watermelon is big, grape is small'],
    activities: ['Find 3 big things in the room', 'Find 3 small things', 'Draw big and small circles'],
    questions: [
      { id: 'm2q1', type: 'mcq', question: 'Which is bigger?', options: ['Elephant', 'Cat', 'Mouse'], answer: 'Elephant' },
      { id: 'm2q2', type: 'mcq', question: 'Which is smaller?', options: ['Grapes', 'Watermelon', 'Apple'], answer: 'Grapes' },
    ],
    prerequisites: [], parentGuide: ['Compare real objects', 'Which is bigger - your hand or your finger?']
  },
  {
    id: 'm3', subject: 'maths', unit: 'Numbers', topic: 'Numbers 1-10', title: 'Counting 1 to 10', difficulty: 'easy', duration: 10,
    explanation: 'Let us count from 1 to 10. We use numbers to count things.',
    examples: ['1 - One ☝️', '2 - Two ✌️', '3 - Three 🤟', '4 - Four', '5 - Five 🖐️', '6 - Six', '7 - Seven', '8 - Eight', '9 - Nine', '10 - Ten 🔟'],
    activities: ['Count fingers', 'Count toys', 'Count steps while walking'],
    questions: [
      { id: 'm3q1', type: 'mcq', question: 'How many fingers on one hand?', options: ['5', '4', '10'], answer: '5' },
      { id: 'm3q2', type: 'mcq', question: 'What comes after 7?', options: ['8', '6', '9'], answer: '8' },
      { id: 'm3q3', type: 'fill', question: 'Count: 1, 2, 3, ___, 5', answer: '4' },
    ],
    prerequisites: [], parentGuide: ['Count real objects', 'Use fingers first', 'Sing counting songs']
  },
  {
    id: 'm4', subject: 'maths', unit: 'Numbers', topic: 'Numbers 11-20', title: 'Counting 11 to 20', difficulty: 'easy', duration: 10,
    explanation: 'After 10, we continue counting. 11, 12, 13... up to 20.',
    examples: ['11 - Eleven', '12 - Twelve', '13 - Thirteen', '14 - Fourteen', '15 - Fifteen', '16 - Sixteen', '17 - Seventeen', '18 - Eighteen', '19 - Nineteen', '20 - Twenty'],
    activities: ['Count 20 objects', 'Write numbers 11-20', 'Count forward from any number'],
    questions: [
      { id: 'm4q1', type: 'mcq', question: 'What comes after 15?', options: ['16', '14', '17'], answer: '16' },
      { id: 'm4q2', type: 'fill', question: '18, 19, ___', answer: '20' },
    ],
    prerequisites: ['m3'], parentGuide: ['Use objects like buttons or seeds', 'Count together']
  },
  {
    id: 'm5', subject: 'maths', unit: 'Numbers', topic: 'Numbers 21-50', title: 'Counting 21 to 50', difficulty: 'medium', duration: 10,
    explanation: 'Let us count higher! 21, 22, 23... up to 50.',
    examples: ['21 - Twenty-one', '25 - Twenty-five', '30 - Thirty', '40 - Forty', '50 - Fifty'],
    activities: ['Count to 50', 'Write numbers 21-50', 'Skip count by 2s to 50'],
    questions: [
      { id: 'm5q1', type: 'mcq', question: 'What comes after 29?', options: ['30', '28', '31'], answer: '30' },
      { id: 'm5q2', type: 'fill', question: '38, 39, ___', answer: '40' },
    ],
    prerequisites: ['m4'], parentGuide: ['Practice counting daily', 'Count while climbing stairs']
  },
  {
    id: 'm6', subject: 'maths', unit: 'Numbers', topic: 'Numbers 51-99', title: 'Counting 51 to 99', difficulty: 'medium', duration: 10,
    explanation: 'Let us count even higher! 51, 52... up to 99.',
    examples: ['51 - Fifty-one', '60 - Sixty', '75 - Seventy-five', '90 - Ninety', '99 - Ninety-nine'],
    activities: ['Count to 99', 'Write numbers 51-99', 'Find numbers on pages'],
    questions: [
      { id: 'm6q1', type: 'mcq', question: 'What comes after 59?', options: ['60', '58', '61'], answer: '60' },
      { id: 'm6q2', type: 'fill', question: '88, 89, ___', answer: '90' },
    ],
    prerequisites: ['m5'], parentGuide: ['Use number chart', 'Point and count']
  },
  {
    id: 'm7', subject: 'maths', unit: 'Number Sense', topic: 'Before After Between', title: 'Before, After, Between', difficulty: 'medium', duration: 10,
    explanation: 'Before = comes earlier. After = comes later. Between = in the middle.',
    examples: ['Before 5 is 4', 'After 5 is 6', 'Between 4 and 6 is 5', 'Before 10 is 9', 'After 10 is 11'],
    activities: ['What comes before 8?', 'What comes after 15?', 'What is between 11 and 13?'],
    questions: [
      { id: 'm7q1', type: 'mcq', question: 'What comes before 7?', options: ['6', '8', '5'], answer: '6' },
      { id: 'm7q2', type: 'mcq', question: 'What comes after 12?', options: ['13', '11', '14'], answer: '13' },
      { id: 'm7q3', type: 'mcq', question: 'What is between 8 and 10?', options: ['9', '7', '11'], answer: '9' },
    ],
    prerequisites: ['m4'], parentGuide: ['Use number line', 'Point to numbers']
  },
  {
    id: 'm8', subject: 'maths', unit: 'Addition', topic: 'Addition Concept', title: 'What is Addition? (Adding Objects)', difficulty: 'easy', duration: 15,
    explanation: 'Addition means putting things together and counting how many we have in total. We use the + sign.',
    examples: ['🍎 🍎 + 🍎 = 3 apples', '⭐ ⭐ ⭐ + ⭐ ⭐ = 5 stars', '2 + 1 = 3', '3 + 2 = 5', '4 + 3 = 7'],
    activities: ['Take 3 pencils, add 2 more, count all', 'Use fingers to add', 'Draw objects and add'],
    questions: [
      { id: 'm8q1', type: 'mcq', question: '🍎🍎 + 🍎🍎🍎 = ?', options: ['5', '4', '3'], answer: '5' },
      { id: 'm8q2', type: 'fill', question: '2 + 3 = ___', answer: '5' },
      { id: 'm8q3', type: 'fill', question: '4 + 1 = ___', answer: '5' },
      { id: 'm8q4', type: 'fill', question: '3 + 3 = ___', answer: '6' },
    ],
    prerequisites: ['m3'], parentGuide: [
      'STEP 1: Take 3 pencils.',
      'STEP 2: Take 2 more pencils.',
      'STEP 3: Ask child to count ALL pencils together.',
      'STEP 4: Explain: 3 + 2 = 5',
      'STEP 5: Give 3 similar questions using objects.'
    ]
  },
  {
    id: 'm9', subject: 'maths', unit: 'Addition', topic: 'Addition within 10', title: 'Adding Numbers up to 10', difficulty: 'easy', duration: 15,
    explanation: 'Let us add numbers where the answer is 10 or less.',
    examples: ['1 + 1 = 2', '2 + 2 = 4', '3 + 4 = 7', '5 + 5 = 10', '6 + 3 = 9', '7 + 2 = 9'],
    activities: ['Use fingers to add', 'Draw circles and count', 'Number line addition'],
    questions: [
      { id: 'm9q1', type: 'fill', question: '3 + 4 = ___', answer: '7' },
      { id: 'm9q2', type: 'fill', question: '5 + 3 = ___', answer: '8' },
      { id: 'm9q3', type: 'fill', question: '6 + 4 = ___', answer: '10' },
      { id: 'm9q4', type: 'fill', question: '7 + 2 = ___', answer: '9' },
      { id: 'm9q5', type: 'fill', question: '4 + 4 = ___', answer: '8' },
    ],
    prerequisites: ['m8'], parentGuide: ['Use fingers', 'Start from bigger number and count up', 'For 5+3: start at 5, count 3 more: 6,7,8']
  },
  {
    id: 'm10', subject: 'maths', unit: 'Addition', topic: 'Addition within 20', title: 'Adding Numbers up to 20', difficulty: 'medium', duration: 15,
    explanation: 'Now let us add bigger numbers. The answer can be up to 20.',
    examples: ['8 + 5 = 13', '7 + 6 = 13', '9 + 9 = 18', '12 + 5 = 17', '15 + 4 = 19'],
    activities: ['Use number line', 'Draw objects', 'Count on fingers and toes!'],
    questions: [
      { id: 'm10q1', type: 'fill', question: '8 + 5 = ___', answer: '13' },
      { id: 'm10q2', type: 'fill', question: '9 + 6 = ___', answer: '15' },
      { id: 'm10q3', type: 'fill', question: '7 + 7 = ___', answer: '14' },
      { id: 'm10q4', type: 'fill', question: '12 + 6 = ___', answer: '18' },
      { id: 'm10q5', type: 'fill', question: '11 + 8 = ___', answer: '19' },
    ],
    prerequisites: ['m9'], parentGuide: ['Use number line', 'For 8+5: start at 8, jump 5 forward: 9,10,11,12,13']
  },
  {
    id: 'm11', subject: 'maths', unit: 'Addition', topic: 'Vertical Addition', title: 'Adding Vertically (Column Addition)', difficulty: 'medium', duration: 15,
    explanation: 'We can write addition one number below the other and add.',
    examples: ['  3\n+ 2\n---\n  5', '  7\n+ 6\n---\n 13', ' 12\n+ 5\n---\n 17'],
    activities: ['Write and solve vertical addition', 'Check with objects'],
    questions: [
      { id: 'm11q1', type: 'fill', question: '5 + 4 = ___', answer: '9' },
      { id: 'm11q2', type: 'fill', question: '8 + 7 = ___', answer: '15' },
      { id: 'm11q3', type: 'fill', question: '14 + 5 = ___', answer: '19' },
    ],
    prerequisites: ['m10'], parentGuide: ['Write numbers in columns', 'Add ones column first', 'Use objects to verify']
  },
  {
    id: 'm12', subject: 'maths', unit: 'Addition', topic: 'Missing Number Addition', title: 'Find the Missing Number', difficulty: 'medium', duration: 15,
    explanation: 'Sometimes a number is missing. We need to find it!',
    examples: ['3 + ? = 5 → ? = 2', '? + 4 = 7 → ? = 3', '6 + ? = 10 → ? = 4'],
    activities: ['Find the missing number', 'Use objects to figure out'],
    questions: [
      { id: 'm12q1', type: 'fill', question: '3 + ? = 7, ? = ___', answer: '4' },
      { id: 'm12q2', type: 'fill', question: '? + 5 = 9, ? = ___', answer: '4' },
      { id: 'm12q3', type: 'fill', question: '6 + ? = 10, ? = ___', answer: '4' },
      { id: 'm12q4', type: 'fill', question: '? + 8 = 15, ? = ___', answer: '7' },
    ],
    prerequisites: ['m10'], parentGuide: ['Think: what do I add to get the answer?', 'Use objects: put some, count how many more needed']
  },
  {
    id: 'm13', subject: 'maths', unit: 'Addition', topic: 'Word Problems Addition', title: 'Addition Word Problems', difficulty: 'medium', duration: 15,
    explanation: 'Let us solve real-life problems using addition.',
    examples: ['Ram has 3 apples. He gets 2 more. How many apples does he have? → 3 + 2 = 5', 'There are 5 birds on a tree. 3 more come. How many birds now? → 5 + 3 = 8'],
    activities: ['Solve word problems', 'Draw pictures to solve', 'Make your own word problems'],
    questions: [
      { id: 'm13q1', type: 'mcq', question: 'Sita has 4 pencils. She gets 3 more. How many pencils?', options: ['7', '6', '8'], answer: '7' },
      { id: 'm13q2', type: 'mcq', question: 'There are 6 cats. 4 more come. How many cats?', options: ['10', '9', '11'], answer: '10' },
      { id: 'm13q3', type: 'fill', question: 'I have 8 candies. Mummy gives 5 more. I have ___ candies.', answer: '13' },
    ],
    prerequisites: ['m10'], parentGuide: ['Read the problem slowly', 'Ask: What do we know? What do we need to find?', 'Draw pictures']
  },
  {
    id: 'm14', subject: 'maths', unit: 'Subtraction', topic: 'Subtraction Concept', title: 'What is Subtraction? (Taking Away)', difficulty: 'easy', duration: 15,
    explanation: 'Subtraction means taking away. We use the - sign. When we take away, we get less.',
    examples: ['🍎🍎🍎🍎🍎 take away 🍎🍎 = 🍎🍎🍎 (3 left)', '5 - 2 = 3', '4 - 1 = 3', '6 - 3 = 3', '7 - 4 = 3'],
    activities: ['Take 5 pencils, remove 2, count remaining', 'Use fingers: show 5, fold down 2', 'Draw 5 circles, cross out 2'],
    questions: [
      { id: 'm14q1', type: 'mcq', question: '🍎🍎🍎🍎 take away 🍎🍎 = ?', options: ['2', '3', '1'], answer: '2' },
      { id: 'm14q2', type: 'fill', question: '5 - 2 = ___', answer: '3' },
      { id: 'm14q3', type: 'fill', question: '4 - 1 = ___', answer: '3' },
      { id: 'm14q4', type: 'fill', question: '7 - 3 = ___', answer: '4' },
    ],
    prerequisites: ['m8'], parentGuide: [
      'STEP 1: Take 5 pencils.',
      'STEP 2: Remove 2 pencils.',
      'STEP 3: Count how many are LEFT.',
      'STEP 4: Explain: 5 - 2 = 3',
      'STEP 5: Practice with different objects.'
    ]
  },
  {
    id: 'm15', subject: 'maths', unit: 'Subtraction', topic: 'Subtraction within 10', title: 'Subtracting Numbers up to 10', difficulty: 'easy', duration: 15,
    explanation: 'Let us subtract small numbers.',
    examples: ['9 - 4 = 5', '8 - 3 = 5', '7 - 5 = 2', '10 - 6 = 4', '6 - 6 = 0'],
    activities: ['Use fingers', 'Draw and cross out', 'Number line subtraction'],
    questions: [
      { id: 'm15q1', type: 'fill', question: '9 - 4 = ___', answer: '5' },
      { id: 'm15q2', type: 'fill', question: '8 - 5 = ___', answer: '3' },
      { id: 'm15q3', type: 'fill', question: '10 - 7 = ___', answer: '3' },
      { id: 'm15q4', type: 'fill', question: '6 - 2 = ___', answer: '4' },
      { id: 'm15q5', type: 'fill', question: '7 - 7 = ___', answer: '0' },
    ],
    prerequisites: ['m14'], parentGuide: ['Use fingers', 'Start from the bigger number and count back']
  },
  {
    id: 'm16', subject: 'maths', unit: 'Subtraction', topic: 'Subtraction within 20', title: 'Subtracting Numbers up to 20', difficulty: 'medium', duration: 15,
    explanation: 'Now let us subtract bigger numbers.',
    examples: ['15 - 7 = 8', '18 - 9 = 9', '13 - 6 = 7', '17 - 8 = 9', '20 - 10 = 10'],
    activities: ['Use number line', 'Count backwards'],
    questions: [
      { id: 'm16q1', type: 'fill', question: '15 - 7 = ___', answer: '8' },
      { id: 'm16q2', type: 'fill', question: '18 - 9 = ___', answer: '9' },
      { id: 'm16q3', type: 'fill', question: '14 - 6 = ___', answer: '8' },
      { id: 'm16q4', type: 'fill', question: '16 - 8 = ___', answer: '8' },
    ],
    prerequisites: ['m15'], parentGuide: ['Use number line: start at 15, jump back 7']
  },
  {
    id: 'm17', subject: 'maths', unit: 'Subtraction', topic: 'Word Problems Subtraction', title: 'Subtraction Word Problems', difficulty: 'medium', duration: 15,
    explanation: 'Let us solve real-life problems using subtraction.',
    examples: ['I have 8 chocolates. I eat 3. How many are left? → 8 - 3 = 5', 'There were 10 birds. 4 fly away. How many remain? → 10 - 4 = 6'],
    activities: ['Solve word problems', 'Draw and solve'],
    questions: [
      { id: 'm17q1', type: 'mcq', question: 'Ram had 9 toffees. He gave 4 to his friend. How many left?', options: ['5', '4', '6'], answer: '5' },
      { id: 'm17q2', type: 'mcq', question: 'There are 12 apples. 5 are eaten. How many left?', options: ['7', '8', '6'], answer: '7' },
      { id: 'm17q3', type: 'fill', question: 'I had ₹15. I spent ₹8. I have ₹___ left.', answer: '7' },
    ],
    prerequisites: ['m16'], parentGuide: ['Read problem slowly', 'Ask: How many did we start with? How many went away?']
  },
  {
    id: 'm18', subject: 'maths', unit: 'Tables', topic: 'Table of 2', title: 'Table of 2 (Repeated Addition)', difficulty: 'medium', duration: 15,
    explanation: 'Table of 2 means adding 2 again and again. 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.',
    examples: ['2 + 2 = 4 (2 × 2 = 4)', '2 + 2 + 2 = 6 (2 × 3 = 6)', '2 + 2 + 2 + 2 = 8 (2 × 4 = 8)', '3 groups of 2 = 6'],
    activities: ['Count by 2s', 'Draw pairs of objects', 'Clap in twos'],
    questions: [
      { id: 'm18q1', type: 'fill', question: '2 + 2 + 2 = ___', answer: '6' },
      { id: 'm18q2', type: 'fill', question: '2 × 5 = ___', answer: '10' },
      { id: 'm18q3', type: 'mcq', question: '4 groups of 2 = ?', options: ['8', '6', '10'], answer: '8' },
    ],
    prerequisites: ['m9'], parentGuide: ['Show with objects: 2 groups of 2, 3 groups of 2', 'Count by 2s: 2,4,6,8,10...']
  },
  {
    id: 'm19', subject: 'maths', unit: 'Tables', topic: 'Table of 5', title: 'Table of 5', difficulty: 'medium', duration: 15,
    explanation: 'Table of 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.',
    examples: ['5 × 1 = 5', '5 × 2 = 10', '5 × 3 = 15', '5 × 4 = 20', '5 × 5 = 25'],
    activities: ['Count by 5s using fingers', 'Count coins of ₹5', 'Skip count'],
    questions: [
      { id: 'm19q1', type: 'fill', question: '5 × 3 = ___', answer: '15' },
      { id: 'm19q2', type: 'fill', question: '5 × 4 = ___', answer: '20' },
      { id: 'm19q3', type: 'fill', question: '5 × 6 = ___', answer: '30' },
    ],
    prerequisites: ['m18'], parentGuide: ['Use fingers (5 on each hand)', 'Count ₹5 coins']
  },
  {
    id: 'm20', subject: 'maths', unit: 'Tables', topic: 'Table of 10', title: 'Table of 10', difficulty: 'medium', duration: 15,
    explanation: 'Table of 10: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.',
    examples: ['10 × 1 = 10', '10 × 2 = 20', '10 × 3 = 30', '10 × 5 = 50', '10 × 10 = 100'],
    activities: ['Count by 10s', 'Count ₹10 notes', 'Bundle of 10 sticks'],
    questions: [
      { id: 'm20q1', type: 'fill', question: '10 × 3 = ___', answer: '30' },
      { id: 'm20q2', type: 'fill', question: '10 × 7 = ___', answer: '70' },
      { id: 'm20q3', type: 'fill', question: '10 × 10 = ___', answer: '100' },
    ],
    prerequisites: ['m19'], parentGuide: ['Easy pattern: just add 0', '10 × 3 = 30, 10 × 5 = 50']
  },
  {
    id: 'm21', subject: 'maths', unit: 'Shapes', topic: 'Basic Shapes', title: 'Circle, Triangle, Square, Rectangle', difficulty: 'easy', duration: 10,
    explanation: 'Shapes are all around us! Let us learn 4 basic shapes.',
    examples: ['Circle ⭕ - no corners, round like a ball', 'Triangle 🔺 - 3 sides, 3 corners', 'Square 🟧 - 4 equal sides, 4 corners', 'Rectangle ▬ - 4 sides (2 long, 2 short), 4 corners'],
    activities: ['Find shapes around the house', 'Draw each shape', 'Trace shapes'],
    questions: [
      { id: 'm21q1', type: 'mcq', question: 'How many sides does a triangle have?', options: ['3', '4', '2'], answer: '3' },
      { id: 'm21q2', type: 'mcq', question: 'Which shape has no corners?', options: ['Circle', 'Square', 'Triangle'], answer: 'Circle' },
      { id: 'm21q3', type: 'mcq', question: 'A square has how many equal sides?', options: ['4', '3', '2'], answer: '4' },
    ],
    prerequisites: [], parentGuide: ['Find real objects: clock = circle, book = rectangle', 'Draw together']
  },
  {
    id: 'm22', subject: 'maths', unit: 'Patterns', topic: 'Simple Patterns', title: 'Finding and Making Patterns', difficulty: 'easy', duration: 10,
    explanation: 'A pattern repeats in a rule. Let us find the rule and complete the pattern!',
    examples: ['🔴🔵🔴🔵🔴? → 🔵 (red-blue repeating)', '⭐🌙⭐🌙⭐? → 🌙', '1, 2, 3, 4, ? → 5', 'A, B, A, B, ? → A'],
    activities: ['Complete the pattern', 'Make your own pattern with objects', 'Clap patterns'],
    questions: [
      { id: 'm22q1', type: 'mcq', question: '🔴🔵🔴🔵🔴? What comes next?', options: ['🔵', '🔴', '🟢'], answer: '🔵' },
      { id: 'm22q2', type: 'mcq', question: '2, 4, 6, 8, ? →', options: ['10', '9', '7'], answer: '10' },
      { id: 'm22q3', type: 'mcq', question: 'A, B, C, A, B, ? →', options: ['C', 'A', 'B'], answer: 'C' },
    ],
    prerequisites: ['m3'], parentGuide: ['Use coloured objects or toys', 'Make patterns with food items']
  },
  {
    id: 'm23', subject: 'maths', unit: 'Measurement', topic: 'Non-standard Measurement', title: 'Measuring with Hands and Feet', difficulty: 'easy', duration: 10,
    explanation: 'We can measure things without a ruler! We use our hand span, footsteps, or blocks.',
    examples: ['Table is 5 hand-spans long', 'Room is 10 footsteps long', 'Book is 3 pencils long'],
    activities: ['Measure table with hand span', 'Measure room with footsteps', 'Compare: which is longer?'],
    questions: [
      { id: 'm23q1', type: 'mcq', question: 'Which is longer - pencil or eraser?', options: ['Pencil', 'Eraser', 'Same'], answer: 'Pencil' },
      { id: 'm23q2', type: 'mcq', question: 'We can measure with?', options: ['Hand span', 'Feelings', 'Words'], answer: 'Hand span' },
    ],
    prerequisites: ['m2'], parentGuide: ['Use real objects', 'Measure together', 'Whose hand span is bigger?']
  },
  {
    id: 'm24', subject: 'maths', unit: 'Time', topic: 'Time of Day', title: 'Morning, Afternoon, Evening, Night', difficulty: 'easy', duration: 10,
    explanation: 'A day has different parts: Morning, Afternoon, Evening, Night.',
    examples: ['Morning 🌅 - Wake up, breakfast, go to school', 'Afternoon ☀️ - Lunch, play time', 'Evening 🌆 - Come home, snacks', 'Night 🌙 - Dinner, sleep'],
    activities: ['What do you do in the morning?', 'Sequence daily activities', 'Draw clock showing different times'],
    questions: [
      { id: 'm24q1', type: 'mcq', question: 'When do we eat breakfast?', options: ['Morning', 'Night', 'Evening'], answer: 'Morning' },
      { id: 'm24q2', type: 'mcq', question: 'When do we sleep?', options: ['Night', 'Morning', 'Afternoon'], answer: 'Night' },
    ],
    prerequisites: [], parentGuide: ['Talk about daily routine', 'What time is it now?']
  },
  {
    id: 'm25', subject: 'maths', unit: 'Time', topic: 'Days of Week', title: 'Days of the Week', difficulty: 'easy', duration: 10,
    explanation: 'A week has 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.',
    examples: ['Monday - School day', 'Tuesday - School day', 'Wednesday - School day', 'Thursday - School day', 'Friday - School day', 'Saturday - Half day/Fun', 'Sunday - Holiday!'],
    activities: ['Sing days song', 'What day is today?', 'What day comes after Monday?'],
    questions: [
      { id: 'm25q1', type: 'mcq', question: 'How many days in a week?', options: ['7', '5', '6'], answer: '7' },
      { id: 'm25q2', type: 'mcq', question: 'What comes after Monday?', options: ['Tuesday', 'Wednesday', 'Sunday'], answer: 'Tuesday' },
      { id: 'm25q3', type: 'mcq', question: 'Which day is a holiday?', options: ['Sunday', 'Monday', 'Friday'], answer: 'Sunday' },
    ],
    prerequisites: [], parentGuide: ['Sing the days song together', 'Use a calendar']
  },
  {
    id: 'm26', subject: 'maths', unit: 'Money', topic: 'Indian Currency', title: 'Recognizing Money (₹)', difficulty: 'easy', duration: 10,
    explanation: 'We use money to buy things. India uses Rupees (₹).',
    examples: ['₹1 coin', '₹2 coin', '₹5 coin', '₹10 note', '₹20 note', '₹50 note', '₹100 note'],
    activities: ['Identify coins and notes', 'Simple buying activity', 'Count money'],
    questions: [
      { id: 'm26q1', type: 'mcq', question: 'Which is bigger - ₹10 or ₹5?', options: ['₹10', '₹5', 'Same'], answer: '₹10' },
      { id: 'm26q2', type: 'mcq', question: 'Apple costs ₹5. You have ₹10. Can you buy it?', options: ['Yes', 'No', 'Not sure'], answer: 'Yes' },
    ],
    prerequisites: ['m5'], parentGuide: ['Show real coins and notes', 'Practice buying at home']
  },
  {
    id: 'm27', subject: 'maths', unit: 'Place Value', topic: 'Tens and Ones', title: 'Tens and Ones', difficulty: 'medium', duration: 15,
    explanation: 'Every number has ones and tens. 25 = 2 Tens and 5 Ones.',
    examples: ['25 = 2 Tens + 5 Ones', '37 = 3 Tens + 7 Ones', '46 = 4 Tens + 6 Ones', '10 = 1 Ten + 0 Ones'],
    activities: ['Break numbers into tens and ones', 'Use bundles of 10 sticks'],
    questions: [
      { id: 'm27q1', type: 'mcq', question: '34 = ___ Tens and ___ Ones', options: ['3 Tens, 4 Ones', '4 Tens, 3 Ones', '3 Tens, 3 Ones'], answer: '3 Tens, 4 Ones' },
      { id: 'm27q2', type: 'mcq', question: '56 has how many tens?', options: ['5', '6', '56'], answer: '5' },
    ],
    prerequisites: ['m6'], parentGuide: ['Use bundles of 10', 'Show 25 as 2 bundles + 5 sticks']
  },
  {
    id: 'm28', subject: 'maths', unit: 'Number Sense', topic: 'Greater Than Less Than', title: 'Greater Than (>), Less Than (<), Equal (=)', difficulty: 'medium', duration: 10,
    explanation: 'We compare numbers. Greater Than (>) means bigger. Less Than (<) means smaller. Equal (=) means same.',
    examples: ['5 > 3 (5 is greater than 3)', '2 < 7 (2 is less than 7)', '4 = 4 (4 is equal to 4)', '10 > 8', '6 < 9'],
    activities: ['Compare two numbers', 'Use > or < sign', 'Which is bigger?'],
    questions: [
      { id: 'm28q1', type: 'mcq', question: '8 ___ 5 (> or <)', options: ['>', '<', '='], answer: '>' },
      { id: 'm28q2', type: 'mcq', question: '3 ___ 7 (> or <)', options: ['<', '>', '='], answer: '<' },
      { id: 'm28q3', type: 'mcq', question: '6 ___ 6 (> or < or =)', options: ['=', '>', '<'], answer: '=' },
    ],
    prerequisites: ['m5'], parentGuide: ['Use the crocodile mouth trick - mouth opens to bigger number']
  },
  {
    id: 'm29', subject: 'maths', unit: 'Addition', topic: 'Mixed Addition Practice', title: 'Addition Mixed Practice', difficulty: 'medium', duration: 20,
    explanation: 'Let us practice all types of addition!',
    examples: ['Simple: 3 + 4 = 7', 'Bigger: 15 + 8 = 23', 'Missing: ? + 6 = 10', 'Word: Ram has 5, gets 3 more = 8'],
    activities: ['Solve 10 addition problems', 'Make your own word problem', 'Speed practice'],
    questions: [
      { id: 'm29q1', type: 'fill', question: '7 + 8 = ___', answer: '15' },
      { id: 'm29q2', type: 'fill', question: '12 + 9 = ___', answer: '21' },
      { id: 'm29q3', type: 'fill', question: '? + 5 = 12, ? = ___', answer: '7' },
      { id: 'm29q4', type: 'mcq', question: 'Sita has 8 flowers. She gets 6 more. Total?', options: ['14', '13', '15'], answer: '14' },
    ],
    prerequisites: ['m13'], parentGuide: ['Mix all types', 'Time yourself - make it fun!']
  },
  {
    id: 'm30', subject: 'maths', unit: 'Subtraction', topic: 'Mixed Subtraction Practice', title: 'Subtraction Mixed Practice', difficulty: 'medium', duration: 20,
    explanation: 'Let us practice all types of subtraction!',
    examples: ['Simple: 9 - 4 = 5', 'Bigger: 18 - 7 = 11', 'Missing: 10 - ? = 6', 'Word: 10 birds, 3 fly away = 7'],
    activities: ['Solve 10 subtraction problems', 'Make your own word problem'],
    questions: [
      { id: 'm30q1', type: 'fill', question: '15 - 8 = ___', answer: '7' },
      { id: 'm30q2', type: 'fill', question: '20 - 9 = ___', answer: '11' },
      { id: 'm30q3', type: 'fill', question: '12 - ? = 5, ? = ___', answer: '7' },
      { id: 'm30q4', type: 'mcq', question: '15 chocolates, eat 7. Left?', options: ['8', '7', '9'], answer: '8' },
    ],
    prerequisites: ['m17'], parentGuide: ['Mix all types', 'Use objects to verify']
  },
  // Additional 5 lessons
  {
    id: 'm31', subject: 'maths', unit: 'Numbers', topic: 'Number Names', title: 'Number Names 1-20', difficulty: 'easy', duration: 10,
    explanation: 'Every number has a name. Let us learn number names.',
    examples: ['1 = One', '5 = Five', '10 = Ten', '15 = Fifteen', '20 = Twenty'],
    activities: ['Say number names', 'Write number names', 'Match number to name'],
    questions: [
      { id: 'm31q1', type: 'mcq', question: 'What is the name of 7?', options: ['Seven', 'Six', 'Eight'], answer: 'Seven' },
      { id: 'm31q2', type: 'mcq', question: 'Fifteen is written as?', options: ['15', '51', '50'], answer: '15' },
    ],
    prerequisites: ['m4'], parentGuide: ['Practice saying and writing number names']
  },
  {
    id: 'm32', subject: 'maths', unit: 'Numbers', topic: 'Ordinal Numbers', title: 'First, Second, Third... (Ordinal Numbers)', difficulty: 'medium', duration: 10,
    explanation: 'Ordinal numbers tell us the position: 1st, 2nd, 3rd, 4th, 5th...',
    examples: ['1st = First', '2nd = Second', '3rd = Third', '4th = Fourth', '5th = Fifth', '10th = Tenth'],
    activities: ['Who is first in line?', 'What floor do you live on?', 'Race: who came 1st, 2nd, 3rd?'],
    questions: [
      { id: 'm32q1', type: 'mcq', question: 'What is the ordinal of 1?', options: ['First', 'One', 'Once'], answer: 'First' },
      { id: 'm32q2', type: 'mcq', question: 'What comes after 2nd?', options: ['3rd', '4th', '1st'], answer: '3rd' },
    ],
    prerequisites: ['m4'], parentGuide: ['Use real situations: who is first in line?']
  },
  {
    id: 'm33', subject: 'maths', unit: 'Tables', topic: 'Table of 3', title: 'Table of 3', difficulty: 'medium', duration: 15,
    explanation: 'Table of 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.',
    examples: ['3 × 1 = 3', '3 × 2 = 6', '3 × 3 = 9', '3 × 4 = 12', '3 × 5 = 15'],
    activities: ['Count by 3s', 'Groups of 3 objects'],
    questions: [
      { id: 'm33q1', type: 'fill', question: '3 × 4 = ___', answer: '12' },
      { id: 'm33q2', type: 'fill', question: '3 × 6 = ___', answer: '18' },
    ],
    prerequisites: ['m18'], parentGuide: ['3 groups of 3 = 9', 'Use objects in groups of 3']
  },
  {
    id: 'm34', subject: 'maths', unit: 'Tables', topic: 'Table of 4', title: 'Table of 4', difficulty: 'medium', duration: 15,
    explanation: 'Table of 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.',
    examples: ['4 × 1 = 4', '4 × 2 = 8', '4 × 3 = 12', '4 × 5 = 20'],
    activities: ['Count by 4s', 'Draw arrays'],
    questions: [
      { id: 'm34q1', type: 'fill', question: '4 × 3 = ___', answer: '12' },
      { id: 'm34q2', type: 'fill', question: '4 × 5 = ___', answer: '20' },
    ],
    prerequisites: ['m33'], parentGuide: ['4 is double of 2', '4 × 3 = 3 + 3 + 3 + 3']
  },
  {
    id: 'm35', subject: 'maths', unit: 'Mixed', topic: 'Complete Maths Review', title: 'Maths - Complete Review', difficulty: 'hard', duration: 25,
    explanation: 'Let us review everything we have learned in Maths!',
    examples: ['Numbers 1-99', 'Addition', 'Subtraction', 'Tables', 'Shapes', 'Patterns', 'Time', 'Money'],
    activities: ['Quick quiz all topics', 'Solve mixed problems', 'Word problems'],
    questions: [
      { id: 'm35q1', type: 'fill', question: '9 + 7 = ___', answer: '16' },
      { id: 'm35q2', type: 'fill', question: '15 - 8 = ___', answer: '7' },
      { id: 'm35q3', type: 'fill', question: '5 × 4 = ___', answer: '20' },
      { id: 'm35q4', type: 'mcq', question: 'How many sides does a square have?', options: ['4', '3', '5'], answer: '4' },
      { id: 'm35q5', type: 'mcq', question: 'Which is greater: 45 or 54?', options: ['54', '45', 'Equal'], answer: '54' },
    ],
    prerequisites: ['m29', 'm30'], parentGuide: ['Test all areas', 'Focus on weak spots']
  },
];

export const allMathsLessons = mathsLessons;
