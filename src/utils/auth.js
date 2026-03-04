export const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  const users = getAllUsers();

  const exists = users.find((u) => u.name === user.name);

  if (!exists) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
};
export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getAllUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};