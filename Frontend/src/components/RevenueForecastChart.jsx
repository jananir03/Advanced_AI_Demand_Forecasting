import {

  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line

} from "recharts";

function RevenueForecastChart({ data }) {

  return (

    <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/30 h-[550px]">

      <h2 className="text-3xl font-bold text-slate-800 mb-6">

        Future Revenue Prediction

      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="revenueColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#16a34a"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#16a34a"
                stopOpacity={0.1}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="future_day" />

          <YAxis
            domain={["auto", "auto"]}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="predicted_revenue"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#revenueColor)"
            strokeWidth={4}
          />

          <Line
            type="monotone"
            dataKey="predicted_revenue"
            stroke="#15803d"
            strokeWidth={4}
            dot={{ r: 6 }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueForecastChart;