import dayjs from 'dayjs';

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
export function memoize<T extends (...args: any[]) => Promise<any>>(
  func: T,
  expirationTime?: number
): T {
  const cache = new Map<string, { value: any; expiration?: number }>();

  return async function (...args: any[]): Promise<any> {
    const key = JSON.stringify(args);
    const now = Date.now();

    const exist = cache.get(key);
    if (exist) {
      const { value, expiration } = exist;
      if (!expiration || now < expiration) {
        return value;
      } else {
        cache.delete(key);
      }
    }

    try {
      const result = await func(...args);
      cache.set(key, {
        value: result,
        expiration: !expirationTime ? undefined : now + expirationTime,
      });
      return result;
    } catch (e) {
      cache.delete(key);
      throw e;
    }
  } as T;
}

export function getRandomItem<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function getRandomItems<T>(items: T[], n: number): T[] {
  const shuffled = items.slice(); // Create a shallow copy of the original array
  let i = items.length;
  let temp;
  let index;

  while (i--) {
    index = Math.floor((i + 1) * Math.random()); // Generate random index
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, n); // Return the first n elements
}
