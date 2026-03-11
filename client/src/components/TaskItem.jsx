import { motion } from "framer-motion";

const TaskItem = ({ task, toggleTask, deleteTask }) => {

  const isOverdue =
    task.deadline &&
    !task.completed &&
    new Date(task.deadline) < new Date();

  const formattedDate = task.deadline
    ? new Date(task.deadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : null;

  return (
    <motion.li
      className="task-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="task-content"
        onClick={() => toggleTask(task._id)}
      >
        <h3 className={task.completed ? "completed" : ""}>
          {task.text}
        </h3>

        <p className="subject">
          📘 {task.subject}
        </p>

        {formattedDate && (
          <p className={isOverdue ? "deadline overdue" : "deadline"}>
            📅 {formattedDate}
          </p>
        )}
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task._id)}
      >
        ❌
      </button>
    </motion.li>
  );
};

export default TaskItem;