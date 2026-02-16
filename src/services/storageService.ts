import { getDb } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { Entry, Schema, Preferences } from '../utils/types';

const COLLECTION = 'worklog';

function localGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`worklog:${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function localSet(key: string, data: unknown) {
  try { localStorage.setItem(`worklog:${key}`, JSON.stringify(data)); }
  catch (err) { console.error('localStorage write failed:', err); }
}

async function fbGet<T>(key: string): Promise<T | null> {
  const db = getDb();
  if (!db) return localGet<T>(key);
  try {
    const snap = await getDoc(doc(db, COLLECTION, key));
    return snap.exists() ? (snap.data().value as T) : null;
  } catch (err) {
    console.error(`Firebase read [${key}] failed:`, err);
    return localGet<T>(key);
  }
}

async function fbSet(key: string, data: unknown) {
  localSet(key, data);
  const db = getDb();
  if (!db) { console.warn(`[Storage] No Firebase DB — wrote "${key}" to localStorage only`); return; }
  try {
    await setDoc(doc(db, COLLECTION, key), { value: data, updatedAt: new Date().toISOString() });
    console.log(`[Firebase] Wrote "${key}" to Firestore`);
  } catch (err) {
    console.error(`[Firebase] Write "${key}" FAILED:`, err);
  }
}

export const getEntries = () => fbGet<Entry[]>('entries').then((r) => r ?? []);
export const setEntries = (entries: Entry[]) => fbSet('entries', entries);
export const getSchema = () => fbGet<Schema>('schema');
export const setSchema = (schema: Schema) => fbSet('schema', schema);
export const getPreferences = () => fbGet<Preferences>('preferences');
export const setPreferences = (prefs: Preferences) => fbSet('preferences', prefs);

export async function loadAll() {
  const [entries, schema, preferences] = await Promise.all([getEntries(), getSchema(), getPreferences()]);
  return { entries, schema, preferences };
}

export async function clearAllData() {
  await Promise.all([fbSet('entries', []), fbSet('preferences', null)]);
}
