// Format date to readable format
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


// Check if task deadline is overdue
export const isOverdue = (deadline, completed) => {
  if (!deadline || completed) return false;

  const today = new Date();
  const dueDate = new Date(deadline);

  return dueDate < today;
};


// Calculate task statistics
export const calculateStats = (tasks) => {

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  return {
    total,
    completed,
    pending,
  };
};


// Count tasks by subject
export const getSubjectStats = (tasks) => {

  const subjectCounts = {};

  tasks.forEach((task) => {
    const subject = task.subject || "Other";

    subjectCounts[subject] =
      (subjectCounts[subject] || 0) + 1;
  });

  return subjectCounts;
};


// Sort tasks by deadline
export const sortByDeadline = (tasks) => {

  return [...tasks].sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return new Date(a.deadline) - new Date(b.deadline);
  });

};


// Generate random ID (fallback if needed)
export const generateId = () => {
  return Date.now().toString();
};