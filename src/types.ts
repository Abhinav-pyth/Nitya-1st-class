export interface StudentProfile {
  name: string;
  age: number;
  class: string;
  school: string;
  dailyStudyMinutes: number;
  session: string;
}

export interface Lesson {
  id: string;
  subject: Subject;
  unit: string;
  topic: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  explanation: string;
  examples: string[];
  activities: string[];
  questions: QuizQuestion[];
  prerequisites: string[];
  parentGuide: string[];
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'fill' | 'match' | 'write' | 'oral' | 'truefalse';
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
  image?: string;
}

export interface TopicProgress {
  topicId: string;
  status: 'not_started' | 'learning' | 'practicing' | 'mastered';
  score: number;
  attempts: number;
  lastPracticed: string;
  nextRevision: string;
}

export interface DailyPlan {
  date: string;
  lessons: PlanItem[];
  quiz: QuizQuestion[];
  priorities: string[];
  completed: boolean;
}

export interface PlanItem {
  subject: Subject;
  topic: string;
  duration: number;
  lessonId: string;
  activities: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Weakness {
  topic: string;
  subject: Subject;
  score: number;
  priority: number;
}

export type Subject = 'hindi' | 'english' | 'maths' | 'evs' | 'safety' | 'art' | 'gk';

export type Page = 'home' | 'daily' | 'subjects' | 'lesson' | 'quiz' | 'progress' | 'settings' | 'hindi-write' | 'child-mode' | 'weekly-report' | 'foundation' | 'speak' | 'vocabulary' | 'matra' | 'classroom' | 'classroom-stream' | 'classroom-classwork' | 'classroom-people' | 'games';

export interface AppState {
  profile: StudentProfile;
  progress: Record<string, TopicProgress>;
  dailyPlans: Record<string, DailyPlan>;
  badges: Badge[];
  weaknesses: Weakness[];
  streak: number;
  lastActiveDate: string;
  totalLessonsCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
}
