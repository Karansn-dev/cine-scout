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
    "Trending This Week",
    "Highly Rated Classics",
    "Recommended For You",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar scrolled={scrolled} />
      <HeroBanner />
      
      <div className="relative z-10 -mt-32 pb-20">
        {categories.map((category, index) => (
          <MovieRow key={index} title={category} categoryIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
