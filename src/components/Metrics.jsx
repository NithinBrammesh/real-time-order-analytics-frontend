export default function Metrics({ metrics }) {

  return (

    <div className="metrics">

      <div className="metricCard">
        <h4>Total Orders</h4>
        <h2>
          {metrics.total_orders || 0}
        </h2>
      </div>

      <div className="metricCard">
        <h4>Total Revenue</h4>
        <h2>
          ₹ {metrics.total_revenue || 0}
        </h2>
      </div>

      <div className="metricCard">
        <h4>Average Order</h4>
        <h2>
          ₹ {metrics.average_order || 0}
        </h2>
      </div>

      <div className="metricCard">
        <h4>High Orders</h4>
        <h2>
          {metrics.high_orders || 0}
        </h2>
      </div>

      <div className="metricCard">
        <h4>Critical Orders</h4>
        <h2>
          {metrics.critical_orders || 0}
        </h2>
      </div>

      <div className="metricCard">
        <h4>Total Cities</h4>
        <h2>
          {metrics.total_cities || 0}
        </h2>
      </div>

    </div>

  );

}