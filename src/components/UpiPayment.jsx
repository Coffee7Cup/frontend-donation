import React, { forwardRef } from "react";
import QRCODE from "../assets/qr-code.png";
import CAUTION from "../assets/caution.png";

const UpiPayment = forwardRef((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row items-center justify-around min-h-screen p-6 space-y-8 lg:space-y-0 lg:space-x-10"
    >
      {/* Left Section - QR and UPI Info */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        <img
          src={QRCODE}
          alt="QR Code"
          className="w-72 h-72 object-contain mb-6"
        />
        <div className="text-center text-lg text-gray-800 bg-yellow-100 rounded-lg border-2 border-yellow-300 px-4 py-2 mb-4">
          --- Donate through QR or use the below phone number ---
        </div>
        <div className="bg-purple-200 text-center text-xl text-gray-800 font-semibold rounded-lg border-2 border-purple-300 px-6 py-4 w-full">
          <div className="mb-1">9494791900</div>
          <div>PhonePy | Paytm | and others</div>
        </div>
      </div>

      {/* Right Section - Thank you + Caution */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Your Donations are Much Appreciated 💚
        </h2>
        <div className="flex items-center gap-3 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-md p-4 m-2">
          <img src={CAUTION} alt="Caution" className="w-8 h-8" />
          <span>Please contact us if there's any inconvenience.</span>
        </div>
        <div className="flex items-center gap-3 text-pink-700 bg-pink-50 border border-pink-300 rounded-md p-4 m-2">
          <span>Please give us a quick call to confirm your donation and share your details — we'd love to thank you personally!</span>
        </div>
      </div>
    </div>
  );
});

export default UpiPayment;
