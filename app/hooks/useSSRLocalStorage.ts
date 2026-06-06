import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { safeJsonParse, safeJsonStringify } from "../utils/helpers";

export function useSSRLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const handleSetValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;

        if (typeof window !== "undefined") {
          const stringifiedValue = safeJsonStringify(valueToStore);
          // Storage access can throw QuotaExceededError if storage is full
          window.localStorage.setItem(key, stringifiedValue);
        }

        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    try {
      // Storage access can throw SecurityError in strict privacy modes
      const item = window.localStorage.getItem(key);
      if (item) {
        // Let React finish hydrating the UI before updating
        setTimeout(() => {
          setStoredValue(safeJsonParse<T>(item) as T);
        }, 10);
      }
    } catch (error) {
      console.warn(`Error accessing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, handleSetValue];
}
