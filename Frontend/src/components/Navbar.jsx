function Navbar() {

  const userName =
    localStorage.getItem("userName");

  return (

    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/30">

      <h1 className="text-3xl font-bold text-slate-800">

        AI Demand Forecasting

      </h1>

      <p className="text-slate-700 mt-1">

        Welcome {userName}

      </p>

    </div>
  );
}

export default Navbar;