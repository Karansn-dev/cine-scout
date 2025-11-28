import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Discover Movies", path: "/home" },
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
            MovieMatch
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
          
          {/* Profile Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded overflow-hidden bg-gray-700">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className={cn("h-4 w-4 text-white transition-transform", profileDropdownOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-gray-800 rounded-md shadow-lg z-50 py-2">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/profiles');
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Switch Profile
                  </button>
                  <button
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Account Settings
                  </button>
                  <div className="border-t border-gray-800 my-2" />
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
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
