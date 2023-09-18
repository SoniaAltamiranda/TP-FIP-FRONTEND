import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import { useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";

const CarouselComponent = () => {
  const properties = useContext(propertiesContext);

  const showProperties = properties.slice(0, 5);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {showProperties.map((property, index) => (
          <div key={index}>
            <img
              src={property.images}
              alt={`Image ${index}`}
              className="w-full h-screen object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
