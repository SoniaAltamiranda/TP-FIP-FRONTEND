import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";

const CarouselComponent = () => {
  const imageNames = ["banner1.png", "banner2.png", "banner3.png"]; 
  return (
    <div className="h-full w-full flex items-center justify-center">
      
      <div className="w-full md:w-4/5 lg:w-3/5 h-full flex items-center justify-center">
        <Carousel
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {imageNames.map((imageName, index) => (
            <div key={index} className="relative h-full">
              <img
                src={`/images/${imageName}`}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white p-8 title-fade-in">
                <p className="text-6xl">casa</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;
