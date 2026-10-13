import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'ausd-wallet-streaks-v1';
const MILESTONE_KEY = 'ausd-wallet-milestones-v1';

export const MILESTONES = [25, 50, 75, 100];

/** ISO week key like "2026-W42" in UTC. */
export function weekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDay = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3);
  const week = 1 + Math.round((d.getTime() - firstThursday.getTime()) / (7 * 864e5));
  return `${d.getUTCFullYear()}-W${week}`;
}

function shiftedWeekKey(weeksAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - weeksAgo * 7);
  return weekKey(date);
}

async function readMap(key: string): Promise<Record<string, string[] | number[]>> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return {};
    const parsed = JSON.parse(value) as unknown;
    return typeof parsed === 'object' && parsed !== null
      ? parsed as Record<string, string[] | number[]>
      : {};
  } catch {
    return {};
  }
}

/** Consecutive weeks (ending now) with at least one deposit. */
export function countStreak(weeks: string[]): number {
  const active = new Set(weeks);
  let streak = 0;
  for (let ago = 0; ago < 520; ago += 1) {
    if (active.has(shiftedWeekKey(ago))) streak += 1;
    else break;
  }
  return streak;
}

export async function loadDepositWeeks(): Promise<Record<string, string[]>> {
  const map = await readMap(STREAK_KEY);
  const weeks: Record<string, string[]> = {};
  for (const [goalId, value] of Object.entries(map)) {
    if (Array.isArray(value)) weeks[goalId] = value.filter((item): item is string => typeof item === 'string');
  }
  return weeks;
}

export async function recordDepositWeek(goalId: string): Promise<Record<string, string[]>> {
  const weeks = await loadDepositWeeks();
  const key = weekKey();
  const current = weeks[goalId] ?? [];
  if (!current.includes(key)) {
    const next = { ...weeks, [goalId]: [...current, key].slice(-104) };
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(next));
    return next;
  }
  return weeks;
}

export async function loadCelebrated(): Promise<Record<string, number[]>> {
  const map = await readMap(MILESTONE_KEY);
  const celebrated: Record<string, number[]> = {};
  for (const [goalId, value] of Object.entries(map)) {
    if (Array.isArray(value)) celebrated[goalId] = value.filter((item): item is number => typeof item === 'number');
  }
  return celebrated;
}

export async function markCelebrated(goalId: string, pct: number): Promise<Record<string, number[]>> {
  const celebrated = await loadCelebrated();
  const current = celebrated[goalId] ?? [];
  if (current.includes(pct)) return celebrated;
  const next = { ...celebrated, [goalId]: [...current, pct] };
  await AsyncStorage.setItem(MILESTONE_KEY, JSON.stringify(next));
  return next;
}
