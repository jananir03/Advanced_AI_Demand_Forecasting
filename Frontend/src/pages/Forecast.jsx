import { useState } from "react";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import FutureForecastChart
from "../components/FutureForecastChart";

import RevenueForecastChart
from "../components/RevenueForecastChart";

import API from "../services/api";

function Forecast() {

  const [forecastData, setForecastData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchForecast = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        "/forecast/predict"
      );

      console.log(response.data);

      setForecastData(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Forecast generation failed");

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        {/* Header */}
        <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

          <h1 className="text-4xl font-bold text-slate-800">

            AI Product Demand Forecasting

          </h1>

          <p className="text-slate-700 mt-4 text-lg">

            Analyze future sales and revenue predictions.

          </p>

          <button
            onClick={fetchForecast}
            className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
          >
            Generate Forecast
          </button>

        </div>

        {/* Loading */}
        {loading && (

          <div className="mt-8 text-xl font-bold text-slate-800">

            Generating Forecast...

          </div>

        )}

        {/* Forecast UI */}
        {forecastData && (

          <>

            {/* KPI Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-blue-600/40 rounded-3xl p-6 text-white shadow-2xl backdrop-blur-lg">

                <h2 className="text-xl font-medium">

                  Total Products

                </h2>

                <h1 className="text-5xl font-bold mt-4">

                  {forecastData?.top_products?.length || 0}

                </h1>

              </div>

              <div className="bg-green-600/40 rounded-3xl p-6 text-white shadow-2xl backdrop-blur-lg">

                <h2 className="text-xl font-medium">

                  Top Product Sales

                </h2>

                <h1 className="text-5xl font-bold mt-4">

                  {

                    forecastData
                      ?.top_products?.[0]
                      ?.total_sales || 0

                  }

                </h1>

              </div>

              <div className="bg-purple-600/40 rounded-3xl p-6 text-white shadow-2xl backdrop-blur-lg">

                <h2 className="text-xl font-medium">

                  Forecast Model

                </h2>

                <h1 className="text-3xl font-bold mt-6">

                  Linear Regression

                </h1>

              </div>

            </div>

            {/* Future Sales Prediction */}

            <div className="mt-10">

              <FutureForecastChart

                data={

                  forecastData?.forecast_predictions || []

                }

              />

            </div>

            {/* Revenue Forecast Chart */}

            <div className="mt-10">

              <RevenueForecastChart

                data={

                  forecastData?.revenue_predictions || []

                }

              />

            </div>

            {/* Top Selling Products */}

            <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30 h-[550px]">

              <h2 className="text-3xl font-bold text-slate-800 mb-8">

                Top Selling Products

              </h2>

              <ResponsiveContainer
                width="100%"
                height={400}
              >

                <BarChart
                  data={
                    forecastData?.top_products || []
                  }
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="product" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="total_sales"
                    fill="#2563eb"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Forecast;