import React from "react";

function AlreadyDonatedPrompt() {

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-md shadow-md max-w-lg mx-auto mt-8 text-center mb-8">
      <p className="text-lg font-medium mb-2">
        Already donated?
      </p>
      <p className="text-sm mb-4">
        If you've already made a donation, you can upload your details here.
      </p>
      <p className="text-red-700 pb-5">YOU CAN ONLY UPLOAD YOUR DETAILS TWICE !</p>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
      >
        <a href = '/donation-project-frontend/upload'> Upload Details</a>
      </button>
    </div>
  );
}

export default AlreadyDonatedPrompt;

