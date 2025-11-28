import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "Trending Now",
    "Top Rated Movies",
    "Action & Adventure",
    "Comedies",
    "Documentaries",
    "Recommended For You",
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar scrolled={scrolled} />
      <HeroBanner />
      
      <div className="relative z-10 -mt-32 pb-20">
        {categories.map((category, index) => (
          <MovieRow key={index} title={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
