import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  MapPin, 
  Camera, 
  Bot, 
  Bell, 
  Calendar, 
  Zap,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
  userEmail: string;
}

export function HomePage({ onNavigate, userEmail }: HomePageProps) {
  const [activeRobots] = useState(3);
  const [completedTasks] = useState(47);
  const [streak] = useState(12);

  const recentTasks = [
    { id: 1, location: 'Park Avenue', status: 'completed', time: '2 hours ago' },
    { id: 2, location: 'Main Street', status: 'in-progress', time: '30 mins ago' },
    { id: 3, location: 'Central Plaza', status: 'pending', time: '1 hour ago' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Target className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">EcoBot Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {userEmail.split('@')[0]}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Robots</p>
                  <p className="text-3xl font-bold text-green-600">{activeRobots}</p>
                </div>
                <Bot className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-3xl font-bold text-blue-600">{completedTasks}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-600">{streak} days</p>
                </div>
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Progress</p>
                  <p className="text-3xl font-bold text-purple-600">85%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <Progress value={85} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Pin Location Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('location')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>Pin Cleaning Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1699423957878-bff709d3dd4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjB0ZWNobm9sb2d5JTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NzkxMjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Smart city map interface"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                Select areas that need cleaning on the interactive map. Our robots will automatically plan the most efficient routes.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Open Map Interface
              </Button>
            </CardContent>
          </Card>

          {/* Capture & Report Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('capture')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5 text-blue-600" />
                <span>Capture & Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 h-32 rounded-lg mb-4 flex items-center justify-center">
                <Camera className="h-12 w-12 text-blue-400" />
              </div>
              <p className="text-gray-600 mb-4">
                Take photos of waste areas or environmental issues. AI will analyze and prioritize cleanup tasks automatically.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Capture Mode
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Tasks
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('tasks')}
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="font-medium">{task.location}</p>
                        <p className="text-sm text-gray-600">{task.time}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('schedule')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Cleaning
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('robots')}
              >
                <Bot className="h-4 w-4 mr-2" />
                Robot Status
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('reviews')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate('streaks')}
              >
                <Zap className="h-4 w-4 mr-2" />
                View Streaks
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}