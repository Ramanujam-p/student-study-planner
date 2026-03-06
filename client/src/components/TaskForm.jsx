import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("Linear Algebra and Numerical Methods");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask(text, subject, deadline);
    setText("");
    setDeadline("");
    setSubject("Linear Algebra and Numerical Methods");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter study task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option>Linear Algebra and Numerical Methods</option>
        <option>DBMS</option>
        <option>CA</option>
        <option>DAA</option>
        <option>Full Stack</option>
        <option>IoT</option>
        <option>Audit Course</option>
        <option>Employability Skills</option>
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;