export default function OrdersTable({ orders }) {

  return (

    <div className="tableWrapper">

      <table>

        <thead>

          <tr>

            <th>S.No</th>

            <th>City</th>

            <th>Total Amount</th>

            <th>Orders Count</th>

            <th>Average</th>

            <th>Severity</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((o, i) => (

            <tr
              key={o.city}
              className={i < 3 ? "topRow" : ""}
            >

              <td>{i + 1}</td>

              <td>{o.city}</td>

              <td>₹ {o.total_amount}</td>

              <td>{o.count}</td>

              <td>₹ {o.avg}</td>

              <td>
              <span
                className={`badge ${o.severity}`}
              >
                {o.severity}
              </span>

            </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}