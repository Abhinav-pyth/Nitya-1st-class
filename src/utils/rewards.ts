// Kid's Play Zone — unified rewards & progress tracking (localStorage, safe defaults)
// Stars, badges, streaks, lesson completion and game stats all persist here.

export interface GameStats {
  plays: number;
  bestScore: number;
  starsEarned: number;
}

export interface RewardsState {
  stars: number;
  lessonsCompleted: Record<string, { scorePct: number; date: string }>; // lessonId -> best result
  gameStats: Record<string, GameStats>; // gameId -> stats
  badges: string[]; // earned badge ids
  streak: number;
  lastActiveDate: string; // yyyy-mm-dd
  totalActivities: number;
  dailyChallengeDate: string; // date of last completed daily challenge
  recentGames: string[]; // recently played game page ids (max 6)
}

const KEY = 'kpz_rewards_v1';

export const BADGES: { id: string; name: string; icon: string; desc: string; test: (r: RewardsState) => boolean }[] = [
  { id: 'first-star', name: 'First Star', icon: '⭐', desc: 'Earn your very first star', test: r => r.stars >= 1 },
  { id: 'star-10', name: 'Star Collector', icon: '🌟', desc: 'Collect 10 stars', test: r => r.stars >= 10 },
  { id: 'star-50', name: 'Super Nova', icon: '💫', desc: 'Collect 50 stars', test: r => r.stars >= 50 },
  { id: 'lesson-1', name: 'First Lesson', icon: '📖', desc: 'Finish your first lesson', test: r => Object.keys(r.lessonsCompleted).length >= 1 },
  { id: 'lesson-10', name: 'Knowledge Explorer', icon: '🎓', desc: 'Complete 10 lessons', test: r => Object.keys(r.lessonsCompleted).length >= 10 },
  { id: 'games-5', name: 'Game Master', icon: '🎮', desc: 'Play 5 different games', test: r => Object.keys(r.gameStats).length >= 5 },
  { id: 'streak-3', name: '3-Day Streak', icon: '🔥', desc: 'Learn 3 days in a row', test: r => r.streak >= 3 },
  { id: 'streak-7', name: 'Week Warrior', icon: '🏆', desc: 'Learn 7 days in a row', test: r => r.streak >= 7 },
  { id: 'daily-1', name: 'Daily Doer', icon: '📅', desc: 'Finish a Daily Challenge', test: r => !!r.dailyChallengeDate },
];

export const defaultRewards: RewardsState = {
  stars: 0,
  lessonsCompleted: {},
  gameStats: {},
  badges: [],
  streak: 0,
  lastActiveDate: '',
  totalActivities: 0,
  dailyChallengeDate: '',
  recentGames: [],
};

export function loadRewards(): RewardsState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultRewards, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultRewards };
}

function save(r: RewardsState) {
  try { localStorage.setItem(KEY, JSON.stringify(r)); } catch {}
}

const todayStr = () => new Date().toISOString().split('T')[0];

function touchStreak(r: RewardsState): RewardsState {
  const today = todayStr();
  if (r.lastActiveDate === today) return r;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  r.streak = r.lastActiveDate === yesterday ? r.streak + 1 : 1;
  r.lastActiveDate = today;
  return r;
}

export function checkNewBadges(r: RewardsState): string[] {
  const newly: string[] = [];
  for (const b of BADGES) {
    if (!r.badges.includes(b.id) && b.test(r)) {
      r.badges.push(b.id);
      newly.push(b.id);
    }
  }
  return newly;
}

/** Mark a lesson complete with a score percentage and award stars. */
export function recordLessonCompletion(lessonId: string, scorePct: number): { stars: number; newBadges: string[] } {
  const r = loadRewards();
  const prev = r.lessonsCompleted[lessonId];
  const firstTime = !prev;
  if (!prev || scorePct > prev.scorePct) {
    r.lessonsCompleted[lessonId] = { scorePct, date: todayStr() };
  }
  const awardedStars = Math.max(1, Math.round(scorePct / 25)); // 1..4 stars
  r.stars += awardedStars;
  r.totalActivities += 1;
  touchStreak(r);
  const newBadges = checkNewBadges(r);
  save(r);
  return { stars: awardedStars, newBadges };
}

/** Record that a game was played / scored. */
export function recordGameResult(gameId: string, score: number): { stars: number; newBadges: string[] } {
  const r = loadRewards();
  const gs = r.gameStats[gameId] || { plays: 0, bestScore: 0, starsEarned: 0 };
  gs.plays += 1;
  gs.bestScore = Math.max(gs.bestScore, score);
  const awardedStars = score > 0 ? Math.min(5, 1 + Math.floor(score / 5)) : 1;
  gs.starsEarned += awardedStars;
  r.gameStats[gameId] = gs;
  r.stars += awardedStars;
  r.totalActivities += 1;
  r.recentGames = [gameId, ...r.recentGames.filter(g => g !== gameId)].slice(0, 6);
  touchStreak(r);
  const newBadges = checkNewBadges(r);
  save(r);
  return { stars: awardedStars, newBadges };
}

/** Simply note that a game was opened (for "recently played"). */
export function noteGamePlayed(gameId: string) {
  const r = loadRewards();
  r.recentGames = [gameId, ...r.recentGames.filter(g => g !== gameId)].slice(0, 6);
  save(r);
}

/** Mark daily challenge done once per day. */
export function recordDailyChallenge(stars: number): { alreadyToday: boolean; newBadges: string[] } {
  const r = loadRewards();
  const today = todayStr();
  if (r.dailyChallengeDate === today) return { alreadyToday: true, newBadges: [] };
  r.dailyChallengeDate = today;
  r.stars += stars;
  r.totalActivities += 1;
  touchStreak(r);
  const newBadges = checkNewBadges(r);
  save(r);
  return { alreadyToday: false, newBadges };
}

export function getLessonsCompletedCount(): number {
  return Object.keys(loadRewards().lessonsCompleted).length;
}

export function isLessonCompleted(lessonId: string): boolean {
  return !!loadRewards().lessonsCompleted[lessonId];
}

export function resetRewards() {
  try { localStorage.removeItem(KEY); } catch {}
}
