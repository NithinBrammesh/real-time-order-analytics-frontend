import { FaChartBar } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

export default function Navbar() {

  return (

    <div className="navbar">

      <div className="nav-left">

        <FaChartBar className="nav-icon"/>

        <div>
          <h2 className="nav-title">
            Kafka Orders Dashboard
          </h2>

          <p className="nav-subtitle">
            Real-Time Streaming Analytics
          </p>
        </div>

      </div>

      <div className="nav-center">

        <FaCircle className="live-dot"/>

        <span className="live-text">
          LIVE STREAM ACTIVE
        </span>

      </div>

      <div className="nav-right">

        <input placeholder="Search..." />

        <div className="profile">
          NB
        </div>

      </div>

    </div>
  );
}