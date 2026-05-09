const LATEST_RESULT_KEY = "dropikart-latest-result";
const HISTORY_KEY = "dropikart-history";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readJson = (key, fallbackValue) => {
  if (!canUseStorage()) return fallbackValue;

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
};

const writeJson = (key, value) => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLatestResult = () => readJson(LATEST_RESULT_KEY, null);

export const saveLatestResult = (result) => {
  writeJson(LATEST_RESULT_KEY, result);
};

export const getHistory = () => {
  const history = readJson(HISTORY_KEY, []);

  return Array.isArray(history) ? history : [];
};

export const isResultSaved = (resultId) =>
  getHistory().some((item) => item.id === resultId);

export const saveResultToHistory = (result) => {
  const nextHistory = getHistory().filter((item) => item.id !== result.id);

  nextHistory.unshift(result);
  writeJson(HISTORY_KEY, nextHistory);

  return nextHistory;
};

export const deleteHistoryItem = (resultId) => {
  const nextHistory = getHistory().filter((item) => item.id !== resultId);

  writeJson(HISTORY_KEY, nextHistory);

  return nextHistory;
};
