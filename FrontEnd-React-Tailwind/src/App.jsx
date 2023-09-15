import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/register-login/Login";
import Rentals from "./components/rentals/Rentals";
import Footer from "./components/footer/Footer";
import PropertyDetails from "./components/rentals/PropertyDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/rentals/:id" element={<PropertyDetails />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

// import Property from '../src/components/prueba'
// import './App.css'

// function App() {

//   return (
//     <>
//       <Property/>
//     </>
//   )
// }

//export default App
