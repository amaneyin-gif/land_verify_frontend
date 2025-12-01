import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { showToast } from '@/components/ui/show-toast';
import MapImg from "@/assets/Map.png";

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(login,"_-login")
    try {
      // Temporary admin login check
      // if (userId === 'admin' && password === 'admin123') {
      //   console.log({userId, password })
      //   // login(true);
      //   // login(userId,password)
      //   console.log(login,"__login")
      //   // toast({
      //   //   title: 'Admin Login Successful',
      //   //   description: 'Welcome Admin!',
      //   // });
      //   showToast(200, 'Admin Login Successful');
      //   navigate('/home');
      //   return; // Stop further login attempts
      // }

      // Normal login flow for other users
      const success = await login(userId, password);
      if (success.status) {
        // toast({
        //   title: 'Login Successful',
        //   description: 'Welcome to AgriStack Geo-Referenced Map Audit System (GRMAS)',
        // });
        showToast(200, 'Login Successful');
        navigate('/home');
      } else {
        toast({
          title: 'Login Failed',
          description: success.message || 'Invalid User ID or Password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-primary-foreground/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              {/* <MapPin className="h-12 w-12" /> */}
              <img src={MapImg} alt="icon" className="h-12 w-12 object-contain" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">AgriStack</h1>
          <h2 className="text-2xl font-semibold mb-6">Geo-Referenced Map Audit System (GRMAS)</h2>
          <p className="text-lg text-primary-foreground/90">
            Verify and validate village land records with precision and efficiency
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                {/* <MapPin className="h-10 w-10 text-primary-foreground" /> */}
                <img src={MapImg} alt="icon" className="h-12 w-12 object-contain" />

              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">AgriStack</h1>
            <p className="text-muted-foreground">Geo-Referenced Map Audit System (GRMAS)</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;