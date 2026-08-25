import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Workshop from './pages/Workshop';
import WorkshopSelect from './pages/WorkshopSelect';
import TimeSelect from './pages/TimeSelect';
import CarRental from './pages/CarRental';
import CarBooking from './pages/CarBooking';
import PaymentSelect from './pages/PaymentSelect';
import CardPayment from './pages/CardPayment';
import PaymentSuccess from './pages/PaymentSuccess';
import Profile from './pages/Profile';
import IDriver from './pages/IDriver';
import FuelTerms from './pages/FuelTerms';
import FuelRequest from './pages/FuelRequest';
import DriverList from './pages/DriverList';
import DriverChat from './pages/DriverChat';
import SparePartsStore from './pages/SparePartsStore';
import DriverDashboard from './pages/DriverDashboard';
import RoadsideLanding from './pages/RoadsideLanding';
import RoadsideRequest from './pages/RoadsideRequest';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children, showNav = true, showFooter = true }) {
  return (
    <>
      {showNav && <Navbar />}
      <main className="animate-fadeIn">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth / Intro flows — no navbar/footer */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />

        {/* Main app — with navbar/footer */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/workshop" element={<Layout><Workshop /></Layout>} />
        <Route path="/workshop-select" element={<Layout showNav={false} showFooter={false}><WorkshopSelect /></Layout>} />
        <Route path="/workshop-time" element={<Layout showNav={false} showFooter={false}><TimeSelect /></Layout>} />
        <Route path="/idriver" element={<Layout><IDriver /></Layout>} />
        <Route path="/choose-driver" element={<Layout showFooter={false}><DriverList /></Layout>} />
        <Route path="/driver-chat" element={<Layout showNav={false} showFooter={false}><DriverChat /></Layout>} />
        <Route path="/fuel-terms" element={<Layout showFooter={false}><FuelTerms /></Layout>} />
        <Route path="/fuel-request" element={<Layout showNav={false} showFooter={false}><FuelRequest /></Layout>} />
        <Route path="/roadside" element={<Layout showFooter={false}><RoadsideLanding /></Layout>} />
        <Route path="/roadside-request" element={<Layout showNav={false} showFooter={false}><RoadsideRequest /></Layout>} />
        <Route path="/spare-parts" element={<Layout><SparePartsStore /></Layout>} />
        <Route path="/car-rental" element={<Layout showFooter={false}><CarRental /></Layout>} />
        <Route path="/car-booking" element={<Layout showNav={false} showFooter={false}><CarBooking /></Layout>} />
        <Route path="/payment-select" element={<Layout showNav={false} showFooter={false}><PaymentSelect /></Layout>} />
        <Route path="/card-payment" element={<Layout showNav={false} showFooter={false}><CardPayment /></Layout>} />
        <Route path="/payment-success" element={<Layout showNav={false} showFooter={false}><PaymentSuccess /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/driver-dashboard" element={<Layout showNav={false} showFooter={false}><DriverDashboard /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
