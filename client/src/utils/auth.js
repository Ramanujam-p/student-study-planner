// Save user after login
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Save JWT token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Get current logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// ------------------------------
// Added functions (for Home.jsx)
// ------------------------------

// Login user (used by old UI logic)
export const loginUser = (user) => {

  localStorage.setItem("user", JSON.stringify(user));

  const users = getAllUsers();

  const exists = users.find((u) => u.name === user.name);

  if (!exists) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

};

// Get all saved users (for switch user dropdown)
export const getAllUsers = () => {

  const users = localStorage.getItem("users");

  return users ? JSON.parse(users) : [];

};