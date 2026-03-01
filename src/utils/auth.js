// 🔐 Save logged-in user
export const loginUser = (user) => {
  // Save current active user
  localStorage.setItem("user", JSON.stringify(user));

  // Maintain users list for switch dropdown
  const users = getAllUsers();

  const exists = users.find((u) => u.name === user.name);

  if (!exists) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

// 🚪 Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// 📦 Get current logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 👥 Get all users (for switch dropdown)
export const getAllUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};