import LOADING from "../assets/loading.svg";
import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";

const RazorpayPaymentForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/razorpay-create-order",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: formData.amount,
          password: formData.password,
        },
      );

      const { order, razorpayKey } = res.data;

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Donation Portal",
        description: "Thank you for your donation!",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:8080/api/v1/users/razorpay-verify-payment",
              {
                ...response,
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                amount: formData.amount,
              },
            );

            if (verifyRes.data.success) {
              alert("Payment successful!");
              console.log("Payment verified:", verifyRes.data);
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: async function() {
            console.log("Payment popup closed by user");

            const order_id = localStorage.getItem("cancel_order_id");
            if (!order_id) return;

            try {
              await axios.post("http://localhost:8080/api/v1/user/cancel", {
                order_id,
              });

              alert("You cancelled the payment. Payment record deleted.");
            } catch (err) {
              console.error("Failed to delete payment:", err);
              alert("Payment cancellation failed to sync.");
            } finally {
              localStorage.removeItem("cancel_order_id");
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="max-w-md mx-auto mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Pay with Razorpay</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="amount"
          required
          placeholder="Amount (INR)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded-md transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/80"
            }`}
        >
          {loading ? (
            <>
              <img
                src={LOADING}
                alt="Loading..."
                width="25"
                className="inline mr-2"
              />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
});

export default RazorpayPaymentForm;
