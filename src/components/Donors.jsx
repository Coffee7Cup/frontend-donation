import LOADING from "../assets/loading.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Donors() {
  const [donorsData, setDonorsData] = useState({
    megaDonors: [],
    premiumDonors: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/donor/get-donors",
        );
        if (res.data.success) {
          const all = res.data.donors;

          const megaDonors = all.filter((d) => d.type === "mega");
          const premiumDonors = all.filter((d) => d.type === "premium");

          setDonorsData({
            megaDonors,
            premiumDonors,
          });
        }
      } catch (err) {
        console.error("Error loading donors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black bg-white">
        <img src={LOADING} alt="Loading..." width="50" height="50" />
        <span className="ml-4">Loading donors...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Home Button */}
      <div className="mb-6">
        <a
          href="/donation-project-frontend/"
          className="inline-block bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition duration-300"
        >
          ⬅ Home
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center mb-12">
        Our Amazing Donors
      </h1>

      {/* Mega Donors */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-center mb-6">Mega Donors</h2>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 p-4">
          {donorsData.megaDonors.map((donor, index) => (
            <div
              key={index}
              className="break-inside-avoid max-w-sm w-full m-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="overflow-hidden w-full max-h-[500px] rounded-t-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={donor.image}
                  alt={donor.name}
                />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-xl font-semibold text-gray-900 truncate">
                  {donor.name}
                </h5>
                <p className="text-gray-600 font-medium">{donor.donation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Donors */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-center mb-6">Premium Donors</h2>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 p-4">
          {donorsData.premiumDonors.map((donor, index) => (
            <div
              key={index}
              class="break-inside-avoid m-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {donor.name}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                {donor.donation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Donors;
