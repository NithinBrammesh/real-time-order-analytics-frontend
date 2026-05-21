import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CityChart({ orders }) {

  const data = [...orders]
  .sort((a, b) => b.total_amount - a.total_amount)
    .slice(0, 10)
    .map(o => ({
      city: o.city,
      total_amount: Number(o.total_amount || 0)
    }));

  return (

    <div className="chartCard">

      <h3>Top Revenue Cities</h3>

      <ResponsiveContainer width="100%" height={420}>

        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 60
          }}
        >

          <defs>

            <linearGradient
              id="colorUv"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#7c3aed"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#7c3aed"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="2 4"
            opacity={0.3}
          />

          <XAxis
            dataKey="city"
            interval={0}
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="total_amount"
            stroke="#7c3aed"
            fillOpacity={1}
            fill="url(#colorUv)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}