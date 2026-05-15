import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function UploadDataset() {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const handleUpload = async () => {

    if (!file) {

      setMessage("Please select a file");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await API.post(
        "/dataset/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

    } catch (error) {

      setMessage("Upload failed");
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <div className="mt-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">

          <h1 className="text-4xl font-bold text-slate-800">

            Upload Dataset

          </h1>

          <p className="text-slate-700 mt-3">

            Upload CSV or Excel files for AI forecasting.

          </p>

          <div className="mt-8 flex flex-col gap-6">

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-white p-4 rounded-xl"
            />

            <button
              onClick={handleUpload}
              className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
              Upload Dataset
            </button>

            {message && (

              <div className="bg-white rounded-xl p-4 text-slate-800 font-medium shadow-lg">

                {message}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadDataset;