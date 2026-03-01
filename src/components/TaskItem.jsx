import { motion } from "framer-motion";

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  const isOverdue =
    task.deadline &&
    !task.completed &&
    new Date(task.deadline) < new Date();

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
        onClick={() => toggleTask(task.id)}
      >
        <h3 className={task.completed ? "completed" : ""}>
          {task.text}
        </h3>

        <p className="subject">📘 {task.subject}</p>

        {task.deadline && (
          <p className={isOverdue ? "deadline overdue" : "deadline"}>
            📅 {task.deadline}
          </p>
        )}
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        ❌
      </button>
    </motion.li>
  );
};

export default TaskItem;