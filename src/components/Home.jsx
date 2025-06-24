import React, { useEffect, useState, forwardRef } from "react";

const Home = forwardRef((props, ref) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const imagesLinks = import.meta.glob(
    "../assets/displayImgs/*.{jpg,jpeg,png}",
    {
      eager: true,
      as: "url",
    }
  );

  const images = Object.values(imagesLinks);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div ref={ref} className="m-8 md:p-10 md:mb-[-100px]">
      <div className="flex flex-col md:flex-row items-center justify-between px-2 md:px-8 bg-gray-50 mt-0">
        <div
          className={`flex flex-col transition-all duration-1000 p-4 md:p-10 justify-center items-center ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-left mt-10 p-2 text-orange-500">
            Annapurnamma (Aavasam) Vidyarthi Vasati Gruham
          </h1>

          {/* Description */}
          <p className="text-base md:text-2xl text-gray-700 text-center md:text-left w-[70%]">
            We support children from underserved rural areas by offering
            quality education, nutritious food, and a secure environment where
            they can grow and thrive.
          </p>

          {/* Image Grid Wrapper */}
          <div className={`relative w-full mt-10`}>
            <div
              className={`overflow-hidden transition-all duration-700 ${
                showMore ? "max-h-full" : "max-h-[50vh]"
              }`}
            >
              <div className="columns-2 sm:columns-3 md:columns-4 gap-4 px-4 space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="break-inside-avoid">
                    <img
                      src={image}
                      className="w-full object-cover rounded-lg shadow"
                      alt={`img${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {!showMore && (
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            )}
          </div>

          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-400 transition"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default Home;

