export const getTasks = async () => {
  const res = await fetch("http://localhost:5000/api/tasks");
  return res.json();
};

export const addTask = async (text) => {
  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  return res.json();
};