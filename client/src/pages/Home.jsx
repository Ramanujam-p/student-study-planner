import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

import Header from "../components/Header";
import Footer from "../components/Footer";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatsDashboard from "../components/StatsDashboard";

import API from "../services/api";

import { saveTheme, getTheme } from "../utils/localStorage";

import {
  logoutUser,
  getUser,
  getAllUsers,
  loginUser,
} from "../utils/auth";

const Home = () => {

  const navigate = useNavigate();

  const user = getUser();
  const username = user?.name;

  const [showUsers, setShowUsers] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("All");

  const [subjectFilter, setSubjectFilter] = useState("All");

  const [darkMode, setDarkMode] = useState(
    () => username && getTheme(username) === "dark"
  );

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  useEffect(() => {

    document.body.classList.add("home-page");
    document.body.classList.remove("login-page");

    return () => {
      document.body.classList.remove("home-page");
    };

  }, []);

  // LOAD TASKS FROM MONGODB
  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const res = await API.get("/tasks");

        setTasks(res.data);

      } catch (error) {

        console.error("Error loading tasks");

      }

    };

    fetchTasks();

  }, []);

  useEffect(() => {

    const theme = darkMode ? "dark" : "light";

    saveTheme(username, theme);

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

  }, [darkMode, username]);

  useEffect(() => {

    const handleResize = () => {

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const total = tasks.length;

  const completed = tasks.filter((t) => t.completed).length;

  // ADD TASK (MongoDB)
  const addTask = async (text, subject, deadline) => {

    try {

      const res = await API.post("/tasks", {
        text,
        subject,
        deadline
      });

      setTasks((prev) => [...prev, res.data]);

    } catch (error) {

      console.error("Error adding task");

    }

  };

  // TOGGLE TASK
  const toggleTask = async (id) => {

    try {

      const res = await API.put(`/tasks/${id}`);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? res.data : task
        )
      );

    } catch (error) {

      console.error("Error updating task");

    }

  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

    } catch (error) {

      console.error("Error deleting task");

    }

  };

  const handleLogout = () => {

    logoutUser();
    navigate("/login");

  };

  const users = getAllUsers();

  const switchUser = (selectedUser) => {

    loginUser(selectedUser);
    navigate("/");
    window.location.reload();

  };

  let filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  if (subjectFilter !== "All") {

    filteredTasks = filteredTasks.filter(
      (t) => t.subject === subjectFilter
    );

  }

  return (

    <div className={darkMode ? "container dark" : "container"}>

      {total > 0 && completed === total && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
        />
      )}

      <Header />

      <div className="top-bar">

        <h3>Welcome, {username} 👋</h3>

        <div style={{ display: "flex", gap: "10px" }}>

          <div className="user-dropdown">

            <button
              className="user-switch-btn"
              onClick={() => setShowUsers(!showUsers)}
            >
              Switch User
            </button>

            {showUsers && (

              <div className="user-dropdown-menu">

                {users.map((u) => (

                  <div
                    key={u.name}
                    className="user-option"
                    onClick={() => switchUser(u)}
                  >
                    {u.name}
                  </div>

                ))}

              </div>

            )}

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      <button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <TaskForm addTask={addTask} />

      <StatsDashboard tasks={tasks} />

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>

      </div>

      <select
        className="subject-filter"
        value={subjectFilter}
        onChange={(e) =>
          setSubjectFilter(e.target.value)
        }
      >

        <option value="All">
          All Subjects
        </option>

        <option>
          Linear Algebra and Numerical Methods
        </option>

        <option>DBMS</option>
        <option>CA</option>
        <option>DAA</option>
        <option>Full Stack</option>
        <option>IoT</option>
        <option>Audit Course</option>
        <option>Employability Skills</option>

      </select>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        setTasks={setTasks}
      />

      <Footer />

    </div>

  );

};

export default Home;