import AsyncStorage from '@react-native-async-storage/async-storage';

const SCHEDULES_KEY = 'ausd-wallet-schedules-v1';

export type ScheduleFrequency = 'weekly' | 'monthly';

export interface SaveSchedule {
  id: string;
  goalId: string;
  amount: string;
  frequency: ScheduleFrequency;
  nextDue: string;
  active: boolean;
  createdAt: string;
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function nextOccurrence(from: Date, frequency: ScheduleFrequency): Date {
  const next = new Date(from);
  if (frequency === 'weekly') {
    next.setDate(next.getDate() + 7);
  } else {
    next.setMonth(next.getMonth() + 1);
  }
  return next;
}

/** First due date for a new schedule: one cadence step from today. */
export function firstDueDate(frequency: ScheduleFrequency): Date {
  return nextOccurrence(startOfDay(new Date()), frequency);
}

/** Roll a schedule forward until its due date is in the future. */
export function advanceSchedule(schedule: SaveSchedule, from = new Date()): SaveSchedule {
  let next = new Date(schedule.nextDue);
  for (let guard = 0; guard < 520 && next <= from; guard += 1) {
    next = nextOccurrence(next, schedule.frequency);
  }
  return { ...schedule, nextDue: next.toISOString() };
}

export function isDue(schedule: SaveSchedule, now = new Date()): boolean {
  return schedule.active && new Date(schedule.nextDue) <= now;
}

export function describeSchedule(schedule: SaveSchedule): string {
  const date = new Date(schedule.nextDue);
  const dateLabel = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return `${schedule.frequency === 'weekly' ? 'Weekly' : 'Monthly'} ${schedule.amount} AUSD · ${schedule.active ? `due ${dateLabel}` : 'paused'}`;
}

export async function loadSchedules(): Promise<SaveSchedule[]> {
  try {
    const value = await AsyncStorage.getItem(SCHEDULES_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is SaveSchedule => {
      if (!entry || typeof entry !== 'object') return false;
      const candidate = entry as Partial<SaveSchedule>;
      return typeof candidate.id === 'string'
        && typeof candidate.goalId === 'string'
        && typeof candidate.amount === 'string'
        && (candidate.frequency === 'weekly' || candidate.frequency === 'monthly')
        && typeof candidate.nextDue === 'string'
        && typeof candidate.active === 'boolean';
    });
  } catch {
    return [];
  }
}

export async function saveSchedules(schedules: SaveSchedule[]): Promise<void> {
  await AsyncStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
}

export async function addSchedule(input: Omit<SaveSchedule, 'id' | 'createdAt'>): Promise<SaveSchedule[]> {
  const schedules = await loadSchedules();
  const next: SaveSchedule = {
    ...input,
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [...schedules, next];
  await saveSchedules(updated);
  return updated;
}

export async function updateSchedule(id: string, patch: Partial<SaveSchedule>): Promise<SaveSchedule[]> {
  const schedules = await loadSchedules();
  const updated = schedules.map((item) => (item.id === id ? { ...item, ...patch } : item));
  await saveSchedules(updated);
  return updated;
}

export async function removeSchedule(id: string): Promise<SaveSchedule[]> {
  const schedules = await loadSchedules();
  const updated = schedules.filter((item) => item.id !== id);
  await saveSchedules(updated);
  return updated;
}
