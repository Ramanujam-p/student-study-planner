import { useState } from "react";

const TaskItem = ({ task, toggleTask, deleteTask, editTask }) => {

  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const today = new Date();

  const deadlineDate = task.deadline
    ? new Date(task.deadline)
    : null;

  const isOverdue =
    task.deadline &&
    !task.completed &&
    deadlineDate < today;

  const formatDate = (date) => {

    if (!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

  };

  const handleSave = () => {

    if (!newText.trim()) return;

    editTask(task._id, newText);

    setEditing(false);

  };

  const handleCancel = () => {

    setNewText(task.text);

    setEditing(false);

  };

  return (

    <li className="task-card">

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        {/* CHECKBOX */}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
        />

        <div className="task-content">

          {editing ? (

            <input
              value={newText}
              autoFocus
              onChange={(e) => setNewText(e.target.value)}
            />

          ) : (

            <div>

              <h3 className={task.completed ? "completed" : ""}>
                {task.text}
              </h3>

              <p className="subject">
                📘 {task.subject}
              </p>

              {task.priority && (
                <p>
                  Priority: {task.priority}
                </p>
              )}

              {task.deadline && (
                <p className={isOverdue ? "overdue" : "deadline"}>
                  📅 {formatDate(task.deadline)}
                </p>
              )}

            </div>

          )}

        </div>

      </div>

      <div className="task-actions">

        {editing ? (

          <>
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="edit-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>

        ) : (

          <button
            className="edit-btn"
            onClick={() => setEditing(true)}
          >
            ✏️
          </button>

        )}

        <button
          className="delete-btn"
          onClick={() => deleteTask(task._id)}
        >
          ❌
        </button>

      </div>

    </li>

  );

};

export default TaskItem;