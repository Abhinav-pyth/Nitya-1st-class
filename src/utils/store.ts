import { AppState, StudentProfile, TopicProgress, DailyPlan, Weakness, Badge, Subject } from '../types';
import { allHindiLessons } from '../data/hindi';
import { allEnglishLessons } from '../data/english';
import { allMathsLessons } from '../data/maths';
import { allEvsLessons } from '../data/evs';
import { allGkLessons } from '../data/gk';

export const ALL_LESSONS = [...allHindiLessons, ...allEnglishLessons, ...allMathsLessons, ...allEvsLessons, ...allGkLessons];

const STORAGE_KEY = 'class1_learning_buddy';

export const defaultProfile: StudentProfile = {
  name: 'Student',
  age: 6,
  class: '1',
  school: 'Ideal Academy, Indore',
  dailyStudyMinutes: 70,
  session: '2026-27',
};

export const defaultBadges: Badge[] = [
  { id: 'b1', name: 'Math Explorer', icon: '🔢', description: 'Complete 5 Maths lessons', earned: false },
  { id: 'b2', name: 'Hindi Writing Star', icon: '✍️', description: 'Complete 10 Hindi writing lessons', earned: false },
  { id: 'b3', name: 'English Speaker', icon: '🗣️', description: 'Complete 5 English speaking lessons', earned: false },
  { id: 'b4', name: 'Reading Champion', icon: '📖', description: 'Complete 5 reading lessons', earned: false },
  { id: 'b5', name: 'EVS Explorer', icon: '🌱', description: 'Complete 5 EVS lessons', earned: false },
  { id: 'b6', name: '7-Day Learner', icon: '🌟', description: 'Study for 7 days in a row', earned: false },
  { id: 'b7', name: 'Matra Master', icon: '📝', description: 'Master all Hindi matras', earned: false },
  { id: 'b8', name: 'Addition Ace', icon: '➕', description: 'Score 90%+ in addition', earned: false },
];

export const getDefaultState = (): AppState => ({
  profile: defaultProfile,
  progress: {},
  dailyPlans: {},
  badges: defaultBadges,
  weaknesses: [],
  streak: 0,
  lastActiveDate: '',
  totalLessonsCompleted: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
});

export const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  return getDefaultState();
};

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
};

export const updateProgress = (
  state: AppState,
  topicId: string,
  score: number
): AppState => {
  const existing = state.progress[topicId];
  const currentScore = existing ? Math.max(existing.score, score) : score;
  const attempts = existing ? existing.attempts + 1 : 1;
  
  let status: TopicProgress['status'] = 'learning';
  if (currentScore >= 85) status = 'mastered';
  else if (currentScore >= 70) status = 'practicing';
  else if (currentScore > 0) status = 'learning';

  const now = new Date().toISOString();
  const nextRevision = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const newProgress: TopicProgress = {
    topicId,
    status,
    score: currentScore,
    attempts,
    lastPracticed: now,
    nextRevision,
  };

  return {
    ...state,
    progress: { ...state.progress, [topicId]: newProgress },
    totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
    totalCorrectAnswers: state.totalCorrectAnswers + (score >= 70 ? 1 : 0),
  };
};

export const getLessonsBySubject = (subject: Subject) => {
  switch (subject) {
    case 'hindi': return allHindiLessons;
    case 'english': return allEnglishLessons;
    case 'maths': return allMathsLessons;
    case 'evs': return allEvsLessons.filter(l => l.subject === 'evs');
    case 'safety': return allEvsLessons.filter(l => l.subject === 'safety');
    case 'art': return allEvsLessons.filter(l => l.subject === 'art');
    case 'gk': return allGkLessons;
    default: return [];
  }
};

export const getWeaknesses = (state: AppState): Weakness[] => {
  const weaknesses: Weakness[] = [];
  
  Object.entries(state.progress).forEach(([topicId, progress]) => {
    if (progress.score < 70) {
      const lesson = ALL_LESSONS
        .find(l => l.id === topicId);
      if (lesson) {
        weaknesses.push({
          topic: lesson.title,
          subject: lesson.subject,
          score: progress.score,
          priority: 100 - progress.score,
        });
      }
    }
  });

  return weaknesses.sort((a, b) => b.priority - a.priority);
};

export const getSubjectProgress = (state: AppState, subject: Subject): number => {
  const lessons = getLessonsBySubject(subject);
  if (lessons.length === 0) return 0;
  
  let total = 0;
  let completed = 0;
  
  lessons.forEach(lesson => {
    total++;
    const progress = state.progress[lesson.id];
    if (progress && progress.status === 'mastered') completed++;
    else if (progress && progress.score > 0) completed += 0.5;
  });
  
  return Math.round((completed / total) * 100);
};

export const generateDailyPlan = (state: AppState): DailyPlan => {
  const today = new Date().toISOString().split('T')[0];
  const weaknesses = getWeaknesses(state);
  
  const planItems: DailyPlan['lessons'] = [];
  const priorities: string[] = [];

  // Check what needs to be done based on weaknesses and progress
  const hindiWritingWeak = weaknesses.some(w => w.subject === 'hindi' && w.topic.includes('मात्रा') || w.topic.includes('लेखन'));
  const mathsAddWeak = weaknesses.some(w => w.subject === 'maths' && w.topic.includes('Addition'));
  const englishSentWeak = weaknesses.some(w => w.subject === 'english' && w.topic.includes('Sentence'));

  // Hindi - always priority (child is weak)
  const hindiLessons = allHindiLessons;
  const nextHindi = hindiLessons.find(l => !state.progress[l.id] || state.progress[l.id].status !== 'mastered');
  if (nextHindi) {
    planItems.push({
      subject: 'hindi',
      topic: nextHindi.title,
      duration: 15,
      lessonId: nextHindi.id,
      activities: nextHindi.activities.slice(0, 2),
    });
    if (hindiWritingWeak) priorities.push('✏️ Hindi Writing ⭐⭐⭐');
  }

  // Maths
  const mathsLessonList = allMathsLessons;
  const nextMaths = mathsLessonList.find(l => !state.progress[l.id] || state.progress[l.id].status !== 'mastered');
  if (nextMaths) {
    planItems.push({
      subject: 'maths',
      topic: nextMaths.title,
      duration: 20,
      lessonId: nextMaths.id,
      activities: nextMaths.activities.slice(0, 2),
    });
    if (mathsAddWeak) priorities.push('➕ Addition ⭐⭐');
  }

  // English
  const engLessons = allEnglishLessons;
  const nextEng = engLessons.find(l => !state.progress[l.id] || state.progress[l.id].status !== 'mastered');
  if (nextEng) {
    planItems.push({
      subject: 'english',
      topic: nextEng.title,
      duration: 15,
      lessonId: nextEng.id,
      activities: nextEng.activities.slice(0, 2),
    });
    if (englishSentWeak) priorities.push('📖 English Sentences ⭐⭐');
  }

  // EVS
  const evsLessonList = allEvsLessons.filter(l => l.subject === 'evs');
  const nextEvs = evsLessonList.find(l => !state.progress[l.id] || state.progress[l.id].status !== 'mastered');
  if (nextEvs) {
    planItems.push({
      subject: 'evs',
      topic: nextEvs.title,
      duration: 10,
      lessonId: nextEvs.id,
      activities: nextEvs.activities.slice(0, 1),
    });
  }

  // Reading
  const readingLesson = engLessons.find(l => l.unit === 'Reading' && (!state.progress[l.id] || state.progress[l.id].status !== 'mastered'));
  if (readingLesson) {
    planItems.push({
      subject: 'english',
      topic: 'Reading: ' + readingLesson.title,
      duration: 10,
      lessonId: readingLesson.id,
      activities: ['Read aloud', 'Answer questions'],
    });
  }

  // Generate quiz questions
  const quizQuestions = generateQuiz(state);

  if (priorities.length === 0) {
    priorities.push('✏️ Hindi Writing ⭐⭐⭐');
    priorities.push('➕ Maths Practice ⭐⭐');
  }

  return {
    date: today,
    lessons: planItems,
    quiz: quizQuestions,
    priorities,
    completed: false,
  };
};

export const generateQuiz = (state: AppState): import('../types').QuizQuestion[] => {
  const questions: import('../types').QuizQuestion[] = [];
  const allLessons = ALL_LESSONS;
  
  // Pick from areas that need practice
  const practicedTopics = Object.keys(state.progress).filter(id => state.progress[id].score < 85);
  
  // If we have practiced topics, pick from those
  if (practicedTopics.length > 0) {
    const randomTopic = practicedTopics[Math.floor(Math.random() * practicedTopics.length)];
    const lesson = allLessons.find(l => l.id === randomTopic);
    if (lesson && lesson.questions.length > 0) {
      questions.push(...lesson.questions.slice(0, 2));
    }
  }

  // Always include some basics
  const basicQuestions: import('../types').QuizQuestion[] = [
    { id: 'q_basic1', type: 'mcq', question: 'अ से क्या होता है?', options: ['अनार', 'आम', 'इमली'], answer: 'अनार' },
    { id: 'q_basic2', type: 'mcq', question: 'What is 2 + 3?', options: ['5', '4', '6'], answer: '5' },
    { id: 'q_basic3', type: 'mcq', question: 'Which is a fruit?', options: ['Apple', 'Chair', 'Pen'], answer: 'Apple' },
    { id: 'q_basic4', type: 'mcq', question: 'How many eyes do we have?', options: ['2', '1', '3'], answer: '2' },
    { id: 'q_basic5', type: 'mcq', question: 'क + ा = ?', options: ['का', 'कि', 'कु'], answer: 'का' },
  ];

  while (questions.length < 5) {
    const q = basicQuestions[questions.length % basicQuestions.length];
    if (!questions.find(eq => eq.id === q.id)) {
      questions.push(q);
    } else {
      break;
    }
  }

  return questions.slice(0, 5);
};

export const checkBadges = (state: AppState): Badge[] => {
  const badges = [...state.badges];
  
  // Math Explorer - 5 maths lessons
  const mathsCompleted = Object.entries(state.progress)
    .filter(([id]) => id.startsWith('m') && state.progress[id].status === 'mastered').length;
  if (mathsCompleted >= 5) {
    const badge = badges.find(b => b.id === 'b1');
    if (badge && !badge.earned) {
      badge.earned = true;
      badge.earnedDate = new Date().toISOString();
    }
  }

  // Hindi Writing Star - 10 hindi lessons
  const hindiCompleted = Object.entries(state.progress)
    .filter(([id]) => id.startsWith('h') && state.progress[id].status === 'mastered').length;
  if (hindiCompleted >= 10) {
    const badge = badges.find(b => b.id === 'b2');
    if (badge && !badge.earned) {
      badge.earned = true;
      badge.earnedDate = new Date().toISOString();
    }
  }

  // 7-Day Learner
  if (state.streak >= 7) {
    const badge = badges.find(b => b.id === 'b6');
    if (badge && !badge.earned) {
      badge.earned = true;
      badge.earnedDate = new Date().toISOString();
    }
  }

  return badges;
};

export const speak = (text: string, lang: string = 'en-IN'): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

export const speakHindi = (text: string): void => {
  speak(text, 'hi-IN');
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};
