import { Lesson } from '../types';

export const evsLessons: Lesson[] = [
  {
    id: 'ev1', subject: 'evs', unit: 'Human Body', topic: 'My Body Parts', title: 'Parts of My Body', difficulty: 'easy', duration: 10,
    explanation: 'Our body has many parts. Each part has a special job!',
    examples: ['Head 🗣️ - thinks', 'Eyes 👀 - see', 'Ears 👂 - hear', 'Nose 👃 - smell', 'Mouth 👄 - eat and speak', 'Hands ✋ - hold things', 'Legs 🦵 - walk and run', 'Feet 🦶 - stand'],
    activities: ['Touch and name each body part', 'Draw a person and label parts', 'Sing "Head, shoulders, knees and toes"'],
    questions: [
      { id: 'ev1q1', type: 'mcq', question: 'We see with our ___?', options: ['Eyes', 'Ears', 'Nose'], answer: 'Eyes' },
      { id: 'ev1q2', type: 'mcq', question: 'We hear with our ___?', options: ['Ears', 'Eyes', 'Mouth'], answer: 'Ears' },
      { id: 'ev1q3', type: 'mcq', question: 'How many eyes do we have?', options: ['2', '1', '3'], answer: '2' },
    ],
    prerequisites: [], parentGuide: ['Touch each part and name it', 'Ask: What does this part do?']
  },
  {
    id: 'ev2', subject: 'evs', unit: 'Human Body', topic: 'Five Sense Organs', title: 'My Five Senses', difficulty: 'easy', duration: 10,
    explanation: 'We have 5 sense organs that help us know about the world.',
    examples: ['Eyes 👀 → Seeing (sight)', 'Ears 👂 → Hearing (sound)', 'Nose 👃 → Smelling (smell)', 'Tongue 👅 → Tasting (taste)', 'Skin ✋ → Feeling (touch)'],
    activities: ['Close eyes - what do you hear?', 'Smell a flower', 'Taste something sweet and sour', 'Touch something soft and rough'],
    questions: [
      { id: 'ev2q1', type: 'mcq', question: 'Which sense organ helps us smell?', options: ['Nose', 'Eyes', 'Ears'], answer: 'Nose' },
      { id: 'ev2q2', type: 'mcq', question: 'Which sense organ helps us taste?', options: ['Tongue', 'Nose', 'Skin'], answer: 'Tongue' },
      { id: 'ev2q3', type: 'mcq', question: 'How many sense organs do we have?', options: ['5', '3', '4'], answer: '5' },
    ],
    prerequisites: ['ev1'], parentGuide: ['Do activities: smell, taste, touch, listen, look', 'Make it fun!']
  },
  {
    id: 'ev3', subject: 'evs', unit: 'Health', topic: 'Good Habits', title: 'Healthy Habits Every Day', difficulty: 'easy', duration: 10,
    explanation: 'Good habits keep us healthy and happy!',
    examples: ['🚿 Bath daily', '🪥 Brush teeth twice', '🧼 Wash hands before eating', '👕 Wear clean clothes', '🥗 Eat healthy food', '💧 Drink water', '😴 Sleep on time', '🏃 Exercise daily'],
    activities: ['Make a daily habit chart', 'Tick what you did today', 'Draw healthy habits'],
    questions: [
      { id: 'ev3q1', type: 'mcq', question: 'How many times should we brush teeth?', options: ['Twice', 'Once', 'Three times'], answer: 'Twice' },
      { id: 'ev3q2', type: 'mcq', question: 'When should we wash hands?', options: ['Before eating', 'After sleeping', 'Never'], answer: 'Before eating' },
    ],
    prerequisites: [], parentGuide: ['Make a daily checklist', 'Praise good habits']
  },
  {
    id: 'ev4', subject: 'evs', unit: 'Plants', topic: 'Parts of a Plant', title: 'Parts of a Plant', difficulty: 'easy', duration: 10,
    explanation: 'A plant has different parts. Each part has a job.',
    examples: ['Roots 🌱 - drink water from soil (underground)', 'Stem 🌿 - holds the plant up', 'Leaves 🍃 - make food from sunlight', 'Flowers 🌸 - beautiful, make fruits', 'Fruits 🍎 - have seeds inside', 'Seeds 🫘 - grow into new plants'],
    activities: ['Look at a plant at home', 'Name each part', 'Draw a plant and label parts'],
    questions: [
      { id: 'ev4q1', type: 'mcq', question: 'Which part of the plant is underground?', options: ['Roots', 'Leaves', 'Flowers'], answer: 'Roots' },
      { id: 'ev4q2', type: 'mcq', question: 'What do leaves make?', options: ['Food', 'Water', 'Seeds'], answer: 'Food' },
      { id: 'ev4q3', type: 'mcq', question: 'What is inside a fruit?', options: ['Seeds', 'Roots', 'Leaves'], answer: 'Seeds' },
    ],
    prerequisites: [], parentGuide: ['Go to garden/park', 'Show real plant parts', 'Pull a small weed and show roots']
  },
  {
    id: 'ev5', subject: 'evs', unit: 'Plants', topic: 'What Plants Need', title: 'What Do Plants Need to Grow?', difficulty: 'easy', duration: 10,
    explanation: 'Plants need 4 things to grow: Water, Air, Sunlight, and Soil.',
    examples: ['💧 Water - plants drink water', '💨 Air - plants breathe air', '☀️ Sunlight - plants need sun', '🌍 Soil - plants grow in soil'],
    activities: ['Water a plant at home', 'Observe a plant in sun vs shade', 'Draw what a plant needs'],
    questions: [
      { id: 'ev5q1', type: 'mcq', question: 'What do plants need from the sky?', options: ['Sunlight', 'Toys', 'Books'], answer: 'Sunlight' },
      { id: 'ev5q2', type: 'mcq', question: 'Where do plants grow?', options: ['Soil', 'Water only', 'Air only'], answer: 'Soil' },
    ],
    prerequisites: ['ev4'], parentGuide: ['Show a plant', 'Ask: What will happen without water?']
  },
  {
    id: 'ev6', subject: 'evs', unit: 'Animals', topic: 'Domestic Animals', title: 'Animals We Live With', difficulty: 'easy', duration: 10,
    explanation: 'Domestic animals live with us. They are friendly and useful.',
    examples: ['Dog 🐕 - guards house', 'Cat 🐈 - catches mice', 'Cow 🐄 - gives milk', 'Goat 🐐 - gives milk', 'Horse 🐴 - we ride it', 'Hen 🐔 - gives eggs'],
    activities: ['Make animal sounds', 'Which animal gives milk?', 'Draw your favourite domestic animal'],
    questions: [
      { id: 'ev6q1', type: 'mcq', question: 'Which animal gives us eggs?', options: ['Hen', 'Cow', 'Dog'], answer: 'Hen' },
      { id: 'ev6q2', type: 'mcq', question: 'Which animal guards our house?', options: ['Dog', 'Cat', 'Cow'], answer: 'Dog' },
    ],
    prerequisites: [], parentGuide: ['Visit a farm if possible', 'Show pictures/videos']
  },
  {
    id: 'ev7', subject: 'evs', unit: 'Animals', topic: 'Wild Animals', title: 'Animals in the Wild', difficulty: 'easy', duration: 10,
    explanation: 'Wild animals live in forests and jungles.',
    examples: ['Lion 🦁 - king of jungle', 'Tiger 🐯 - has stripes', 'Elephant 🐘 - biggest land animal', 'Monkey 🐒 - lives on trees', 'Bear 🐻 - loves honey', 'Deer 🦌 - very fast'],
    activities: ['Act like wild animals', 'Where do they live?', 'Baby animals matching'],
    questions: [
      { id: 'ev7q1', type: 'mcq', question: 'Baby dog is called?', options: ['Puppy', 'Kitten', 'Calf'], answer: 'Puppy' },
      { id: 'ev7q2', type: 'mcq', question: 'Baby cat is called?', options: ['Kitten', 'Puppy', 'Cub'], answer: 'Kitten' },
      { id: 'ev7q3', type: 'mcq', question: 'Baby cow is called?', options: ['Calf', 'Puppy', 'Cub'], answer: 'Calf' },
    ],
    prerequisites: ['ev6'], parentGuide: ['Watch animal documentaries', 'Visit zoo']
  },
  {
    id: 'ev8', subject: 'evs', unit: 'Air & Water', topic: 'About Air', title: 'All About Air', difficulty: 'easy', duration: 10,
    explanation: 'Air is all around us. We cannot see it but we can feel it. We need air to breathe.',
    examples: ['Wind 🌬️ is moving air', 'We breathe air', 'Balloons fill with air', 'Fans move air'],
    activities: ['Feel air from fan', 'Blow a balloon', 'Wave paper - feel air'],
    questions: [
      { id: 'ev8q1', type: 'mcq', question: 'Can we see air?', options: ['No', 'Yes', 'Sometimes'], answer: 'No' },
      { id: 'ev8q2', type: 'mcq', question: 'What do we need to breathe?', options: ['Air', 'Water', 'Food'], answer: 'Air' },
    ],
    prerequisites: [], parentGuide: ['Blow on child\'s hand', 'Feel wind outside']
  },
  {
    id: 'ev9', subject: 'evs', unit: 'Air & Water', topic: 'About Water', title: 'All About Water', difficulty: 'easy', duration: 10,
    explanation: 'Water is very important. We need water to drink, bathe, and cook.',
    examples: ['🌧️ Rain - water from sky', '🌊 River - flowing water', '🚰 Tap water - we use at home', '💧 We should save water'],
    activities: ['Save water - turn off tap', 'Where do we see water?', 'Draw the water cycle (simple)'],
    questions: [
      { id: 'ev9q1', type: 'mcq', question: 'Should we waste water?', options: ['No', 'Yes', 'Sometimes'], answer: 'No' },
      { id: 'ev9q2', type: 'mcq', question: 'Water comes from?', options: ['Rain, rivers, taps', 'Only taps', 'Only rain'], answer: 'Rain, rivers, taps' },
    ],
    prerequisites: ['ev8'], parentGuide: ['Talk about saving water', 'Show water sources']
  },
  {
    id: 'ev10', subject: 'evs', unit: 'Weather', topic: 'Weather Types', title: 'Sunny, Rainy, Windy, Cloudy', difficulty: 'easy', duration: 10,
    explanation: 'Weather changes every day. Let us learn about different types.',
    examples: ['☀️ Sunny - hot, bright sun', '🌧️ Rainy - water falls from clouds', '🌬️ Windy - air blows fast', '☁️ Cloudy - clouds in sky', '❄️ Cold - winter, we wear sweaters'],
    activities: ['Look outside - what weather today?', 'Draw different weather', 'What do we wear in each weather?'],
    questions: [
      { id: 'ev10q1', type: 'mcq', question: 'In rainy weather we use?', options: ['Umbrella', 'Sunglasses', 'Sweater'], answer: 'Umbrella' },
      { id: 'ev10q2', type: 'mcq', question: 'In winter we wear?', options: ['Sweater', 'Swimsuit', 'Shorts'], answer: 'Sweater' },
    ],
    prerequisites: ['ev8', 'ev9'], parentGuide: ['Look outside daily', 'Ask: What weather is it?']
  },
  // Additional lessons to reach 25
  {
    id: 'ev11', subject: 'evs', unit: 'Food', topic: 'Healthy Food', title: 'Healthy vs Unhealthy Food', difficulty: 'easy', duration: 10,
    explanation: 'Healthy food makes us strong. Unhealthy food can make us sick.',
    examples: ['✅ Healthy: Fruits, vegetables, milk, dal, roti', '❌ Unhealthy: Too much candy, chips, soda'],
    activities: ['Sort food into healthy/unhealthy', 'Draw a healthy meal', 'Name 5 healthy foods'],
    questions: [
      { id: 'ev11q1', type: 'mcq', question: 'Which is healthy?', options: ['Apple', 'Candy', 'Chips'], answer: 'Apple' },
      { id: 'ev11q2', type: 'mcq', question: 'Milk is good for?', options: ['Bones and teeth', 'Hair only', 'Nothing'], answer: 'Bones and teeth' },
    ],
    prerequisites: [], parentGuide: ['Show real food items', 'Let child help choose healthy snacks']
  },
  {
    id: 'ev12', subject: 'evs', unit: 'My School', topic: 'My School', title: 'About My School', difficulty: 'easy', duration: 10,
    explanation: 'School is where we learn. Our school has classrooms, playground, library, and teachers.',
    examples: ['Classroom - where we study', 'Playground - where we play', 'Library - where we read books', 'Teacher - who teaches us'],
    activities: ['Draw your school', 'Name people at school', 'What do you do at school?'],
    questions: [
      { id: 'ev12q1', type: 'mcq', question: 'Where do we read books?', options: ['Library', 'Playground', 'Kitchen'], answer: 'Library' },
      { id: 'ev12q2', type: 'mcq', question: 'Who teaches us?', options: ['Teacher', 'Doctor', 'Driver'], answer: 'Teacher' },
    ],
    prerequisites: [], parentGuide: ['Talk about school day', 'Ask what they enjoyed']
  },
  {
    id: 'ev13', subject: 'evs', unit: 'My Home', topic: 'My Home', title: 'Rooms in My Home', difficulty: 'easy', duration: 10,
    explanation: 'Our home has different rooms for different things.',
    examples: ['🛋️ Living room - sit with family', '🍳 Kitchen - cook food', '🛏️ Bedroom - sleep', '🚿 Bathroom - bathe', '🚪 Door - enter/exit'],
    activities: ['Draw floor plan of home', 'Name each room', 'What do we do in each room?'],
    questions: [
      { id: 'ev13q1', type: 'mcq', question: 'Where do we cook food?', options: ['Kitchen', 'Bedroom', 'Bathroom'], answer: 'Kitchen' },
      { id: 'ev13q2', type: 'mcq', question: 'Where do we sleep?', options: ['Bedroom', 'Kitchen', 'Living room'], answer: 'Bedroom' },
    ],
    prerequisites: [], parentGuide: ['Walk through home, name rooms']
  },
  {
    id: 'ev14', subject: 'evs', unit: 'Helpers', topic: 'People Who Help Us', title: 'Helpers Around Us', difficulty: 'easy', duration: 10,
    explanation: 'Many people help us every day.',
    examples: ['👨‍⚕️ Doctor - makes us well', '👩‍🏫 Teacher - teaches us', '👮 Police - keeps us safe', '🧹 Sweeper - keeps things clean', '👨‍🍳 Cook - makes food', '📧 Postman - delivers letters'],
    activities: ['Who helped you today?', 'Draw a helper', 'Thank a helper'],
    questions: [
      { id: 'ev14q1', type: 'mcq', question: 'Who makes us well when sick?', options: ['Doctor', 'Teacher', 'Police'], answer: 'Doctor' },
      { id: 'ev14q2', type: 'mcq', question: 'Who keeps us safe?', options: ['Police', 'Cook', 'Sweeper'], answer: 'Police' },
    ],
    prerequisites: [], parentGuide: ['Point out helpers in daily life']
  },
  {
    id: 'ev15', subject: 'evs', unit: 'Transport', topic: 'Ways of Transport', title: 'How Do We Travel?', difficulty: 'easy', duration: 10,
    explanation: 'We use different vehicles to travel from one place to another.',
    examples: ['🚗 Car - on road', '🚌 Bus - many people on road', '🚂 Train - on tracks', '✈️ Aeroplane - in sky', '🚢 Ship - on water', '🚲 Bicycle - pedalled'],
    activities: ['What did you come to school in?', 'Draw your favourite vehicle', 'Land, water, or air?'],
    questions: [
      { id: 'ev15q1', type: 'mcq', question: 'Which vehicle flies in the sky?', options: ['Aeroplane', 'Car', 'Boat'], answer: 'Aeroplane' },
      { id: 'ev15q2', type: 'mcq', question: 'Which vehicle runs on tracks?', options: ['Train', 'Bus', 'Car'], answer: 'Train' },
    ],
    prerequisites: [], parentGuide: ['Watch vehicles on the road', 'Name each one']
  },
  {
    id: 'ev16', subject: 'evs', unit: 'Seasons', topic: 'Three Seasons', title: 'Summer, Winter, Rainy', difficulty: 'easy', duration: 10,
    explanation: 'India has 3 main seasons: Summer (hot), Winter (cold), Rainy (wet).',
    examples: ['☀️ Summer (March-June) - Hot, eat ice cream, wear cotton', '❄️ Winter (November-February) - Cold, wear sweaters, drink hot milk', '🌧️ Rainy (July-October) - Rain, use umbrella, wear raincoat'],
    activities: ['What season is it now?', 'What do we eat in each season?', 'Draw each season'],
    questions: [
      { id: 'ev16q1', type: 'mcq', question: 'In which season do we wear sweaters?', options: ['Winter', 'Summer', 'Rainy'], answer: 'Winter' },
      { id: 'ev16q2', type: 'mcq', question: 'In which season do we use umbrella?', options: ['Rainy', 'Summer', 'Winter'], answer: 'Rainy' },
    ],
    prerequisites: ['ev10'], parentGuide: ['Connect to current season']
  },
  {
    id: 'ev17', subject: 'evs', unit: 'Plants', topic: 'Types of Plants', title: 'Trees, Shrubs, and Herbs', difficulty: 'medium', duration: 10,
    explanation: 'Plants come in different sizes.',
    examples: ['🌳 Tree - very big (Neem, Mango, Banyan)', '🌿 Shrub - medium (Rose, Hibiscus)', '🌱 Herb - small (Tulsi, Mint, Grass)'],
    activities: ['Find a tree near home', 'Find a small plant', 'Draw all three types'],
    questions: [
      { id: 'ev17q1', type: 'mcq', question: 'Which is the biggest plant?', options: ['Tree', 'Shrub', 'Herb'], answer: 'Tree' },
      { id: 'ev17q2', type: 'mcq', question: 'Tulsi is a?', options: ['Herb', 'Tree', 'Shrub'], answer: 'Herb' },
    ],
    prerequisites: ['ev4'], parentGuide: ['Show real examples']
  },
  {
    id: 'ev18', subject: 'evs', unit: 'Animals', topic: 'Where Animals Live', title: 'Animal Homes', difficulty: 'easy', duration: 10,
    explanation: 'Different animals live in different places.',
    examples: ['Dog 🐕 → Kennel', 'Cat 🐈 → House', 'Bird 🐦 → Nest', 'Fish 🐟 → Water', 'Lion 🦁 → Den', 'Bee 🐝 → Hive'],
    activities: ['Match animal to home', 'Draw animal homes'],
    questions: [
      { id: 'ev18q1', type: 'mcq', question: 'Where does a bird live?', options: ['Nest', 'Water', 'Cave'], answer: 'Nest' },
      { id: 'ev18q2', type: 'mcq', question: 'Where does a fish live?', options: ['Water', 'Tree', 'Ground'], answer: 'Water' },
    ],
    prerequisites: ['ev6', 'ev7'], parentGuide: ['Match animal to its home']
  },
  {
    id: 'ev19', subject: 'evs', unit: 'Good Manners', topic: 'Good Manners', title: 'Being Polite', difficulty: 'easy', duration: 10,
    explanation: 'Good manners make everyone happy.',
    examples: ['Please - when asking', 'Thank you - when receiving', 'Sorry - when wrong', 'Excuse me - when interrupting', 'Good morning - greeting'],
    activities: ['Practice saying please and thank you', 'Role play polite conversations'],
    questions: [
      { id: 'ev19q1', type: 'mcq', question: 'What do you say when someone gives you something?', options: ['Thank you', 'Sorry', 'Go away'], answer: 'Thank you' },
      { id: 'ev19q2', type: 'mcq', question: 'What do you say when you make a mistake?', options: ['Sorry', 'Thank you', 'Hello'], answer: 'Sorry' },
    ],
    prerequisites: [], parentGuide: ['Practice daily', 'Praise polite behaviour']
  },
  {
    id: 'ev20', subject: 'evs', unit: 'Revision', topic: 'EVS Mixed Quiz', title: 'EVS - Complete Review', difficulty: 'medium', duration: 15,
    explanation: 'Let us review everything in EVS!',
    examples: ['Body parts', 'Sense organs', 'Plants', 'Animals', 'Weather', 'Food'],
    activities: ['Mixed quiz', 'Draw and explain'],
    questions: [
      { id: 'ev20q1', type: 'mcq', question: 'We smell with our?', options: ['Nose', 'Eyes', 'Ears'], answer: 'Nose' },
      { id: 'ev20q2', type: 'mcq', question: 'Roots of a plant are?', options: ['Underground', 'On top', 'In sky'], answer: 'Underground' },
      { id: 'ev20q3', type: 'mcq', question: 'Cow is a ___ animal?', options: ['Domestic', 'Wild', 'Pet'], answer: 'Domestic' },
      { id: 'ev20q4', type: 'mcq', question: 'We should drink ___ daily?', options: ['Water', 'Soda', 'Juice only'], answer: 'Water' },
    ],
    prerequisites: ['ev1', 'ev4', 'ev6'], parentGuide: ['Test all areas']
  },
  // Safety lessons
  {
    id: 's1', subject: 'safety', unit: 'Personal Safety', topic: 'My Body is Mine', title: 'My Body Belongs to Me', difficulty: 'easy', duration: 10,
    explanation: 'Your body belongs to you. No one should touch you in ways that make you uncomfortable.',
    examples: ['Your body is special', 'You can say NO if someone makes you uncomfortable', 'Tell a trusted adult if something feels wrong'],
    activities: ['Name trusted adults', 'Practice saying "No!" firmly', 'Draw your safe circle'],
    questions: [
      { id: 's1q1', type: 'mcq', question: 'If someone makes you uncomfortable, you should?', options: ['Tell a trusted adult', 'Keep quiet', 'Go with them'], answer: 'Tell a trusted adult' },
    ],
    prerequisites: [], parentGuide: ['Use calm, reassuring language', 'Never frighten the child', 'Emphasize they can always talk to you']
  },
  {
    id: 's2', subject: 'safety', unit: 'Road Safety', topic: 'Crossing the Road', title: 'Safe on the Road', difficulty: 'easy', duration: 10,
    explanation: 'We must be careful on the road. Always cross at zebra crossing and look both ways.',
    examples: ['🚦 Red light = STOP', '🟡 Yellow light = WAIT', '🟢 Green light = GO', 'Look LEFT, RIGHT, LEFT before crossing', 'Hold an adult\'s hand'],
    activities: ['Practice road crossing at home', 'Draw traffic lights', 'Role play crossing road'],
    questions: [
      { id: 's2q1', type: 'mcq', question: 'Red light means?', options: ['Stop', 'Go', 'Run'], answer: 'Stop' },
      { id: 's2q2', type: 'mcq', question: 'Before crossing road, look?', options: ['Both sides', 'Only left', 'Only right'], answer: 'Both sides' },
    ],
    prerequisites: [], parentGuide: ['Practice while walking', 'Always hold hands on road']
  },
  {
    id: 's3', subject: 'safety', unit: 'Home Safety', topic: 'Safe at Home', title: 'Being Safe at Home', difficulty: 'easy', duration: 10,
    explanation: 'Home should be safe. Let us learn what is safe and what is not.',
    examples: ['✅ Don\'t touch electrical sockets', '✅ Don\'t play with matches/fire', '✅ Don\'t open door for strangers', '✅ Don\'t run on wet floor', '✅ Ask adult before eating unknown things'],
    activities: ['Find unsafe things at home (with adult)', 'Draw safe vs unsafe'],
    questions: [
      { id: 's3q1', type: 'mcq', question: 'Should we touch electrical sockets?', options: ['No', 'Yes', 'Sometimes'], answer: 'No' },
      { id: 's3q2', type: 'mcq', question: 'Should we open door for strangers?', options: ['No', 'Yes', 'Only if they give candy'], answer: 'No' },
    ],
    prerequisites: [], parentGuide: ['Walk through home, point out dangers', 'Keep it positive']
  },
  {
    id: 's4', subject: 'safety', unit: 'School Safety', topic: 'Safe at School', title: 'Being Safe at School', difficulty: 'easy', duration: 10,
    explanation: 'At school, we follow rules to stay safe.',
    examples: ['Walk, don\'t run in corridors', 'Don\'t push in line', 'Tell teacher if hurt', 'Use equipment properly', 'Don\'t eat unknown food'],
    activities: ['Role play school safety', 'Name school rules'],
    questions: [
      { id: 's4q1', type: 'mcq', question: 'If you get hurt at school, tell?', options: ['Teacher', 'Nobody', 'Stranger'], answer: 'Teacher' },
    ],
    prerequisites: [], parentGuide: ['Talk about school rules', 'Ask what they do if hurt']
  },
  {
    id: 's5', subject: 'safety', unit: 'Emotions', topic: 'My Feelings', title: 'Understanding My Feelings', difficulty: 'easy', duration: 10,
    explanation: 'We all have feelings. It is okay to feel happy, sad, angry, or scared.',
    examples: ['😊 Happy - when something good happens', '😢 Sad - when something doesn\'t go well', '😠 Angry - when something unfair happens', '😨 Scared - when something seems dangerous', '🤗 Excited - when looking forward to something'],
    activities: ['How are you feeling today?', 'Draw your feelings', 'Talk about when you felt each emotion'],
    questions: [
      { id: 's5q1', type: 'mcq', question: 'Is it okay to feel sad sometimes?', options: ['Yes', 'No', 'Only for babies'], answer: 'Yes' },
      { id: 's5q2', type: 'mcq', question: 'When you feel scared, you should?', options: ['Tell a trusted adult', 'Hide', 'Cry alone'], answer: 'Tell a trusted adult' },
    ],
    prerequisites: [], parentGuide: ['Validate all emotions', 'Help child name their feelings', 'Never say "don\'t cry"']
  },
  {
    id: 's6', subject: 'safety', unit: 'Emergency', topic: 'Emergency Help', title: 'Getting Help in Emergency', difficulty: 'easy', duration: 10,
    explanation: 'In an emergency, we need to know who to call and what to do.',
    examples: ['🚔 Police: 100', '🚑 Ambulance: 102', '🚒 Fire: 101', 'Tell your parents\' phone number', 'Tell your home address'],
    activities: ['Learn parents\' phone number', 'Practice dialing (on toy phone)', 'Know home address'],
    questions: [
      { id: 's6q1', type: 'mcq', question: 'Police number is?', options: ['100', '101', '102'], answer: '100' },
      { id: 's6q2', type: 'mcq', question: 'In emergency, call?', options: ['Parents/Police', 'Nobody', 'Stranger'], answer: 'Parents/Police' },
    ],
    prerequisites: [], parentGuide: ['Teach phone number', 'Practice calmly']
  },
  {
    id: 's7', subject: 'safety', unit: 'Stranger Safety', topic: 'Stranger Danger', title: 'Being Safe with Strangers', difficulty: 'easy', duration: 10,
    explanation: 'A stranger is someone you don\'t know well. We should be careful.',
    examples: ['Don\'t go with strangers', 'Don\'t take things from strangers', 'Don\'t tell personal info to strangers', 'Always stay with trusted adults', 'Shout for help if needed'],
    activities: ['Who are your trusted adults?', 'What would you do if...?', 'Practice saying No'],
    questions: [
      { id: 's7q1', type: 'mcq', question: 'A stranger offers candy. You should?', options: ['Say no and tell parents', 'Take it', 'Go with them'], answer: 'Say no and tell parents' },
    ],
    prerequisites: ['s1'], parentGuide: ['Don\'t create fear', 'Empower the child', 'Practice scenarios gently']
  },
  {
    id: 's8', subject: 'safety', unit: 'Trusted Adults', topic: 'My Safe Circle', title: 'People I Can Trust', difficulty: 'easy', duration: 10,
    explanation: 'Everyone has trusted adults they can talk to about anything.',
    examples: ['Mummy 👩', 'Papa 👨', 'Teacher 👩‍🏫', 'Grandma 👵', 'Grandpa 👴'],
    activities: ['Name 5 trusted adults', 'Draw your safe circle', 'Practice: "I can always tell..."'],
    questions: [
      { id: 's8q1', type: 'mcq', question: 'If something worries you, tell?', options: ['A trusted adult', 'Nobody', 'A stranger'], answer: 'A trusted adult' },
    ],
    prerequisites: [], parentGuide: ['Reassure child', 'Be available to listen', 'Never punish for telling']
  },
  {
    id: 's9', subject: 'safety', unit: 'Digital Safety', topic: 'Screen Time Safety', title: 'Being Safe with Screens', difficulty: 'easy', duration: 10,
    explanation: 'When using phone/tablet, we should be safe.',
    examples: ['Ask parents before downloading', 'Don\'t talk to strangers online', 'Take breaks from screen', 'Don\'t share personal info', 'Use only parent-approved apps'],
    activities: ['Set screen time rules together', 'What apps are safe?'],
    questions: [
      { id: 's9q1', type: 'mcq', question: 'Before using a new app, ask?', options: ['Parents', 'Nobody', 'Stranger'], answer: 'Parents' },
    ],
    prerequisites: [], parentGuide: ['Set healthy screen habits']
  },
  {
    id: 's10', subject: 'safety', unit: 'Revision', topic: 'Safety Review', title: 'Safety - Complete Review', difficulty: 'medium', duration: 15,
    explanation: 'Let us review all safety lessons!',
    examples: ['Personal safety', 'Road safety', 'Home safety', 'Stranger safety', 'Emergency numbers'],
    activities: ['Safety quiz', 'Role play scenarios'],
    questions: [
      { id: 's10q1', type: 'mcq', question: 'Red light means?', options: ['Stop', 'Go', 'Run'], answer: 'Stop' },
      { id: 's10q2', type: 'mcq', question: 'If someone makes you uncomfortable?', options: ['Tell trusted adult', 'Keep secret', 'Go with them'], answer: 'Tell trusted adult' },
      { id: 's10q3', type: 'mcq', question: 'Ambulance number?', options: ['102', '100', '101'], answer: '102' },
    ],
    prerequisites: ['s1', 's2', 's3'], parentGuide: ['Regular safety conversations']
  },
  // Art lessons
  {
    id: 'a1', subject: 'art', unit: 'Drawing', topic: 'Draw My Family', title: 'Art: Draw Your Family', difficulty: 'easy', duration: 15,
    explanation: 'Draw your family members. Include everyone!',
    examples: ['Draw papa, mummy, yourself, siblings', 'Use colours', 'Add details like clothes'],
    activities: ['Draw family portrait', 'Label each person', 'Show and tell'],
    questions: [], prerequisites: [], parentGuide: ['Provide paper and colours', 'Don\'t correct - encourage creativity']
  },
  {
    id: 'a2', subject: 'art', unit: 'Drawing', topic: 'Draw a Plant', title: 'Art: Draw and Label a Plant', difficulty: 'easy', duration: 15,
    explanation: 'Draw a plant showing all its parts: roots, stem, leaves, flower, fruit.',
    examples: ['Draw roots underground', 'Draw stem going up', 'Add leaves on sides', 'Draw a flower on top'],
    activities: ['Draw a plant', 'Label all parts', 'Colour it'],
    questions: [], prerequisites: ['ev4'], parentGuide: ['Look at a real plant first', 'Guide labels']
  },
  {
    id: 'a3', subject: 'art', unit: 'Drawing', topic: 'Draw an Animal', title: 'Art: Draw Your Favourite Animal', difficulty: 'easy', duration: 15,
    explanation: 'Draw your favourite animal. Add details!',
    examples: ['Draw the body shape', 'Add eyes, ears, legs', 'Add colour', 'Draw where it lives'],
    activities: ['Choose favourite animal', 'Draw it', 'Write its name'],
    questions: [], prerequisites: ['ev6'], parentGuide: ['Show pictures for reference', 'Encourage details']
  },
  {
    id: 'a4', subject: 'art', unit: 'Colouring', topic: 'Colour Patterns', title: 'Art: Colour Patterns', difficulty: 'easy', duration: 15,
    explanation: 'Create beautiful colour patterns!',
    examples: ['Red-Blue-Red-Blue pattern', 'Circle-Triangle-Circle-Triangle', 'Big-Small-Big-Small'],
    activities: ['Make colour pattern', 'Complete given pattern', 'Create your own'],
    questions: [], prerequisites: ['m22'], parentGuide: ['Connect to maths patterns']
  },
  {
    id: 'a5', subject: 'art', unit: 'Craft', topic: 'Paper Folding', title: 'Art: Paper Folding (Origami)', difficulty: 'medium', duration: 20,
    explanation: 'Fold paper to make shapes and objects!',
    examples: ['Fold a paper boat', 'Fold a paper aeroplane', 'Fold a simple dog face'],
    activities: ['Follow folding steps', 'Make a paper boat', 'Decorate it'],
    questions: [], prerequisites: [], parentGuide: ['Help with folding', 'Use colourful paper']
  },
  {
    id: 'a6', subject: 'art', unit: 'Craft', topic: 'Finger Painting', title: 'Art: Finger Painting', difficulty: 'easy', duration: 20,
    explanation: 'Use your fingers to paint beautiful pictures!',
    examples: ['Fingerprint flowers', 'Fingerprint butterfly', 'Fingerprint tree'],
    activities: ['Dip finger in paint', 'Make fingerprints', 'Create a picture'],
    questions: [], prerequisites: [], parentGuide: ['Use non-toxic colours', 'Put old newspaper underneath']
  },
  {
    id: 'a7', subject: 'art', unit: 'Craft', topic: 'Cut and Paste', title: 'Art: Cut and Paste', difficulty: 'medium', duration: 20,
    explanation: 'Cut shapes from paper and paste them to make pictures.',
    examples: ['Cut circles → make a caterpillar', 'Cut triangles → make a tree', 'Cut squares → make a house'],
    activities: ['Cut shapes', 'Arrange on paper', 'Paste to make picture'],
    questions: [], prerequisites: [], parentGuide: ['Use child-safe scissors', 'Supervise cutting']
  },
  {
    id: 'a8', subject: 'art', unit: 'Drawing', topic: 'Season Drawing', title: 'Art: Draw a Season', difficulty: 'easy', duration: 15,
    explanation: 'Draw your favourite season!',
    examples: ['Summer: sun, ice cream, cotton clothes', 'Winter: snow, sweater, hot chocolate', 'Rainy: umbrella, rain, puddles'],
    activities: ['Choose a season', 'Draw it', 'Tell about it'],
    questions: [], prerequisites: ['ev10'], parentGuide: ['Connect to EVS weather lesson']
  },
  {
    id: 'a9', subject: 'art', unit: 'Drawing', topic: 'Draw Fruits', title: 'Art: Draw and Colour Fruits', difficulty: 'easy', duration: 15,
    explanation: 'Draw your favourite fruits and colour them!',
    examples: ['Apple 🍎 - red', 'Banana 🍌 - yellow', 'Grapes 🍇 - purple/green', 'Mango 🥭 - yellow/orange'],
    activities: ['Draw 3 fruits', 'Colour them correctly', 'Write their names'],
    questions: [], prerequisites: [], parentGuide: ['Connect to English/ Hindi vocabulary']
  },
  {
    id: 'a10', subject: 'art', unit: 'Drawing', topic: 'Draw Shapes', title: 'Art: Draw and Trace Shapes', difficulty: 'easy', duration: 15,
    explanation: 'Draw and trace basic shapes.',
    examples: ['Circle ⭕', 'Triangle 🔺', 'Square 🟧', 'Rectangle ▬'],
    activities: ['Trace shapes', 'Draw freehand', 'Find shapes around house'],
    questions: [], prerequisites: ['m21'], parentGuide: ['Connect to maths shapes lesson']
  },
];

export const allEvsLessons = evsLessons;
