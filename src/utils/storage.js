export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem("favorites");
  if (value) return JSON.parse(value);
};
