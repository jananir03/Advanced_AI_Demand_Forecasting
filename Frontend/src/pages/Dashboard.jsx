import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import SalesChart from "../components/SalesChart";


function Dashboard() {

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900">

      
      <Sidebar />

      
      <div className="flex-1 p-6">

        
        <Navbar />

        
        <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

          <h2 className="text-4xl font-bold text-slate-100">

            AI Demand Forecasting Dashboard

          </h2>

          <p className="text-slate-700 mt-4 text-lg">

            Monitor sales analytics, forecasting trends, and business insights.

          </p>

        </div>

        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            title="Total Sales"
            value="$25,400"
            color="bg-blue-600/40"
          />

          <DashboardCard
            title="Products"
            value="120"
            color="bg-purple-600/40"
          />

          <DashboardCard
            title="Forecast Accuracy"
            value="92%"
            color="bg-green-600/40"
          />

          <DashboardCard
            title="Revenue Growth"
            value="+18%"
            color="bg-pink-600/40"
          />

        </div>

        {/* Charts Section */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <SalesChart />

        

        </div>

      </div>

    </div>
  );
}

export default Dashboard;