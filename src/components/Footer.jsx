import React, { forwardRef } from "react";
import locImg from "../img/loc-img.png";

const address = "58-2, Chidambara Rao Street, Old, Municipal Office Road, Fort, Kurnool, Andhra Pradesh 518001";
const mapUrl = `https://www.google.com/maps/place/Annapurnamma+(Aavasam)+Vidyarthi+Vasati+Gruham/@15.8367931,78.0513288,18z/data=!4m6!3m5!1s0x3bb5e765669f9d1d:0x8d8ef4909ee2f9c!8m2!3d15.8368602!4d78.0521657!16s%2Fg%2F1tjs3cvk?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D`;

const Footer = forwardRef((_, ref) => {
  return (
    <footer ref={ref} className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Annapurnamma (Aavasam) Vidyarthi Vasati Gruham
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <span className="font-semibold">Address:</span>
              <br />
              {address}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span>
              <br />
              9000088660 - Precedent
              <br />
              9440655693 - Treasurer
              <br />
              9440655466 - Secretary
              <br />
              9440226490 - Member
              <br />
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={locImg}
                alt="Map Preview"
                className="rounded-lg shadow-lg border border-gray-300 hover:opacity-90 transition"
              />
            </a>
            <span className="text-sm mt-2 text-gray-300">
              Click map for directions
            </span>
          </div>
        </div>

        {/* <div className="mt-8 text-center text-gray-400 text-sm"> */}
        {/*   &copy; {new Date().getFullYear()} Annapurnamma (Aavasam) Vidyarthi Vasati Gruham */}
        {/**/}
        {/* </div> */}
      </div>
    </footer>
  );
});

export default Footer;
