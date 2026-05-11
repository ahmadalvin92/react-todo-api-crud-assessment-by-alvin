export function getStorageData(key, fallbackValue = []) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function setStorageData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
