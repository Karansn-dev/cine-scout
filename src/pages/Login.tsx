import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to profiles page (UI-only, no backend auth)
    navigate('/profiles');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574267432644-f610f7a0c56f?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <h1 className="text-3xl font-bold text-[#E50914]">StreamFlix</h1>
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#E50914] focus:ring-[#E50914]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#E50914] focus:ring-[#E50914] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-gray-600 data-[state=checked]:bg-[#E50914] data-[state=checked]:border-[#E50914]" />
              <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                Remember me
              </label>
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#E50914] hover:bg-[#F40612] text-white py-6 text-lg font-semibold rounded-md transition-all hover:scale-[1.02]"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-400 text-sm">
              New to StreamFlix?{" "}
              <button 
                onClick={() => navigate('/')}
                className="text-white hover:underline font-semibold"
              >
                Sign up now
              </button>
            </p>
            <button className="text-gray-400 text-sm hover:underline">
              Need help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
