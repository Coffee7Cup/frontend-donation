import { useRef } from "react";

import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Donations from "./components/Donations";
import Footer from "./components/Footer";
import UpiPayment from "./components/UpiPayment";

function App() {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const donationsRef = useRef(null);
  const donationFormRef = useRef(null);
  const locationRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  let componentRender = null;

  const mainPage = (
    <>
      <Navbar
        onNavigate={scrollToSection}
        homeRef={homeRef}
        aboutRef={aboutRef}
        donationsRef={donationsRef}
        donationFormRef={donationFormRef}
        locationRef={locationRef}
      />

      <Home ref={homeRef} />
      <About ref={aboutRef} />
      <Donations ref={donationsRef} />
      <UpiPayment ref={donationFormRef} />
      <Footer ref={locationRef} />
    </>
  );

  componentRender = mainPage;

  return <div className="App">{componentRender}</div>;
}

export default App;
