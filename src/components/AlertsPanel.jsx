import {
  FaBell,
  FaExclamationTriangle
} from "react-icons/fa";

export default function AlertsPanel({ orders }) {

  // =========================
  // FILTER IMPORTANT ALERTS
  // =========================
  const alerts = orders

    .filter(
      o => o.severity !== "NORMAL"
    )

    .sort(
      (a, b) =>
      b.total_amount - a.total_amount
    )

    .slice(0, 4);

  return (

    <div className="alertsPanel">

      {/* HEADER */}
      <div className="alertsHeader">

        <div className="alertTitle">

          <FaBell className="alertIcon" />

          <h3>Live Alerts</h3>

        </div>

        <span className="activeBadge">
          {alerts.length} Active
        </span>

      </div>

      {/* EMPTY */}
      {

        alerts.length === 0

        ?

        (

          <p className="noAlerts">
            No Critical Activity
          </p>

        )

        :

        (

          alerts.map((alert, index) => (

            <div
              key={index}
              className={`alertCard ${alert.severity}`}
            >

              {/* LEFT */}
              <div className="alertLeft">

                <FaExclamationTriangle
                  className="warningIcon"
                />

                <div>

                  <h4>
                    {alert.city}
                  </h4>

                  <p>
                    {alert.severity} Revenue Spike
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="alertRight">

                <span className="severityBadge">
                  {alert.severity}
                </span>

                <h3>
                  ₹ {alert.total_amount}
                </h3>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}