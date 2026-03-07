export const saveTheme = (username, theme) => {

  localStorage.setItem(
    `theme_${username}`,
    theme
  );

};

export const getTheme = (username) => {

  return (
    localStorage.getItem(`theme_${username}`) || "light"
  );

};