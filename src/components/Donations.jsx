import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import book from "../img/don/book.png";
import clothing from "../img/don/clothing.png";
import gadgets from "../img/don/gadgets.png";
import salary from "../img/don/salary.png";
import celeb from "../assets/projectImgs/celeb.jpeg";
import bday from "../assets/projectImgs/bday.jpeg";

const Donations = forwardRef((props, ref) => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const Card = React.memo(({ title, description, image, index}) => {
    return (
      <motion.div
        className="cursor-pointer bg-white shadow rounded-lg p-4 transition-transform transform hover:scale-105 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-t-lg rounded-3xl"
        />
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </motion.div>
    );
  });
  const donations = [
    {
      title: "Books for Children",
      description: "Donate books to children.",
      image: book,
    },
    {
      title: "Clothing Drive",
      description: "Provide clothing for those in need.",
      image: clothing,
    },
    {
      title: "Gadgets for Education",
      description: "Support students with essential gadgets.",
      image: gadgets,
    },
    {
      title: "Support",
      description: "donate monthly",
      image: salary,
    },
    {
      title: "Celeberate birthdays",
      description: "Celebrate birthdays with a cause.",
      image: bday,
    },
    {
      title: "Celeberate with us",
      description: "celebrate any occasion with us.",
      image: celeb,
    },
    // Add more donation items as needed
  ];

  return (
    <>
      {isPopupOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-xl relative">
            <button
              className="absolute top-2 right-4 text-2xl font-bold text-gray-700 hover:text-black"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedDonation.title}
            </h2>
            <p>{selectedDonation.description}</p>
            <p className="text-2xl">Please contact : 999999999</p>
          </div>
        </div>
      )}

      <div ref={ref} className="p-4 md:p-20 mx-10 ">
        <h1 className="text-3xl md:text-6xl font-bold mb-10 text-center">
          Donations
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {donations.map((donation, index) => (
            <div 
              key={index}
              onClick={() => {
                setSelectedDonation(donation);
                setIsPopupOpen(true);
              }}
            >
            <Card
              {...donation}
              index={index}
            />
            </div>
          ))}
        </div>
      </div>
    </>
  );
});

export default Donations;
