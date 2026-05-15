function DashboardCard({

  title,
  value,
  color

}) {

  return (

    <div className={`rounded-3xl p-6 shadow-2xl backdrop-blur-lg border border-white/30 text-white ${color} hover:scale-105 transition duration-300`}>

      <h3 className="text-lg font-medium">

        {title}

      </h3>

      <h1 className="text-4xl font-bold mt-4">

        {value}

      </h1>

    </div>
  );
}

export default DashboardCard;