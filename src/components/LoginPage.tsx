import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bot, ShieldCheck, Leaf } from 'lucide-react';

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero image and branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-600 p-3 rounded-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-800">EcoBot</h1>
              <p className="text-green-600">Autonomous Waste Management</p>
            </div>
          </div>
          
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1590038667005-7d82ac6f864b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm9tb3VzJTIwcm9ib3QlMjBjbGVhbmluZyUyMHdhc3RlJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTc5MTI2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Autonomous robot cleaning system"
            className="rounded-2xl shadow-2xl w-full h-64 object-cover"
          />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Secure & Reliable Operations</span>
            </div>
            <div className="flex items-center space-x-3">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">Eco-Friendly Solutions</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bot className="h-5 w-5 text-green-600" />
              <span className="text-gray-700">AI-Powered Efficiency</span>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="bg-green-600 p-3 rounded-lg w-fit mx-auto mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-800">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your EcoBot account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ecobot.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600">
              <p>Demo Credentials:</p>
              <p>Email: admin@ecobot.com | Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}