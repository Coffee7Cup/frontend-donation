import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LOGO from "../assets/logo.png";

const Navbar = ({
  onNavigate,
  homeRef,
  aboutRef,
  donationsRef,
  donationFormRef,
  locationRef,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = (ref) => {
    onNavigate(ref)
  }

  const handleClickMobile = (ref) => {
    setIsOpen(false); // close menu

    setTimeout(() => {
      onNavigate(ref);
    }, 350); // wait for animation to finish
  };

  return (
    <nav className="bg-white shadow-md text-xl fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <img
            src={LOGO}
            alt="logo"
            style={{ height: "65px", width: "65px" }}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleClick(homeRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleClick(aboutRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              About
            </button>
            <button
              onClick={() => handleClick(donationsRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Donations
            </button>
            <button
              onClick={() => handleClick(donationFormRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Donate Now
            </button>
            <button
              onClick={() => handleClick(locationRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Find Us
            </button>
            {/* <a href="/donation-project-frontend/donors"><button  className="text-gray-700 hover:text-orange-600 font-medium">Donors</button></a> */}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden px-4 pb-4 space-y-2 flex flex-col"
          >
            <button
              onClick={() => handleClickMobile(homeRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleClickMobile(aboutRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              About
            </button>
            <button
              onClick={() => handleClickMobile(donationsRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Donations
            </button>
            <button
              onClick={() => handleClickMobile(donationFormRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Donate Now
            </button>
            <button
              onClick={() => handleClickMobile(locationRef)}
              className="text-gray-700 hover:text-orange-600 font-medium"
            >
              Find Us
            </button>
            {/* <a href="/donation-project-frontend/donors"> */}
            {/*   <button className="text-gray-700 hover:text-orange-600 font-medium"> */}
            {/*     Donors */}
            {/*   </button> */}
            {/* </a> */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
