import React, { useEffect, useState, forwardRef } from "react";
import IMG2 from "../assets/projectImgs/img001.jpg";
import IMG1 from "../assets/projectImgs/img002.jpg";
import IMG3 from "../assets/projectImgs/img003.jpg";
import IMG4 from "../assets/projectImgs/img004.jpg";
import IMG5 from "../assets/projectImgs/img005.jpg";  
import IMG6 from "../assets/projectImgs/img006.jpg";
import IMG7 from "../assets/projectImgs/img007.jpg";
import IMG8 from "../assets/projectImgs/img008.jpg";
import IMG9 from "../assets/projectImgs/img009.jpg";
import IMG10 from "../assets/projectImgs/img010.jpg";
import IMG11 from "../assets/projectImgs/img011.jpg";
import IMG12 from "../assets/projectImgs/img012.jpg";
import IMG13 from "../assets/projectImgs/img013.jpg";

const Home = forwardRef((props, ref) => {
  const [fadeIn, setFadeIn] = useState(false);

  const images = [
    // IMG1,
    IMG2,
    IMG3,
    // IMG4,
    IMG5,
    IMG6,
    // IMG7,
    IMG8,
    // IMG9,
    IMG10,
    // IMG11,
    IMG12,
    IMG13
  ]

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <div ref={ref} className="m-8 md:p-10 ">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-2 md:px-8 bg-gray-50 mt-0 md:mb-[-100px]">
          <div
            className={`flex flex-col transition-all duration-1000 p-4 md:p-10 justify-center items-center ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left flex justify-center mt-10">
              Annapurnamma (Aavasam) Vidyarthi Vasati Gruham
            </h1>
            <p className="text-base md:text-2xl text-gray-700 text-center md:text-left w-[70%]">
              We support children from underserved rural areas by offering
              quality education, nutritious food, and a secure environment where
              they can grow and thrive.
            </p>
            <div>
              <div>
                <div className="relative max-h-[600px] overflow-hidden mt-8 bg-gradient-to-t from-white to-transparent overflow-y-auto mt-10">
                  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16  z-10"></div>

                  <div className="columns-2 sm:columns-3 md:columns-4 gap-4 px-4 space-y-4">
                    {images.map((image, index) => (
                      <div key={index} className="break-inside-avoid">
                        <img
                          src={image}
                          className="w-full object-cover rounded-lg shadow"
                          alt={`img${index + 2}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Home;
