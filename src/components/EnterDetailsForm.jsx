import LOADING from '../assets/loading.svg'
import React, { useState } from "react";
import axios from "axios";

function EnterDetailsForm() {
  const [identifier, setIdentifier] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    setDonations([]);

    try {
      const res = await axios.post("http://localhost:8080/api/v1/donor/get-donations", {
        identifier,
      });

      if (res.data.success) {
        setDonations(res.data.donations);
      } else {
        setStatus("No donations found.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDonation = async (paymentId) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/users/get-token", {
        identifier,
        paymentId,
      });

      if (res.data.success) {
        localStorage.setItem("donor_jwt", res.data.token);
        setStatus("Redirecting...");
        setTimeout(() => {
          window.location.href = "/donation-project-frontend/upload";
        }, 1500);
      } else {
        setStatus("Could not generate token.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Token generation failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Enter Your Email or Phone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email or Phone"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded text-center flex justify-center align-center flex-row"
        >
          {loading ? (
            <>
              <img src={LOADING} alt="Loading..." width="25" height="25" />
              Verifying...
            </>
          ) : "Find My Donations"}
        </button>
      </form>

      {status && <p className="text-center text-sm text-gray-600 mt-2">{status}</p>}

      {donations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Your Donations:</h3>
          <ul className="space-y-3">
            {donations.map((donation) => (
              <li key={donation._id} className="border p-3 rounded bg-gray-50">
                <p><strong>Amount:</strong> ₹{donation.amount}</p>
                <p><strong>Purpose:</strong> {donation.purpose}</p>
                <p><strong>Date:</strong> {new Date(donation.createdAt).toLocaleDateString()}</p>
                <button
                  onClick={() => handleSelectDonation(donation._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Upload Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EnterDetailsForm;

