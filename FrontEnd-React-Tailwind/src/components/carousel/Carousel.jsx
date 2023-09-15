import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import { useContext} from "react";
import { propertiesContext } from "../../context/propertiesContext"

const CarouselComponent = () => {

  const properties = useContext(propertiesContext);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
      >
        {properties.map((property, index) => (
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