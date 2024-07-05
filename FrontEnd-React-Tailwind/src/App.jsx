import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Login from "./components/register-login/Login";
import Register from "./components/register-login/Register";
import Rentals from "./components/property/Rentals";
import Footer from "./components/footer/Footer";
import User from "./components/user/User";
import PropertyDetails from "./components/property/PropertyDetails";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import AboutUs from "./components/aboutUs/aboutUs";
import Payments from "./components/property/Payments";

function App() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/user" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/rentals/:id" element={<PropertyDetails />} />
        <Route
          path="/user"
          element={isAuthenticated ? <User /> : <Navigate to="/login" />}
        />
        <Route path="/payments" element={<Payments/>}/>


      </Routes>
      <Footer />
    </>
  );
}

export default App;



