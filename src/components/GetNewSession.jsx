import React from "react";

const GetNewSession = () => {
  const handleGetNewSession = async () => {
    localStorage.setItem('donor_jwt',null)
    window.location.href = "/donation-project-frontend/enter-details"
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={handleGetNewSession}
        className="px-6 py-3 bg-black text-white rounded-2xl shadow-md hover:bg-black/70 transition mb-8"
      >
        Get New Session
      </button>
    </div>
  );
};

export default GetNewSession;

