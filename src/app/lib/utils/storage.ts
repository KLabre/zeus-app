import { APP_NAMESPACE, ENV, storageKey } from './storageKey';

// let's keep it pure, so:
// we can use it anywhere
// we can check for typeof window (to ensure availability)
// ensure no side effects
// logic is decoupled fromm the UI
// useful for non-components code.
export const storage = {
  get<T = string>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(storageKey(key));
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(storageKey(key), JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to write ${key} to localStorage`, err);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(storageKey(key));
  },

  clearAll(): void {
    if (typeof window === 'undefined') return;

    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(`${APP_NAMESPACE}:${ENV}:`)) {
        localStorage.removeItem(k);
      }
    });
  },
};
