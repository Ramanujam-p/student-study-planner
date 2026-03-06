import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const subjectColors = {
  "Linear Algebra and Numerical Methods": "#6366f1",
  DBMS: "#10b981",
  CA: "#f59e0b",
  DAA: "#ef4444",
  "Full Stack": "#8b5cf6",
  IoT: "#06b6d4",
  "Audit Course": "#ec4899",
  "Employability Skills": "#22c55e",
};

const StatsDashboard = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const subjectCounts = {};
  tasks.forEach((task) => {
    subjectCounts[task.subject] =
      (subjectCounts[task.subject] || 0) + 1;
  });

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>

      <div className="chart-card">
        <Pie data={pieData} />
      </div>

      <div className="subject-stats">
        <h3>Subject Statistics</h3>
        {Object.keys(subjectCounts).map((sub) => (
          <div key={sub} className="subject-row">
            <span
              className="color-tag"
              style={{ background: subjectColors[sub] }}
            ></span>
            {sub} - {subjectCounts[sub]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDashboard;