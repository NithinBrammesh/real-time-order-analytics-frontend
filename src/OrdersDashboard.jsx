import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import FilterBar from "./components/FilterBar";
import OrdersTable from "./components/OrdersTable";
import CityChart from "./components/CityChart";
import Navbar from "./components/Navbar";
import Metrics from "./components/Metrics";
import CityBarChart from "./components/CityBarChart";
import AlertsPanel from "./components/AlertsPanel";
import RecentOrders from "./components/RecentOrders";
import API_BASE_URL from "./config";

export default function OrdersDashboard() {

  // =========================
  // STATE
  // =========================
  const [orders, setOrders] = useState([]);

  const [city, setCity] = useState("");

  const [name, setName] = useState("");

  const [limit, setLimit] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState("");

  const [recentOrders, setRecentOrders] = useState([]);

  const [metrics, setMetrics] = useState({});

  // =========================
  // LOAD DATA FROM API
  // =========================
  useEffect(() => {

    const loadData = () => {

      fetch(`${API_BASE_URL}/alerts`)

        .then(res => res.json())

        .then(data => {

          // API SUCCESS
          setOrders(data.alerts || []);

          // UPDATE TIME
          setLastUpdated(
            new Date().toLocaleTimeString()
          );

          // CLEAR ERROR
          setError("");

          setLoading(false);

        })

        .catch(err => {

          console.error(err);

          setError("Failed to load dashboard");

          setLoading(false);

        });

        fetch(`${API_BASE_URL}/metrics`)

        .then(res => res.json())

        .then(data => {

          setMetrics(
            data.metrics || {}
          );

        });

        fetch(`${API_BASE_URL}/recent-orders`)

        .then(res => res.json())

        .then(data => {

          setRecentOrders(
            data.orders || []
          );

        });

    };

    // FIRST LOAD
    loadData();

    // =========================
// SOCKET CONNECTION
// =========================
const socket = io(API_BASE_URL);

// LIVE ALERT LISTENER
socket.on(
  "new_alert",
  (data) => {

    console.log(
      "🚨 LIVE ALERT:",
      data
    );

    // UPDATE RECENT ORDERS
    setRecentOrders(prev => {

      const exists = prev.find(
        o => o.order_id === data.order_id
      );

      if (exists) {
        return prev;
      }

       return [

        data,

        ...prev

      ].slice(0, 50);

      

    });

    // UPDATE LAST UPDATED
    setLastUpdated(
      new Date().toLocaleTimeString()
    );

  }
);
    // AUTO REFRESH EVERY 3 SEC
    const interval = setInterval(
      loadData,
      3000
    );

    // CLEANUP
    return () => {

    clearInterval(interval);

    socket.disconnect();

  };

  }, []);

  // =========================
  // FILTER + SORT + LIMIT
  // =========================
  const filteredOrders = orders

   .filter(o =>
      o.city &&
      o.city !== "UNKNOWN" &&

      (
        !city ||

        o.city
          .toUpperCase()
          .includes(city.toUpperCase())
      )

    )

    .sort(
      (a, b) =>
        b.total_amount - a.total_amount
    )

    .slice(
      0,
      limit
        ? Number(limit)
        : orders.length
    );

  // =========================
  // LOADING UI
  // =========================
  if (loading) {

    return (
      <h2 className="loading">
        Loading Dashboard...
      </h2>
    );

  }

  // =========================
  // ERROR UI
  // =========================
  if (error) {

    return (
      <h2 className="error">
        {error}
      </h2>
    );

  }

  // =========================
  // MAIN UI
  // =========================
  return (

    <div className="dashboard">

      <Navbar />

      {/* LIVE STATUS */}
      <div className="liveStatus">

        <div className="liveDot"></div>

        <p>
          Live Data Active
        </p>

        <span>
          Last Updated:
          {" "}
          {lastUpdated}
        </span>

      </div>

      {/* METRICS */}
      <Metrics metrics={metrics} />

      <AlertsPanel
      orders={filteredOrders}
      />


      {/* CHARTS */}
      <div className="chartsColumn">

        <CityChart
          orders={filteredOrders}
        />

        <CityBarChart
          orders={filteredOrders}
        />

        <RecentOrders
  orders={recentOrders}
/>

      </div>

      {/* TITLE */}
      <h2 className="title">
        Real-Time Orders Dashboard
      </h2>
      <br />

      {/* FILTERS */}
     <FilterBar
      city={city}
      setCity={setCity}

      name={name}
      setName={setName}

      limit={limit}
      setLimit={setLimit}
      />

      {/* TABLE */}
      <OrdersTable
        orders={filteredOrders}
      />

    </div>

  );

}