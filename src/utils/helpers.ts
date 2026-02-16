import type { Entry } from './types';

export function generateId(): string {
  return `entry_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

export function isInDateRange(dateStr: string, range: string): boolean {
  if (range === 'all') return true;
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  switch (range) {
    case 'week': { const { start, end } = getWeekRange(); return date >= start && date <= end; }
    case 'month': { return date >= new Date(now.getFullYear(), now.getMonth(), 1) && date <= now; }
    case '30days': { const d = new Date(now); d.setDate(now.getDate() - 30); return date >= d && date <= now; }
    case '90days': { const d = new Date(now); d.setDate(now.getDate() - 90); return date >= d && date <= now; }
    default: return true;
  }
}

export function getDayNumber(entries: Entry[], todayStr: string): number {
  const distinctDates = new Set(entries.map((e) => e.date));
  if (distinctDates.has(todayStr)) {
    const sorted = [...distinctDates].sort();
    return sorted.indexOf(todayStr) + 1;
  }
  return distinctDates.size + 1;
}

export function groupBy<T>(arr: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : String(item[key]);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function countBy<T>(arr: T[], key: keyof T | ((item: T) => string)): { name: string; count: number }[] {
  const groups = groupBy(arr, key);
  return Object.entries(groups)
    .map(([name, items]) => ({ name, count: items.length }))
    .sort((a, b) => b.count - a.count);
}

export function entriesToCSV(entries: Entry[]): string {
  const headers = ['date', 'dayNumber', 'project', 'categories', 'title', 'description', 'technologies', 'teamType', 'createdAt'];
  const escape = (val: unknown) => {
    const str = String(val ?? '');
    return (str.includes(',') || str.includes('"') || str.includes('\n')) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const rows = entries.map((e) => [
    e.date, e.dayNumber, e.project,
    (e.categories || []).join('; '),
    e.title, e.description || '',
    (e.technologies || []).map((t) => `${t.tech}${t.subTechs?.length ? ` (${t.subTechs.join(', ')})` : ''}`).join(' | '),
    e.teamType, e.createdAt,
  ]);

  return [headers.join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n');
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function findSimilar(input: string, existing: string[]): string | null {
  const lower = input.toLowerCase();
  for (const item of existing) {
    const itemLower = item.toLowerCase();
    // Exact match (case-insensitive)
    if (itemLower === lower) return item;
    // One contains the other
    if (itemLower.includes(lower) || lower.includes(itemLower)) return item;
    // Levenshtein distance <= 2 for short strings
    if (levenshtein(lower, itemLower) <= 2 && Math.min(lower.length, itemLower.length) > 2) return item;
  }
  return null;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export function downloadFile(content: string, filename: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
