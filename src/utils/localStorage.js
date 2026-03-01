export const getTasks = (username) => {
  const data = localStorage.getItem(`tasks_${username}`);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

export const saveTheme = (username, theme) => {
  localStorage.setItem(`theme_${username}`, theme);
};

export const getTheme = (username) => {
  return localStorage.getItem(`theme_${username}`) || "light";
};