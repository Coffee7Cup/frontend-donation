import React, { useEffect, useState } from "react";
import axios from "axios";
import LOADING from "../assets/loading.svg";

function UploadDonorDetails() {
  const [donorType, setDonorType] = useState(null);
  const [form, setForm] = useState({
    name: "",
    donation: "",
    date: "",
    image: null,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  useEffect(() => {
    const token = localStorage.getItem("donor_jwt");

    if (!token) {
      redirectToHome("Unauthorized. Redirecting...");
      return;
    }

    const fetchType = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/donor/route-donor",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.data.success) {
          setDonorType(res.data.type);
        } else {
          throw new Error("No type found");
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          redirectToHome("Session expired. Redirecting...");
        } else {
          setStatus("Failed to determine donor type.");
        }
      }
    };

    fetchType();
  }, []);

  const redirectToHome = (message) => {
    setStatus(message);
    setTimeout(() => {
      window.location.href = "/donation-project-frontend/enter-details";
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setFileName(file.name); // ✅ Update file name here
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("donor_jwt");
    if (!token) return;

    if (!form.name || !form.donation || !form.date) {
      setStatus("Please fill in all required fields.");
      return;
    }

    if (donorType === "mega" && !form.image) {
      setStatus("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("donation", form.donation);
    formData.append("date", form.date);
    if (donorType === "mega" && form.image) {
      formData.append("image", form.image);
    }

    try {
      setLoading(true);
      setStatus("");

      await axios.post("http://localhost:8080/api/v1/donor/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Donor details uploaded successfully!");
      setForm({ name: "", donation: "", date: "", image: null });
      setTimeout(() => {
        window.location.href = "/donation-project-frontend/donors";
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        redirectToHome("Session expired. Redirecting...");
      } else if (err.response?.status === 403) {
        setStatus("You have reached the upload limit!");
      } else {
        setStatus("Upload failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!donorType) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 text-center">
        <p className="text-gray-600">
          {status || (
            <>
              {" "}
              <img src={LOADING} alt="Loading..." width="50" height="50" />{" "}
              Loading donor type...{" "}
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Upload {donorType === "mega" ? "Mega" : "Premium"} Donor Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="donation"
          placeholder="Donation Description"
          required
          value={form.donation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          name="date"
          required
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />

        {donorType === "mega" && (
          <>
            <div className="flex items-center space-x-4">
              <input
                id="fileInput" // This ID must match the label's htmlFor
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="hidden" // Hide default ugly file input
              />

              <label
                htmlFor="fileInput"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Choose File
              </label>

              <span className="text-gray-500 text-sm truncate max-w-xs">
                {fileName}
              </span>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? (
            <>
              {" "}
              <img src={LOADING} alt="Loading..." width="20" height="20" />{" "}
              Uploading...{" "}
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
      )}
    </div>
  );
}

export default UploadDonorDetails;
