import "./RecentOrders.css";

import { useState } from "react";

export default function RecentOrders({ orders }) {

  // =========================
  // PAGINATION
  // =========================
  const recordsPerPage = 10;

  const [currentPage, setCurrentPage]
    = useState(1);

  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentOrders =
    orders.slice(firstIndex, lastIndex);

  const totalPages =
    Math.ceil(
      orders.length / recordsPerPage
    );

  return (

    <div className="recentOrdersCard">

      {/* HEADER */}
      <div className="recentOrdersHeader">

        <h3>
          Recent Live Orders
        </h3>

        <span className="liveBadge">
          LIVE
        </span>

      </div>

      {/* TABLE */}
      <table className="recentOrdersTable">

        <thead>

          <tr>

            <th>Order</th>

            <th>City</th>

            <th>Amount</th>

            <th>Payment</th>

            <th>Severity</th>

          </tr>

        </thead>

        <tbody>

          {

            currentOrders.map((o, i) => (

              <tr key={i}>

                <td className="orderId">
                  {o.order_id}
                </td>

                <td>
                  {o.city}
                </td>

                <td className="amount">
                  ₹ {o.amount}
                </td>

                <td>
                  {o.payment_method}
                </td>

                <td>

                  <span
                    className={`severityBadge ${o.severity}`}
                  >

                    {o.severity}

                  </span>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

      {/* PAGINATION */}
      <div className="pagination">

        {

          Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                  ? "pageBtn activePage"
                  : "pageBtn"
                }

                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >

                {index + 1}

              </button>

            ))

        }

      </div>

    </div>

  );

}