// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// function PropertyDetails() {

//   initMercadoPago('APP_USR-54003e8a-4ee5-4796-a64b-bd2701051885', {
//     locale: "es-AR"
//   });

//   const location = useLocation();
//   const { property } = location.state;
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [preferenceId, setPreferenceId] = useState(null);
//   console.log(property);
//   const createPreference = async () => {
//     const preferenceData = {
//       title: property.title,
//       quantity: 1,
//       unit_price: parseInt(property.price)

//     }
//     console.log(preferenceData);
//     try {
//       const response = await fetch('http://localhost:3000/mercado_pago/create_preference', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(preferenceData)
//       });

//       console.log(response);
//       if (!response.ok) {
//         throw new Error('Error creando preferencia: ' + response.status);
//       }
//       const { id } = await response.json();

//       console.log(id);
//       return id;
//     } catch (error) {
//       console.error('Error creando preferencia:', error);

//     }
//   }

//   const handleBuy = async () => {
//     const id = await createPreference();
//     if (id) {
//       console.log(id);
//       setPreferenceId(id);
//     }
//   }


//   return (
//     <div className="container mx-auto p-4 mt-16 text-gray-600">
//       <div className="text-center">
//         <br />
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           {property.title}
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {property.images && property.images.map((image, index) => (
//             <div key={index} className="mb-4">
//               <img
//                 src={image}
//                 alt={`Image ${index + 1}`}
//                 className="w-full h-64 object-cover rounded-lg shadow-md"
//               />
//             </div>
//           ))}

//           <div
//             className="md:col-span-4 p-4 bg-gray-100 border rounded shadow-lg flex justify-center items-center"
//             style={{ fontFamily: "Helvetica Neue, sans-serif" }}
//           >
//             <div>
//               <h2
//                 className="text-3xl font-bold text-gray-800 mb-4"
//                 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
//               >
//                 {property.title}
//               </h2>
//               <p className="mb-2">
//                 Rooms: <span className="text-gray-500">{property.rooms}</span>
//               </p>
//               <p className="mb-2">Description: {property.description}</p>
//               <p className="mb-2">
//                 Price:{" "}
//                 <span style={{ fontWeight: "bold", color: "#555" }}>
//                   ${property.price}
//                 </span>
//               </p>
//               <p className="mb-2">Location: {property.location}</p>
//               {!userLoggedIn && (
//                 <>
//                   <p className="mb-2">
//                     Para obtener más información, por favor{" "}
//                     <a
//                       href="/Login"
//                       style={{ textDecoration: "none", color: "#3498db" }}
//                     >
//                       HAZ CLICK AQUI
//                     </a>
//                     .
//                   </p>
//                   <button onClick={handleBuy} className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
//                   > Reservar </button>
//                   {preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
//                 </>
//               )}
//               <div className="">
//                 <iframe
//                   src={property.url_iframe}
//                   className="w-full h-600"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetails;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PropertyDetails() {
  initMercadoPago("APP_USR-d8001b82-36a4-4f76-bf0e-f88f96b549ae", {
    locale: "es-AR",
  });

  const location = useLocation();
  const { property } = location.state;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  console.log(property);

  const handleBuy = async () => {
    if (!userLoggedIn) {
      // window.location.href='/login'; 
      return;
    }
    if (!startDate || !endDate) {
      alert("Por favor selecciona las fechas de inicio y salida.");
      return;
    }

    const id = await createPreference();

    if (id) {
      console.log(id);
      setPreferenceId(id);
    }
  };

  const createPreference = async () => {
    console.log("Rango de fechas seleccionado:", startDate, endDate);

    const preferenceData = {
      title: property.title,
      quantity: 1,
      unit_price: parseInt(property.price),
    };

    console.log(preferenceData);

    try {
      const response = await fetch(
        "http://localhost:3000/mercado_pago/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceData),
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Error creando preferencia: " + response.status);
      }

      const { id } = await response.json();

      console.log(id);
      return id;
    } catch (error) {
      console.error("Error creando preferencia:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 text-gray-600">
      <div className="text-center">
        <br />
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {property.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {property.images &&
            property.images.map((image, index) => (
              <div key={index} className="mb-4">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}

          <div
            className="md:col-span-4 p-4 bg-gray-100 border rounded shadow-lg flex justify-center items-center"
            style={{ fontFamily: "Helvetica Neue, sans-serif" }}
          >
            <div>
              <h2
                className="text-3xl font-bold text-gray-800 mb-4"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
              >
                {property.title}
              </h2>
              <p className="mb-2">
                Rooms: <span className="text-gray-500">{property.rooms}</span>
              </p>
              <p className="mb-2">Description: {property.description}</p>
              <p className="mb-2">
                Price:{" "}
                <span style={{ fontWeight: "bold", color: "#555" }}>
                  ${property.price}
                </span>
              </p>
              <p className="mb-2">Location: {property.location}</p>
              {!userLoggedIn && (
                <>
                  <p className="mb-2">
                    Para obtener más información, por favor{" "}
                    <a
                      href="/Login"
                      style={{ textDecoration: "none", color: "#3498db" }}
                    >
                      HAZ CLICK AQUI
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    Seleccionar Fecha
                  </button>
                  {open && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-8 rounded shadow-md">
                        <p>Selecciona las fechas</p>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          minDate={new Date()} // Evita seleccionar fechas pasadas
                          className="w-full mb-4"
                        />
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="w-full mb-4"
                        />
                        <button
                          onClick={() => setOpen(false)}
                          className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mr-2"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleBuy}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                          Reservar
                        </button>
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId }}
                            customization={{
                              texts: { valueProp: "smart_option" },
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="">
                <iframe
                  src={property.url_iframe}
                  className="w-full h-600"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;

