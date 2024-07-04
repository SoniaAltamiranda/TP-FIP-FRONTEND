Home.jsx
import CarouselComponent from "../carousel/Carousel";
import FeaturedPosts from "../featured-posts/FeaturedPosts";

function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300">
      <br />
      <br />
        <CarouselComponent />
        <FeaturedPosts />
    
    </div>
  );
}

export default Home;