// SAVE USER
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// GET USER
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// SAVE TOKEN
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// MULTI USER SUPPORT
export const getAllUsers = () => {
  const users = localStorage.getItem("allUsers");
  return users ? JSON.parse(users) : [];
};

export const loginUser = (user) => {
  setUser(user);
};