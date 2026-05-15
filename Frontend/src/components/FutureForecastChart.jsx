import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart

} from "recharts";

function FutureForecastChart({ data }) {

  return (

    <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/30 h-[550px]">

      <h2 className="text-3xl font-bold text-slate-800 mb-6">

        Future Sales Prediction

      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="salesColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
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
            dataKey="predicted_sales"
            stroke="#2563eb"
            fillOpacity={1}
            fill="url(#salesColor)"
            strokeWidth={4}
          />

          <Line
            type="monotone"
            dataKey="predicted_sales"
            stroke="#1d4ed8"
            strokeWidth={4}
            dot={{ r: 6 }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default FutureForecastChart;