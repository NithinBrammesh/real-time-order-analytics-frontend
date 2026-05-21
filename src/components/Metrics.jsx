export default function Metrics({ orders }) {

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total_amount || 0),
    0
  );

  const totalOrders = orders.reduce(
    (sum, o) => sum + Number(o.count || 0),
    0
  );

  const avg = totalOrders
    ? (totalRevenue / totalOrders).toFixed(0)
    : 0;

  const topCity = orders[0]?.city || "-";

  const cityCount = orders.length;

  return (

    <div className="metrics">

      <div className="metricCard">
        <h4>Total Orders</h4>
        <h2>{totalOrders}</h2>
      </div>

      <div className="metricCard">
        <h4>Total Revenue</h4>
        <h2>₹ {totalRevenue}</h2>
      </div>

      <div className="metricCard">
        <h4>Average Order</h4>
        <h2>₹ {avg}</h2>
      </div>

      <div className="metricCard">
        <h4>Top Revenue City</h4>
        <h2>{topCity}</h2>
      </div>

      <div className="metricCard">
        <h4>Total Cities</h4>
        <h2>{cityCount}</h2>
      </div>

    </div>
  );
}