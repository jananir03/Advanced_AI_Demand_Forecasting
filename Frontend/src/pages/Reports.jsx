import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function Reports() {

  const [reportData, setReportData] =
    useState(null);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const response = await API.get(
        "/forecast/predict"
      );

      setReportData(response.data);

    } catch (error) {

      console.log(error);

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

            Forecast Reports

          </h1>

          <p className="text-slate-700 mt-4 text-lg">

            View sales forecasts, revenue analytics, and downloadable reports.

          </p>

        </div>

        {reportData && (

          <>

            {/* KPI Cards */}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-blue-600/40 rounded-3xl p-6 text-white shadow-2xl">

                <h2 className="text-xl">

                  Total Products

                </h2>

                <h1 className="text-5xl font-bold mt-4">

                  {

                    reportData?.top_products
                      ?.length || 0

                  }

                </h1>

              </div>

              <div className="bg-green-600/40 rounded-3xl p-6 text-white shadow-2xl">

                <h2 className="text-xl">

                  Revenue Forecast Days

                </h2>

                <h1 className="text-5xl font-bold mt-4">

                  {

                    reportData
                      ?.revenue_predictions
                      ?.length || 0

                  }

                </h1>

              </div>

              <div className="bg-purple-600/40 rounded-3xl p-6 text-white shadow-2xl">

                <h2 className="text-xl">

                  Sales Forecast Days

                </h2>

                <h1 className="text-5xl font-bold mt-4">

                  {

                    reportData
                      ?.forecast_predictions
                      ?.length || 0

                  }

                </h1>

              </div>

            </div>

            {/* Revenue Forecast Table */}

            <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-6">

                Revenue Forecast Report

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="text-slate-800 text-lg border-b border-white/30">

                      <th className="py-4">

                        Future Day

                      </th>

                      <th className="py-4">

                        Predicted Revenue

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      reportData
                        ?.revenue_predictions
                        ?.map((item, index) => (

                          <tr
                            key={index}
                            className="border-b border-white/10 text-white"
                          >

                            <td className="py-4">

                              {item.future_day}

                            </td>

                            <td className="py-4">

                              ₹ {item.predicted_revenue}

                            </td>

                          </tr>

                        ))

                    }

                  </tbody>

                </table>

              </div>

            </div>

            {/* Sales Forecast Table */}

            <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-6">

                Sales Forecast Report

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="text-slate-800 text-lg border-b border-white/30">

                      <th className="py-4">

                        Future Day

                      </th>

                      <th className="py-4">

                        Predicted Sales

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      reportData
                        ?.forecast_predictions
                        ?.map((item, index) => (

                          <tr
                            key={index}
                            className="border-b border-white/10 text-white"
                          >

                            <td className="py-4">

                              {item.future_day}

                            </td>

                            <td className="py-4">

                              {item.predicted_sales}

                            </td>

                          </tr>

                        ))

                    }

                  </tbody>

                </table>

              </div>

            </div>

            {/* Top Products Table */}

            <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">

              <h2 className="text-3xl font-bold text-slate-800 mb-6">

                Top Selling Products

              </h2>

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="text-slate-800 text-lg border-b border-white/30">

                      <th className="py-4">

                        Product

                      </th>

                      <th className="py-4">

                        Total Sales

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      reportData
                        ?.top_products
                        ?.map((item, index) => (

                          <tr
                            key={index}
                            className="border-b border-white/10 text-white"
                          >

                            <td className="py-4">

                              {item.product}

                            </td>

                            <td className="py-4">

                              {item.total_sales}

                            </td>

                          </tr>

                        ))

                    }

                  </tbody>

                </table>

              </div>

            </div>

            {/* Export Buttons */}

            <div className="mt-10 flex flex-wrap gap-6">

              <a
                href="http://127.0.0.1:8000/report/pdf"
                target="_blank"
                rel="noreferrer"
              >

                <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl text-lg font-semibold">

                  Download PDF

                </button>

              </a>

              <a
                href="http://127.0.0.1:8000/report/excel"
                target="_blank"
                rel="noreferrer"
              >

                <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-lg font-semibold">

                  Download Excel

                </button>

              </a>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Reports;