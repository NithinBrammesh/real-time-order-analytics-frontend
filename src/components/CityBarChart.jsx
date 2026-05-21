import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CityBarChart({ orders }) {

  const data = [...orders]
  .sort((a, b) => b.avg - a.avg)
    .slice(0, 13)
    .map(o => ({
      city: o.city,
      total_amount: Number(o.total_amount || 0)
    }));

  return (

    <div className="chartCard">

      <h3>Top 13 City Average Comparison</h3>

      <ResponsiveContainer width="100%" height={500}>

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 90
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.3}
          />

          {/* CITY NAMES BELOW */}
          <XAxis
            dataKey="city"
            angle={0}
            textAnchor="end"
            interval={0}
            height={10}
            tick={{ fontSize: 13 }}
          />

          {/* VALUES LEFT */}
          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total_amount"
            fill="#7c3aed"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}