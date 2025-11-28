import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Movies", path: "/home" },
    { name: "TV Shows", path: "/home" },
    { name: "New & Popular", path: "/home" },
    { name: "Recommendations", path: "/recommend" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/95 backdrop-blur-sm border-b border-gray-900" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/home" className="text-2xl md:text-3xl font-bold text-[#E50914]">
            StreamFlix
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  location.pathname === link.path ? "text-white" : "text-gray-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white hover:text-white/80"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white hover:text-white/80"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div className="hidden md:block w-8 h-8 rounded overflow-hidden bg-gray-700">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-900 px-4 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors",
                  location.pathname === link.path ? "text-white" : "text-gray-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
