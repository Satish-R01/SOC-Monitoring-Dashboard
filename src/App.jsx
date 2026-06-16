import { useEffect, useState } from "react";
import "./App.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function App() {
  const [threats, setThreats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [time, setTime] = useState(new Date());

  const loadData = () => {
    fetch("http://127.0.0.1:8000/threats")
      .then((res) => res.json())
      .then((data) => setThreats(data));

    fetch("http://127.0.0.1:8000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data));
  };

  useEffect(() => {
    loadData();

    const refreshInterval = setInterval(loadData, 10000);

    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const chartData = threats
    ? [
        { severity: "Critical", count: threats.critical },
        { severity: "High", count: threats.high },
        { severity: "Medium", count: threats.medium },
        { severity: "Low", count: threats.low },
      ]
    : [];

  return (
    <div className="dashboard">
      <h1 className="title">🛡️ Cyber Security Dashboard</h1>

      <div className="status-bar">
        <div>🟢 Status: ONLINE</div>
        <div>⏰ {time.toLocaleTimeString()}</div>
        <div>🚨 Total Alerts: {alerts.length}</div>
      </div>

      {threats && (
        <div className="cards">
          <div className="card critical">
            <h3>Critical</h3>
            <p>{threats.critical}</p>
          </div>

          <div className="card high">
            <h3>High</h3>
            <p>{threats.high}</p>
          </div>

          <div className="card medium">
            <h3>Medium</h3>
            <p>{threats.medium}</p>
          </div>

          <div className="card low">
            <h3>Low</h3>
            <p>{threats.low}</p>
          </div>
        </div>
      )}

      <div className="chart-container">
        <h2>📊 Threat Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="severity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="alerts">
        <h2>🚨 Recent Security Alerts</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Alert</th>
              <th>Severity</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.alert}</td>
                <td>{alert.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>
        Built with React + FastAPI | Satish R
      </footer>
    </div>
  );
}

export default App;
