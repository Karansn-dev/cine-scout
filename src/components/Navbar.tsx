import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const navLinks = [
    { name: "Discover Movies", path: "/home" },
  ];

  const handleSignOut = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-sm border-b border-border" 
          : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/home" className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E50914]">
            MovieMatch
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground hover:text-foreground/80"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-foreground hover:text-foreground/80"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Profile Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded overflow-hidden bg-muted">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className={cn("h-4 w-4 text-foreground transition-transform", profileDropdownOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50 py-2">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/profiles');
                    }}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                  >
                    Switch Profile
                  </button>
                  <button
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
                  >
                    Account Settings
                  </button>
                  <div className="border-t border-border my-2" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-accent transition-colors"
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
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors",
                  location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  Dark Mode
                </>
              )}
            </button>
            {/* Mobile Sign Out */}
            <button
              onClick={handleSignOut}
              className="text-left text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
