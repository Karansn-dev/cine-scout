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
        <h1 className="text-3xl font-bold text-[#E50914]">MovieMatch</h1>
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-8">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Google Sign-In Button - UI Only, prepared for future Firebase integration */}
            <Button 
              type="button"
              className="w-full bg-white hover:bg-gray-50 text-gray-800 py-6 text-base font-medium rounded-md border border-gray-300 transition-all"
              onClick={() => {
                // TODO: Integrate Firebase Google Authentication
                // firebase.auth().signInWithPopup(googleProvider)
                console.log('Google Sign-In clicked - Firebase integration pending');
              }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black/75 text-gray-400">or</span>
              </div>
            </div>

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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-gray-600 data-[state=checked]:bg-[#E50914] data-[state=checked]:border-[#E50914]" />
                <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-gray-400 hover:underline">
                Forgot password?
              </button>
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
              New to MovieMatch?{" "}
              <button 
                onClick={() => navigate('/')}
                className="text-[#E50914] hover:underline font-semibold"
              >
                Create your account.
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
