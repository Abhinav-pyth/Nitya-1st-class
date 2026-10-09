// GK EXPLORER — Beyond the Syllabus (optional enrichment for ages 7–8)
// Kept separate from prescribed syllabus lessons; unlocked gradually.
import { Lesson } from '../types';

export const gkEnrichmentLessons: Lesson[] = [
  {
    id: 'gk-e1', subject: 'gk', unit: 'GK Explorer', topic: 'States & Capitals', title: 'More States & Capitals 🗺️', difficulty: 'medium', duration: 10,
    explanation: 'India has 28 states and 8 union territories. Each state has its own capital city. Learn them little by little!',
    examples: ['Uttar Pradesh — Lucknow', 'West Bengal — Kolkata', 'Tamil Nadu — Chennai', 'Punjab — Chandigarh', 'Bihar — Patna'],
    activities: ['Match 5 new states to capitals', 'Colour a map of India', 'Find Indore (it is in Madhya Pradesh!)'],
    questions: [
      { id: 'gke1q1', type: 'mcq', question: 'Capital of Uttar Pradesh?', options: ['Kanpur', 'Lucknow', 'Varanasi'], answer: 'Lucknow' },
      { id: 'gke1q2', type: 'mcq', question: 'Kolkata is the capital of...', options: ['West Bengal', 'Odisha', 'Bihar'], answer: 'West Bengal' },
      { id: 'gke1q3', type: 'mcq', question: 'Chennai is the capital of...', options: ['Kerala', 'Andhra Pradesh', 'Tamil Nadu'], answer: 'Tamil Nadu' },
      { id: 'gke1q4', type: 'mcq', question: 'Capital of Punjab is...', options: ['Amritsar', 'Chandigarh', 'Ludhiana'], answer: 'Chandigarh' },
      { id: 'gke1q5', type: 'mcq', question: 'Hyderabad is the capital of...', options: ['Telangana', 'Gujarat', 'Goa'], answer: 'Telangana' },
      { id: 'gke1q6', type: 'mcq', question: 'Capital of Bihar is...', options: ['Patna', 'Ranchi', 'Lucknow'], answer: 'Patna' },
    ],
    prerequisites: [], parentGuide: ['Optional enrichment — teach progressively, 2 new states per week']
  },
  {
    id: 'gk-e2', subject: 'gk', unit: 'GK Explorer', topic: 'Monuments', title: 'Famous Indian Monuments 🏛️', difficulty: 'easy', duration: 10,
    explanation: 'India has beautiful famous buildings. The Taj Mahal is one of the wonders of the world!',
    examples: ['Taj Mahal — Agra, Uttar Pradesh', 'Red Fort — Delhi', 'Gateway of India — Mumbai', 'Qutub Minar — Delhi', 'Hawa Mahal — Jaipur'],
    activities: ['Match monument to city', 'Draw the Taj Mahal', 'Ask parents: have you visited any?'],
    questions: [
      { id: 'gke2q1', type: 'mcq', question: 'The Taj Mahal is in...', options: ['Jaipur', 'Agra', 'Delhi'], answer: 'Agra' },
      { id: 'gke2q2', type: 'mcq', question: 'Gateway of India is in...', options: ['Mumbai', 'Chennai', 'Kolkata'], answer: 'Mumbai' },
      { id: 'gke2q3', type: 'mcq', question: 'The Red Fort is in...', options: ['Agra', 'Delhi', 'Lucknow'], answer: 'Delhi' },
      { id: 'gke2q4', type: 'mcq', question: 'Hawa Mahal (Palace of Winds) is in...', options: ['Jaipur', 'Udaipur', 'Bhopal'], answer: 'Jaipur' },
      { id: 'gke2q5', type: 'mcq', question: 'The Lotus Temple is in...', options: ['Delhi', 'Pune', 'Indore'], answer: 'Delhi' },
    ],
    prerequisites: [], parentGuide: ['Show photos or short videos of each monument']
  },
  {
    id: 'gk-e3', subject: 'gk', unit: 'GK Explorer', topic: 'Madhya Pradesh', title: 'My State: Madhya Pradesh 🌳', difficulty: 'easy', duration: 10,
    explanation: 'Madhya Pradesh is in the CENTRE of India, so it is called the Heart of India. Its capital is Bhopal and our city Indore is famous for clean streets and yummy food!',
    examples: ['Capital — Bhopal (city of lakes)', 'Indore — famous for cleanliness and food', 'Khajuraho — ancient temples', 'Sanchi — famous stupa', 'Kanha — tiger forest'],
    activities: ['Find MP on a map of India', 'Name 2 places in MP', 'Draw a tiger from Kanha'],
    questions: [
      { id: 'gke3q1', type: 'mcq', question: 'Madhya Pradesh is called the ___ of India', options: ['Head', 'Heart', 'Hand'], answer: 'Heart' },
      { id: 'gke3q2', type: 'mcq', question: 'Capital of Madhya Pradesh is...', options: ['Indore', 'Bhopal', 'Gwalior'], answer: 'Bhopal' },
      { id: 'gke3q3', type: 'mcq', question: 'Kanha National Park is famous for...', options: ['Camels', 'Tigers', 'Penguins'], answer: 'Tigers' },
      { id: 'gke3q4', type: 'mcq', question: 'Sanchi Stupa is in...', options: ['MP', 'Rajasthan', 'Kerala'], answer: 'MP' },
      { id: 'gke3q5', type: 'mcq', question: 'Indore is famous for its...', options: ['Desert', 'Food and cleanliness', 'Sea beach'], answer: 'Food and cleanliness' },
    ],
    prerequisites: [], parentGuide: ['Connect lessons to local places Nitya already knows']
  },
  {
    id: 'gk-e4', subject: 'gk', unit: 'GK Explorer', topic: 'Solar System', title: 'Space Quest 🚀', difficulty: 'medium', duration: 10,
    explanation: 'Beyond Earth there is space with stars, planets, moons and comets. The Sun is at the centre of our solar system.',
    examples: ['Mercury, Venus, Earth, Mars... Jupiter, Saturn, Uranus, Neptune', 'Jupiter is the BIGGEST planet', 'Saturn has beautiful rings', 'Astronauts travel in rockets'],
    activities: ['Order the planets from the Sun', 'Draw Saturn with rings', 'Look at the Moon tonight'],
    questions: [
      { id: 'gke4q1', type: 'mcq', question: 'Biggest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars'], answer: 'Jupiter' },
      { id: 'gke4q2', type: 'mcq', question: 'Which planet has visible RINGS?', options: ['Saturn', 'Venus', 'Earth'], answer: 'Saturn' },
      { id: 'gke4q3', type: 'mcq', question: 'Closest planet to the Sun is...', options: ['Mercury', 'Neptune', 'Mars'], answer: 'Mercury' },
      { id: 'gke4q4', type: 'mcq', question: 'Who travels to space?', options: ['Divers', 'Astronauts', 'Pilots'], answer: 'Astronauts' },
      { id: 'gke4q5', type: 'mcq', question: 'How many planets are in our solar system?', options: ['7', '8', '9'], answer: '8' },
    ],
    prerequisites: [], parentGuide: ['Watch the night sky; point out the Moon']
  },
  {
    id: 'gk-e5', subject: 'gk', unit: 'GK Explorer', topic: 'Wildlife', title: 'Animals & Their Homes 🦜', difficulty: 'easy', duration: 10,
    explanation: 'Different animals live in different homes called habitats — forests, oceans, deserts and grasslands.',
    examples: ['Lion — grasslands', 'Polar bear — cold Arctic ice', 'Camel — hot desert', 'Penguin — cold southern lands'],
    activities: ['Match animal to habitat', 'Name an animal from a zoo you visited', 'Which animal sleeps in the daytime?'],
    questions: [
      { id: 'gke5q1', type: 'mcq', question: 'A polar bear lives in...', options: ['Hot desert', 'Cold icy places', 'Jungle'], answer: 'Cold icy places' },
      { id: 'gke5q2', type: 'mcq', question: 'The ship of the desert is...', options: ['Horse', 'Camel', 'Elephant'], answer: 'Camel' },
      { id: 'gke5q3', type: 'mcq', question: 'Lions mostly live in...', options: ['Sea', 'Grasslands', 'Trees'], answer: 'Grasslands' },
      { id: 'gke5q4', type: 'mcq', question: 'Which bird cannot fly?', options: ['Sparrow', 'Ostrich', 'Crow'], answer: 'Ostrich' },
      { id: 'gke5q5', type: 'mcq', question: 'Biggest land animal is...', options: ['Elephant', 'Cow', 'Bear'], answer: 'Elephant' },
    ],
    prerequisites: [], parentGuide: ['Zoo visits and wildlife videos reinforce this']
  },
  {
    id: 'gk-e6', subject: 'gk', unit: 'GK Explorer', topic: 'Scientists & Achievers', title: 'Great Indians 🔬', difficulty: 'medium', duration: 10,
    explanation: 'India had great scientists and achievers. Dr. A.P.J. Abdul Kalam was called the Missile Man and became President. Kalpana Chawla was the first Indian woman in space!',
    examples: ['Dr. Kalam — missile scientist & President', 'Kalpana Chawla — astronaut', 'C.V. Raman — discovered why the sea is blue', 'Mary Kom — boxing champion', 'Sachin Tendulkar — cricket legend'],
    activities: ['Tell me one thing about Dr. Kalam', 'Who do you want to be like?', 'Draw a rocket for Kalpana Chawla'],
    questions: [
      { id: 'gke6q1', type: 'mcq', question: 'Who is known as the Missile Man of India?', options: ['Dr. A.P.J. Abdul Kalam', 'Rabindranath Tagore', 'Virat Kohli'], answer: 'Dr. A.P.J. Abdul Kalam' },
      { id: 'gke6q2', type: 'mcq', question: 'First Indian woman in space was...', options: ['Kalpana Chawla', 'Mother Teresa', 'Sunita Williams'], answer: 'Kalpana Chawla' },
      { id: 'gke6q3', type: 'mcq', question: 'C.V. Raman explained why the sea is...', options: ['Green', 'Blue', 'Red'], answer: 'Blue' },
      { id: 'gke6q4', type: 'mcq', question: 'Mary Kom is famous in...', options: ['Cricket', 'Boxing', 'Football'], answer: 'Boxing' },
      { id: 'gke6q5', type: 'mcq', question: 'Sachin Tendulkar is a ___ legend', options: ['Cricket', 'Tennis', 'Hockey'], answer: 'Cricket' },
    ],
    prerequisites: [], parentGuide: ['These stories inspire curiosity — tell them at bedtime']
  },
  {
    id: 'gk-e7', subject: 'gk', unit: 'GK Explorer', topic: 'Sports', title: 'Sports Fun ⚽', difficulty: 'easy', duration: 8,
    explanation: "Sports keep us strong and happy. Hockey is one of India's pride — India has won many Olympic medals in hockey!",
    examples: ['Hockey — stick and ball on ground', 'Cricket — bat, ball, wickets', 'Football — kick into the goal', 'Kabaddi — an Indian game'],
    activities: ['Name a sport with a ball', 'Which sport uses a racket?', 'Play catch-up outside'],
    questions: [
      { id: 'gke7q1', type: 'mcq', question: 'Which sport uses a bat and wickets?', options: ['Football', 'Cricket', 'Hockey'], answer: 'Cricket' },
      { id: 'gke7q2', type: 'mcq', question: 'Goal net is used in...', options: ['Football', 'Chess', 'Swimming'], answer: 'Football' },
      { id: 'gke7q3', type: 'mcq', question: 'Kabaddi is a traditional game from...', options: ['India', 'Japan', 'Brazil'], answer: 'India' },
      { id: 'gke7q4', type: 'mcq', question: 'Which sport is played on ICE?', options: ['Skating', 'Tennis', 'Cricket'], answer: 'Skating' },
      { id: 'gke7q5', type: 'mcq', question: 'Tennis is played with a...', options: ['Stick', 'Racket', 'Bat'], answer: 'Racket' },
    ],
    prerequisites: [], parentGuide: ['Encourage outdoor play — sports teach teamwork']
  },
  {
    id: 'gk-e8', subject: 'gk', unit: 'GK Explorer', topic: 'Music & Art', title: 'Indian Music & Art 🎵', difficulty: 'easy', duration: 8,
    explanation: 'India has lovely musical instruments and art. The tabla keeps rhythm, the sitar plays sweet strings, and Rangoli is colourful floor art!',
    examples: ['Tabla — pairs of drums', 'Sitar — string instrument', 'Flute — Krishna\'s instrument', 'Rangoli — colourful patterns at doorsteps'],
    activities: ['Clap to a beat', 'Match instrument to sound', 'Make a paper rangoli'],
    questions: [
      { id: 'gke8q1', type: 'mcq', question: 'Which is a drum-family instrument?', options: ['Sitar', 'Tabla', 'Veena'], answer: 'Tabla' },
      { id: 'gke8q2', type: 'mcq', question: 'Krishna is shown playing the...', options: ['Flute', 'Drum', 'Harmonica'], answer: 'Flute' },
      { id: 'gke8q3', type: 'mcq', question: 'Rangoli is made with...', options: ['Colours and patterns', 'Water only', 'Wood'], answer: 'Colours and patterns' },
      { id: 'gke8q4', type: 'mcq', question: 'The sitar is a ___ instrument', options: ['String', 'Drum', 'Wind'], answer: 'String' },
      { id: 'gke8q5', type: 'mcq', question: 'Painting and sculpture are types of...', options: ['Sports', 'Art', 'Food'], answer: 'Art' },
    ],
    prerequisites: [], parentGuide: ['Play a short clip of each instrument if possible']
  },
  {
    id: 'gk-e9', subject: 'gk', unit: 'GK Explorer', topic: 'Safety & Citizenship', title: 'Be Safe & Responsible 🚦', difficulty: 'easy', duration: 10,
    explanation: 'Good citizens follow rules that keep everyone safe. Red means STOP, yellow means get ready, green means GO!',
    examples: ['Traffic lights — red stop, green go', 'Look left-right-left before crossing', 'Never talk to strangers alone', 'Police emergency number in India is 100/112'],
    activities: ['Practise the road-crossing drill', 'Colour a traffic light', 'Role-play saying please and sorry'],
    questions: [
      { id: 'gke9q1', type: 'mcq', question: 'A RED traffic light means...', options: ['Go faster', 'Stop', 'Turn back'], answer: 'Stop' },
      { id: 'gke9q2', type: 'mcq', question: 'Before crossing the road we look...', options: ['Left-right-left', 'Only up', 'Only behind'], answer: 'Left-right-left' },
      { id: 'gke9q3', type: 'mcq', question: 'Police emergency number is...', options: ['100/112', '110 only', '1234'], answer: '100/112' },
      { id: 'gke9q4', type: 'mcq', question: 'If lost in a mall, you should...', options: ['Run outside', 'Ask a security guard or shopkeeper', 'Hide'], answer: 'Ask a security guard or shopkeeper' },
      { id: 'gke9q5', type: 'mcq', question: 'Dropping litter on the road is...', options: ['Good habit', 'Bad habit', 'Funny'], answer: 'Bad habit' },
    ],
    prerequisites: [], parentGuide: ['Rehearse real crossings together; praise rule-following']
  },
  {
    id: 'gk-e10', subject: 'gk', unit: 'GK Explorer', topic: 'Computers & Digital Safety', title: 'Computers & Online Safety 💻', difficulty: 'easy', duration: 10,
    explanation: 'Computers help us learn and create. Online safety: never share your name, address or school with strangers on the internet, and ask a parent before clicking.',
    examples: ['Parts: monitor, keyboard, mouse', 'Input → Computer → Output', 'Passwords are secret keys', 'Take screen breaks for outdoor play'],
    activities: ['Point to computer parts at home', 'Practice asking permission before using a tablet', 'Draw a computer'],
    questions: [
      { id: 'gke10q1', type: 'mcq', question: 'Which part shows pictures and words?', options: ['Keyboard', 'Monitor', 'Mouse'], answer: 'Monitor' },
      { id: 'gke10q2', type: 'mcq', question: 'We TYPE using the...', options: ['Keyboard', 'Speaker', 'Screen'], answer: 'Keyboard' },
      { id: 'gke10q3', type: 'mcq', question: 'Passwords should be...', options: ['Shared with everyone', 'Kept secret', 'Written on the wall'], answer: 'Kept secret' },
      { id: 'gke10q4', type: 'mcq', question: 'If a stranger chats online you should...', options: ['Reply politely', 'Tell a parent', 'Share your address'], answer: 'Tell a parent' },
      { id: 'gke10q5', type: 'mcq', question: 'The brain of the computer is the...', options: ['CPU', 'Mouse', 'Cable'], answer: 'CPU' },
    ],
    prerequisites: [], parentGuide: ['Use this lesson while co-viewing screens with your child']
  },
  {
    id: 'gk-e11', subject: 'gk', unit: 'GK Explorer', topic: 'World Landmarks', title: 'Wonders of the World 🗼', difficulty: 'medium', duration: 10,
    explanation: 'Around the world there are very famous structures. The Eiffel Tower is in Paris, and the pyramids are in Egypt!',
    examples: ['Eiffel Tower — Paris, France', 'Pyramids — Egypt', 'Statue of Liberty — New York', 'Great Wall — China', 'Sydney Opera House — Australia'],
    activities: ['Match landmark to country', 'Find France on a globe', 'Build a block pyramid'],
    questions: [
      { id: 'gke11q1', type: 'mcq', question: 'The Eiffel Tower is in...', options: ['Paris', 'Tokyo', 'Delhi'], answer: 'Paris' },
      { id: 'gke11q2', type: 'mcq', question: 'Pyramids are found in...', options: ['Egypt', 'India', 'Brazil'], answer: 'Egypt' },
      { id: 'gke11q3', type: 'mcq', question: 'The Great Wall is in...', options: ['China', 'Italy', 'Canada'], answer: 'China' },
      { id: 'gke11q4', type: 'mcq', question: 'The Statue of Liberty stands in...', options: ['New York', 'London', 'Moscow'], answer: 'New York' },
      { id: 'gke11q5', type: 'mcq', question: 'The Sydney Opera House looks like...', options: ['A mountain', 'Sails and shells', 'A castle'], answer: 'Sails and shells' },
    ],
    prerequisites: [], parentGuide: ['A globe or world map makes this come alive']
  },
  {
    id: 'gk-e12', subject: 'gk', unit: 'GK Explorer', topic: 'Continents & Oceans', title: 'Continents & Oceans 🌊', difficulty: 'medium', duration: 10,
    explanation: 'Earth has 7 big land areas called continents and 5 huge water areas called oceans. Asia is the biggest continent; the Pacific is the biggest ocean.',
    examples: ['7 continents: Asia, Africa, North America, South America, Antarctica, Europe, Australia', '5 oceans: Pacific, Atlantic, Indian, Southern, Arctic', 'India is in Asia', 'The Indian Ocean is named after India!'],
    activities: ['Find Asia on a globe', 'Name the ocean next to India', 'Count the continents on a puzzle map'],
    questions: [
      { id: 'gke12q1', type: 'mcq', question: 'Biggest continent is...', options: ['Asia', 'Australia', 'Europe'], answer: 'Asia' },
      { id: 'gke12q2', type: 'mcq', question: 'India lies in the continent of...', options: ['Africa', 'Asia', 'Antarctica'], answer: 'Asia' },
      { id: 'gke12q3', type: 'mcq', question: 'Biggest ocean is...', options: ['Pacific', 'Arctic', 'Indian'], answer: 'Pacific' },
      { id: 'gke12q4', type: 'mcq', question: 'How many continents are there?', options: ['5', '7', '9'], answer: '7' },
      { id: 'gke12q5', type: 'mcq', question: 'The coldest continent with penguins is...', options: ['Antarctica', 'Asia', 'Australia'], answer: 'Antarctica' },
    ],
    prerequisites: [], parentGuide: ['Use a globe; rotate it and name continents together']
  },
  {
    id: 'gk-e13', subject: 'gk', unit: 'GK Explorer', topic: 'Plants & Environment', title: 'How Plants Live 🌱', difficulty: 'easy', duration: 10,
    explanation: 'Plants make their own food using sunlight, water and air. This is how they give us fresh air and fruit!',
    examples: ['Leaves are the kitchen of the plant', 'Sunlight + water + air = plant food', 'Trees clean the air we breathe', 'Seeds grow into new plants'],
    activities: ['Water a plant daily for a week', 'Watch a seed sprout in cotton', 'Collect 3 different leaves'],
    questions: [
      { id: 'gke13q1', type: 'mcq', question: 'Which part makes food for the plant?', options: ['Roots', 'Leaves', 'Flower'], answer: 'Leaves' },
      { id: 'gke13q2', type: 'mcq', question: 'Plants need ___ to make food', options: ['Sunlight', 'Darkness', 'Ice'], answer: 'Sunlight' },
      { id: 'gke13q3', type: 'mcq', question: 'Trees give us...', options: ['Clean air', 'Smoke', 'Trash'], answer: 'Clean air' },
      { id: 'gke13q4', type: 'mcq', question: 'A baby plant grows from a...', options: ['Seed', 'Stone', 'Leaf only'], answer: 'Seed' },
      { id: 'gke13q5', type: 'mcq', question: 'Seeds need water, air and ___ to sprout', options: ['Warmth', 'Ice', 'Darkness forever'], answer: 'Warmth' },
    ],
    prerequisites: [], parentGuide: ['Grow a bean sprout together — science comes alive']
  },
  {
    id: 'gk-e14', subject: 'gk', unit: 'GK Explorer', topic: 'Recycling & Environment', title: 'Save Our Planet ♻️', difficulty: 'easy', duration: 10,
    explanation: 'We can help the Earth! The 3 Rs: Reduce, Reuse, Recycle. Plant trees, switch off lights when not needed, and never waste water.',
    examples: ['Paper and plastic can be recycled', 'Grow a plant — it cleans the air', 'Turn off taps while brushing', 'Use cloth bags instead of plastic'],
    activities: ['Sort home waste: recyclable vs not', 'Water a plant daily for a week', 'Draw a clean Earth'],
    questions: [
      { id: 'gke14q1', type: 'mcq', question: 'Plastic bottles should go in the...', options: ['River', 'Recycling bin', 'Fire'], answer: 'Recycling bin' },
      { id: 'gke14q2', type: 'mcq', question: 'While brushing teeth, the tap should be...', options: ['Running', 'Off while brushing', 'Removed'], answer: 'Off while brushing' },
      { id: 'gke14q3', type: 'mcq', question: 'Which bag is BEST for shopping?', options: ['Plastic', 'Cloth', 'None'], answer: 'Cloth' },
      { id: 'gke14q4', type: 'mcq', question: 'The 3 Rs mean Reduce, Reuse and...', options: ['Repeat', 'Recycle', 'Run'], answer: 'Recycle' },
      { id: 'gke14q5', type: 'mcq', question: 'Switching off unused lights...', options: ['Wastes electricity', 'Saves energy', 'Breaks bulbs'], answer: 'Saves energy' },
    ],
    prerequisites: [], parentGuide: ['Do one eco-action together this week']
  },
  {
    id: 'gk-e15', subject: 'gk', unit: 'GK Explorer', topic: 'Human Body & Senses', title: 'Super Body Facts 💪', difficulty: 'easy', duration: 10,
    explanation: 'Your body is amazing! Your heart pumps blood like a little motor, your bones hold you up, and washing hands keeps tiny germs away.',
    examples: ['Heart pumps blood all day', 'Skeleton — bones give shape', 'Germs are too small to see — soap stops them', 'Sleep helps the body grow'],
    activities: ['Feel your heartbeat after jumping', 'Name bones you can feel', 'Practise the 20-second hand wash'],
    questions: [
      { id: 'gke15q1', type: 'mcq', question: 'Which organ pumps blood?', options: ['Brain', 'Heart', 'Stomach'], answer: 'Heart' },
      { id: 'gke15q2', type: 'mcq', question: 'Washing hands protects us from...', options: ['Friends', 'Germs', 'Rain'], answer: 'Germs' },
      { id: 'gke15q3', type: 'mcq', question: 'Bones form our...', options: ['Skeleton', 'Skin', 'Hair'], answer: 'Skeleton' },
      { id: 'gke15q4', type: 'mcq', question: 'Which sense uses the tongue?', options: ['Taste', 'Sight', 'Hearing'], answer: 'Taste' },
      { id: 'gke15q5', type: 'mcq', question: 'Our body grows strongest when we...', options: ['Skip meals', 'Sleep well and play', 'Never drink water'], answer: 'Sleep well and play' },
    ],
    prerequisites: [], parentGuide: ['Connect to EVS My Body unit']
  },
  {
    id: 'gk-e16', subject: 'gk', unit: 'GK Explorer', topic: 'Simple Science', title: 'Why Does It Happen? 🔍', difficulty: 'medium', duration: 10,
    explanation: 'Little science mysteries with big answers: why things float, why ice melts, why shadows appear and where rain comes from.',
    examples: ['Wood floats, stone sinks — because of weight and density', 'Ice melts into water when warmed', 'Shadows form when light is blocked', 'Rain: water rises as vapour and forms clouds'],
    activities: ['Float/sink experiment in a bucket', 'Watch an ice cube melt', 'Make shadow puppets with a torch'],
    questions: [
      { id: 'gke16q1', type: 'mcq', question: 'Which will FLOAT on water?', options: ['Stone', 'Wood', 'Steel spoon'], answer: 'Wood' },
      { id: 'gke16q2', type: 'mcq', question: 'Ice turns to water when it is...', options: ['Heated', 'Frozen deeper', 'Painted'], answer: 'Heated' },
      { id: 'gke16q3', type: 'mcq', question: 'A shadow appears when...', options: ['Light is blocked', 'It rains', 'You sleep'], answer: 'Light is blocked' },
      { id: 'gke16q4', type: 'mcq', question: 'Rain comes from...', options: ['Clouds', 'Rivers flowing up', 'Mountains melting only'], answer: 'Clouds' },
      { id: 'gke16q5', type: 'mcq', question: 'A magnet attracts...', options: ['Iron pins', 'Plastic', 'Paper'], answer: 'Iron pins' },
    ],
    prerequisites: [], parentGuide: ['Try the safe kitchen experiments together']
  },
  {
    id: 'gk-e17', subject: 'gk', unit: 'GK Explorer', topic: 'Famous Indians', title: 'Heroes of India 🇮🇳', difficulty: 'easy', duration: 10,
    explanation: 'Great people who helped India: Mahatma Gandhi led us to freedom with peace, Rabindranath Tagore wrote our national anthem, and Sardar Patel united the states.',
    examples: ['Mahatma Gandhi — Father of the Nation', 'Rabindranath Tagore — wrote Jana Gana Mana', 'Sardar Patel — united India', 'Bharat Ratna — highest civilian award of India'],
    activities: ['Listen to the national anthem together', 'Draw charkha/spinning wheel', 'Name one freedom fighter'],
    questions: [
      { id: 'gke17q1', type: 'mcq', question: 'Who is called the Father of the Nation?', options: ['Mahatma Gandhi', 'Nehru', 'Tagore'], answer: 'Mahatma Gandhi' },
      { id: 'gke17q2', type: 'mcq', question: 'Jana Gana Mana was written by...', options: ['Rabindranath Tagore', 'Kalidasa', 'Premchand'], answer: 'Rabindranath Tagore' },
      { id: 'gke17q3', type: 'mcq', question: 'India got independence in the year...', options: ['1947', '1930', '2000'], answer: '1947' },
      { id: 'gke17q4', type: 'mcq', question: 'Bharat Ratna is...', options: ['Highest civilian award of India', 'A sport medal', 'A school book'], answer: 'Highest civilian award of India' },
      { id: 'gke17q5', type: 'mcq', question: 'Sardar Patel is known for...', options: ['Uniting the states of India', 'Flying rockets', 'Acting'], answer: 'Uniting the states of India' },
    ],
    prerequisites: [], parentGuide: ['Tell one short story per hero at bedtime']
  },
  {
    id: 'gk-e18', subject: 'gk', unit: 'GK Explorer', topic: 'Logic & Observation', title: 'Brain Teasers 🧠', difficulty: 'medium', duration: 10,
    explanation: 'Think like a detective! Look carefully, find patterns, and use clues to solve puzzles.',
    examples: ['Pattern: apple banana apple banana — next is apple', 'Odd one out: cat, dog, lion, spoon', 'Series: 2, 4, 6, ? → 8'],
    activities: ['Play odd-one-out with toys', 'Make your own pattern with beads', 'Spot differences in two pictures'],
    questions: [
      { id: 'gke18q1', type: 'mcq', question: 'Odd one out: Apple, Banana, Orange, Potato', options: ['Apple', 'Potato', 'Orange'], answer: 'Potato' },
      { id: 'gke18q2', type: 'mcq', question: 'Series: 2, 4, 6, __ ?', options: ['7', '8', '10'], answer: '8' },
      { id: 'gke18q3', type: 'mcq', question: 'Odd one out: Car, Bus, Cycle, Chair', options: ['Car', 'Chair', 'Bus'], answer: 'Chair' },
      { id: 'gke18q4', type: 'mcq', question: 'Pattern: red blue red blue red — next is...', options: ['blue', 'green', 'yellow'], answer: 'blue' },
      { id: 'gke18q5', type: 'mcq', question: 'If today is Tuesday, tomorrow is...', options: ['Monday', 'Wednesday', 'Friday'], answer: 'Wednesday' },
      { id: 'gke18q6', type: 'mcq', question: 'Series: 10, 20, 30, __ ?', options: ['35', '40', '50'], answer: '40' },
      { id: 'gke18q7', type: 'mcq', question: 'Odd one out: Eye, Ear, Nose, Spoon', options: ['Eye', 'Spoon', 'Nose'], answer: 'Spoon' },
    ],
    prerequisites: [], parentGuide: ['Praise reasoning out loud, not just right answers']
  },
  {
    id: 'gk-e19', subject: 'gk', unit: 'GK Explorer', topic: 'Women Achievers', title: 'Amazing Women 👩‍🚀', difficulty: 'easy', duration: 10,
    explanation: 'Women did wonderful things in India: Rani Lakshmibai fought bravely, Kalpana Chawla flew to space, P.T. Usha ran super fast, and Indira Gandhi was our first woman Prime Minister.',
    examples: ['Rani Lakshmibai — brave queen of Jhansi', 'Kalpana Chawla — astronaut', 'P.T. Usha — athletics star', 'Indira Gandhi — first woman PM of India', 'Sania Mirza — tennis champion'],
    activities: ['Name a woman you admire', 'Draw an astronaut', 'Tell mom/teacher why she is amazing'],
    questions: [
      { id: 'gke19q1', type: 'mcq', question: 'The brave queen of Jhansi was...', options: ['Rani Lakshmibai', 'Rani Durgavati', 'Ahilyabai'], answer: 'Rani Lakshmibai' },
      { id: 'gke19q2', type: 'mcq', question: 'First woman Prime Minister of India was...', options: ['Indira Gandhi', 'Sarojini Naidu', 'Kirana Bedi'], answer: 'Indira Gandhi' },
      { id: 'gke19q3', type: 'mcq', question: 'Kalpana Chawla went to...', options: ['Space', 'The moon base', 'Under the sea'], answer: 'Space' },
      { id: 'gke19q4', type: 'mcq', question: 'P.T. Usha is famous in...', options: ['Athletics', 'Cricket', 'Chess'], answer: 'Athletics' },
      { id: 'gke19q5', type: 'mcq', question: 'Sania Mirza plays...', options: ['Tennis', 'Hockey', 'Football'], answer: 'Tennis' },
    ],
    prerequisites: [], parentGuide: ['Representation matters — pair each story with a picture']
  },
  {
    id: 'gk-e20', subject: 'gk', unit: 'GK Explorer', topic: 'Geography Basics', title: 'Rivers, Mountains & Weather ⛰️', difficulty: 'medium', duration: 10,
    explanation: 'India has mighty rivers and the tallest mountains in the world — the Himalayas. Rivers bring water for farms and cities.',
    examples: ['Ganga — longest holy river of India', 'Yamuna flows past Delhi', 'Himalayas — tallest mountains', 'Narmada flows through Madhya Pradesh', 'Sundarbans — mangrove forest of Bengal'],
    activities: ['Trace the Narmada on a map', 'Name a river near your city', 'Draw a mountain with snow'],
    questions: [
      { id: 'gke20q1', type: 'mcq', question: 'Tallest mountain range in the world?', options: ['Himalayas', 'Aravallis', 'Western Ghats'], answer: 'Himalayas' },
      { id: 'gke20q2', type: 'mcq', question: 'Which river flows through Delhi?', options: ['Yamuna', 'Godavari', 'Kaveri'], answer: 'Yamuna' },
      { id: 'gke20q3', type: 'mcq', question: 'The Ganga is a famous...', options: ['Mountain', 'River', 'Desert'], answer: 'River' },
      { id: 'gke20q4', type: 'mcq', question: 'Narmada flows mainly through...', options: ['Madhya Pradesh', 'Kerala', 'Assam'], answer: 'Madhya Pradesh' },
      { id: 'gke20q5', type: 'mcq', question: 'Sundarbans is famous for...', options: ['Mangroves and tigers', 'Snow', 'Volcanoes'], answer: 'Mangroves and tigers' },
    ],
    prerequisites: [], parentGuide: ['Map work builds geography thinking — keep an India map handy']
  },
];
