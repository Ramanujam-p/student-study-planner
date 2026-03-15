import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatsDashboard from "../components/StatsDashboard";

import API from "../services/api";

import { saveTheme, getTheme } from "../utils/localStorage";
import { logoutUser, getUser } from "../utils/auth";

const Home = () => {

  const navigate = useNavigate();

  const user = getUser();
  const username = user?.name;

  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [filter, setFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(
    () => username && getTheme(username) === "dark"
  );

  const [showConfetti, setShowConfetti] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  useEffect(() => {

    document.body.classList.add("home-page");
    document.body.classList.remove("login-page");

    return () => {
      document.body.classList.remove("home-page");
    };

  }, []);

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const res = await API.get("/tasks");
        setTasks(res.data);

      } catch (err) {

        console.error("Error loading tasks");

      }

    };

    fetchTasks();

  }, []);

  useEffect(() => {

    const fetchSubjects = async () => {

      try {

        const res = await API.get("/subjects");

        const subjectNames = res.data.map(s => s.name);

        setSubjects(subjectNames);

      } catch (err) {

        console.error("Error loading subjects");

      }

    };

    fetchSubjects();

  }, []);

  useEffect(() => {

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    if (total > 0 && total === completed) {

      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

    }

  }, [tasks]);

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
        height: window.innerHeight
      });

    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const addTask = async (text, subject, deadline, priority) => {

    try {

      const res = await API.post("/tasks", {
        text,
        subject,
        deadline,
        priority
      });

      setTasks(prev => [...prev, res.data]);

    } catch (err) {

      console.error("Error adding task");

    }

  };

  const toggleTask = async (id) => {

    try {

      const res = await API.put(`/tasks/${id}`, {
        toggleCompleted: true
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === id ? res.data : task
        )
      );

    } catch (err) {

      console.error("Error updating task");

    }

  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      setTasks(prev =>
        prev.filter(task => task._id !== id)
      );

    } catch (err) {

      console.error("Error deleting task");

    }

  };

  const editTask = async (id, newText) => {

    try {

      const res = await API.put(`/tasks/${id}`, {
        text: newText
      });

      setTasks(prev =>
        prev.map(task =>
          task._id === id ? res.data : task
        )
      );

    } catch (err) {

      console.error("Error editing task");

    }

  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  let filteredTasks = tasks;

  if (filter === "Completed") {
    filteredTasks = filteredTasks.filter(t => t.completed);
  }

  if (filter === "Pending") {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  }

  if (subjectFilter !== "All") {
    filteredTasks = filteredTasks.filter(
      t => t.subject === subjectFilter
    );
  }

  if (search) {
    filteredTasks = filteredTasks.filter(task =>
      task.text.toLowerCase().includes(
        search.toLowerCase()
      )
    );
  }

  return (

    <div className={darkMode ? "container dark" : "container"}>

      <MainNavbar />

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
        />
      )}

      <div className="top-bar">

        <div className="welcome-section">
          <h1>Welcome, {username} 👋</h1>
          <p className="streak-text">
            🔥 Study Streak: {user?.streak || 0} days
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <button
        className="dark-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <TaskForm addTask={addTask} subjects={subjects} />

      <StatsDashboard tasks={tasks} />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "100%"
        }}
      />

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>All</button>

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
        onChange={(e) => setSubjectFilter(e.target.value)}
      >

        <option value="All">All Subjects</option>

        {subjects.map((subject, index) => (
          <option key={index}>
            {subject}
          </option>
        ))}

      </select>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        setTasks={setTasks}
      />

      <Footer />

      {showTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}

    </div>

  );

};

export default Home;