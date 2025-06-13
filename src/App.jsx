import {  useRef } from 'react'

import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import Donations from './components/Donations'
import Footer from './components/Footer'
import Donors from './components/Donors'
import UploadDonorDetails from './components/UploadDonorDetails'
import RazorpayPaymentForm from './components/RazorpayPaymentForm'
import EnterDetailsForm from './components/EnterDetailsForm'
import AlreadyDonatedPrompt from './components/AlreadyDonatedPrompt'
import GetNewSession from './components/GetNewSession'

function App() {

  const path  = window.location.pathname;

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const donationsRef = useRef(null);
  const donationFormRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  let componentRender = null;

  const mainPage = 
    <>
      <Navbar onNavigate={scrollToSection} homeRef={homeRef} aboutRef={aboutRef} donationsRef={donationsRef} donationFormRef={donationFormRef}/>
      <Home ref={homeRef}/>
      <About ref={aboutRef}/>
      <Donations ref={donationsRef}/>
      <RazorpayPaymentForm ref={donationFormRef}/>
      <AlreadyDonatedPrompt/>
      <GetNewSession/>
      <Footer />
    </>

  switch (path) {
    case '/donation-project-frontend/':
      componentRender = mainPage;
      break;
    case '/donation-project-frontend/donors' :
      componentRender = <Donors />;
      break;
    case "/donation-project-frontend/upload" :
      componentRender = <UploadDonorDetails/>
      break;
    case "/donation-project-frontend/enter-details" :
      componentRender = <EnterDetailsForm/>
      break;
    default:
      componentRender = mainPage;
      break;
  }

  return (
    <div className="App">
      {componentRender}
    </div>
  )
}

export default App
