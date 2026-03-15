import { useState } from "react";

const TaskForm = ({ addTask, subjects }) => {

  const [text,setText] = useState("");
  const [subject,setSubject] = useState("");
  const [deadline,setDeadline] = useState("");
  const [priority,setPriority] = useState("Medium");

  const handleSubmit = (e) => {

    e.preventDefault();

    if(!text || !subject) return;

    addTask(text,subject,deadline,priority);

    setText("");
    setSubject("");
    setDeadline("");
    setPriority("Medium");

  };

  return (

    <form className="task-form" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <select
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
      >

        <option value="">Select Subject</option>

        {subjects.map((s,index)=>(
          <option key={index} value={s}>
            {s}
          </option>
        ))}

      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e)=>setDeadline(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button type="submit">
        Add Task
      </button>

    </form>

  );

};

export default TaskForm;