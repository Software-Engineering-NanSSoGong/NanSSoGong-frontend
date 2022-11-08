const setLocalStorage = (key: string, data: unknown) => {
  const storedData = JSON.stringify(data);
  window?.localStorage.setItem(key, storedData);
};

const getLocalStorage = (key: string) => {
  return JSON.parse(window?.localStorage.getItem(key) ?? '');
};

const removeLocalStorage = (key: string) => {
  window?.localStorage.removeItem(key);
};

const removeAllLocalStorage = () => {
  window?.localStorage.clear();
};

export default {
  set: setLocalStorage,
  get: getLocalStorage,
  remove: removeLocalStorage,
  removeAll: removeAllLocalStorage,
} as const;
