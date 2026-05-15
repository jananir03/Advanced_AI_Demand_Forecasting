import {

  LayoutDashboard,
  Upload,
  LineChart,
  FileText,
  LogOut

} from "lucide-react";

import {

  Link,
  useNavigate

} from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "username"
    );

    navigate("/");
  };

  return (

    <div className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl p-6 flex flex-col justify-between">

      {/* Top Section */}

      <div>

        <h1 className="text-3xl font-bold text-white mb-12">

          AI Forecast

        </h1>

        <div className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            className="flex items-center gap-4 text-white hover:bg-white/20 px-5 py-4 rounded-2xl transition text-lg font-medium"
          >

            <LayoutDashboard size={24} />

            Dashboard

          </Link>

          <Link
            to="/upload"
            className="flex items-center gap-4 text-white hover:bg-white/20 px-5 py-4 rounded-2xl transition text-lg font-medium"
          >

            <Upload size={24} />

            Upload Dataset

          </Link>

          <Link
            to="/forecast"
            className="flex items-center gap-4 text-white hover:bg-white/20 px-5 py-4 rounded-2xl transition text-lg font-medium"
          >

            <LineChart size={24} />

            Forecast

          </Link>

          <Link
            to="/reports"
            className="flex items-center gap-4 text-white hover:bg-white/20 px-5 py-4 rounded-2xl transition text-lg font-medium"
          >

            <FileText size={24} />

            Reports

          </Link>

        </div>

      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-2xl transition text-lg font-medium"
      >

        <LogOut size={24} />

        Logout

      </button>

    </div>
  );
}

export default Sidebar;