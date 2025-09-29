import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Bot, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Users,
  Activity,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface TaskManagementProps {
  onNavigate: (page: string) => void;
}

interface Task {
  id: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'paused';
  robotId?: string;
  startTime?: string;
  endTime?: string;
  deadline: string;
  progress: number;
  estimatedDuration: string;
  description: string;
}

interface Robot {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'charging' | 'maintenance';
  currentTask?: string;
  batteryLevel: number;
  location: string;
}

export function TaskManagement({ onNavigate }: TaskManagementProps) {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      location: 'Central Park Entrance',
      priority: 'high',
      status: 'in-progress',
      robotId: 'EB-001',
      startTime: '09:30 AM',
      deadline: '11:30 AM',
      progress: 65,
      estimatedDuration: '2 hours',
      description: 'Heavy litter accumulation near entrance'
    },
    {
      id: '2',
      location: 'Main Street Plaza',
      priority: 'medium',
      status: 'assigned',
      robotId: 'EB-002',
      deadline: '02:00 PM',
      progress: 0,
      estimatedDuration: '1.5 hours',
      description: 'Regular maintenance cleaning'
    },
    {
      id: '3',
      location: 'Riverside Walk',
      priority: 'low',
      status: 'pending',
      deadline: '04:00 PM',
      progress: 0,
      estimatedDuration: '1 hour',
      description: 'Weekly scheduled cleaning'
    },
    {
      id: '4',
      location: 'Shopping District',
      priority: 'high',
      status: 'completed',
      robotId: 'EB-003',
      startTime: '08:00 AM',
      endTime: '09:45 AM',
      deadline: '10:00 AM',
      progress: 100,
      estimatedDuration: '2 hours',
      description: 'Emergency cleanup - spill reported'
    }
  ]);

  const [robots] = useState<Robot[]>([
    {
      id: 'EB-001',
      name: 'EcoBot Alpha',
      status: 'working',
      currentTask: '1',
      batteryLevel: 75,
      location: 'Central Park Entrance'
    },
    {
      id: 'EB-002',
      name: 'EcoBot Beta',
      status: 'idle',
      batteryLevel: 90,
      location: 'Main Depot'
    },
    {
      id: 'EB-003',
      name: 'EcoBot Gamma',
      status: 'charging',
      batteryLevel: 45,
      location: 'Charging Station A'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRobotStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'idle': return 'bg-green-100 text-green-800';
      case 'charging': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Activity className="h-4 w-4 text-blue-600" />;
      case 'assigned': return <Users className="h-4 w-4 text-purple-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'paused': return <Pause className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const activeTasksCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const pendingTasksCount = tasks.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Task Management</h1>
                <p className="text-sm text-gray-600">Monitor and control cleaning operations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-3xl font-bold text-blue-600">{activeTasksCount}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-3xl font-bold text-green-600">{completedTasksCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingTasksCount}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Robots</p>
                  <p className="text-3xl font-bold text-purple-600">{robots.filter(r => r.status === 'working').length}</p>
                </div>
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks">Tasks Overview</TabsTrigger>
            <TabsTrigger value="robots">Robot Status</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid gap-6">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Task Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{task.location}</span>
                            </h3>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority} priority
                            </Badge>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(task.status)}
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Estimated Duration</p>
                            <p className="font-medium">{task.estimatedDuration}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Deadline</p>
                            <p className="font-medium">{task.deadline}</p>
                          </div>
                          {task.startTime && (
                            <div>
                              <p className="text-gray-500">Start Time</p>
                              <p className="font-medium">{task.startTime}</p>
                            </div>
                          )}
                          {task.endTime && (
                            <div>
                              <p className="text-gray-500">End Time</p>
                              <p className="font-medium">{task.endTime}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress and Robot Info */}
                      <div className="lg:col-span-1">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} />
                          </div>
                          
                          {task.robotId && (
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Assigned Robot</p>
                              <div className="flex items-center space-x-2">
                                <Bot className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">{task.robotId}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1">
                        <div className="flex flex-col space-y-2">
                          {task.status === 'in-progress' && (
                            <>
                              <Button size="sm" variant="outline">
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Task
                              </Button>
                              <Button size="sm" variant="outline">
                                <Square className="h-4 w-4 mr-2" />
                                Stop Task
                              </Button>
                            </>
                          )}
                          {task.status === 'pending' && (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Start Task
                            </Button>
                          )}
                          {task.status === 'completed' && (
                            <Button 
                              size="sm" 
                              onClick={() => onNavigate('reviews')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              View Report
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="robots" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {robots.map((robot) => (
                <Card key={robot.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                      <span>{robot.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className={getRobotStatusColor(robot.status)}>
                        {robot.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Battery Level</span>
                        <span>{robot.batteryLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBatteryColor(robot.batteryLevel)}`}
                          style={{ width: `${robot.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-medium">{robot.location}</p>
                    </div>
                    
                    {robot.currentTask && (
                      <div>
                        <p className="text-sm text-gray-600">Current Task</p>
                        <p className="font-medium">
                          {tasks.find(t => t.id === robot.currentTask)?.location || 'Unknown Task'}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      {robot.status === 'idle' && (
                        <Button size="sm" className="flex-1">
                          Assign Task
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}