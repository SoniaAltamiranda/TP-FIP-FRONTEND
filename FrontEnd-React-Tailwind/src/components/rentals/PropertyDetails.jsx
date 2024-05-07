// import { useLocation } from "react-router-dom";

// function PropertyDetails() {
//   const location = useLocation();
//   const { property } = location.state;

//   return (
//     <div className="container mx-auto p-">
//       <h1 className="text-2xl font-semibold mb-4 text-blue-600">{property.title}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {property.images.map((image, index) => (
//           <div key={index} className="mb-4">
//             <img
//               src={image}
//               alt={`Image ${index + 1}`}
//               className="w-full h-auto rounded-lg"
//             />
//           </div>
//         ))}

//         <div className="md:col-span-4 bg-gray-100 p-4 rounded-lg">
//           <p className="text-lg">Type: {property.type}</p>
//           <p className="text-lg">Rooms: {property.rooms}</p>
//           <p className="text-lg">Description: {property.description}</p>
//           <p className="text-lg">Price: ${property.price}</p>
//           <p className="text-lg">Location: {property.location}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyDetails;
