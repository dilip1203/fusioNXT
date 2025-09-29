import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Zap, 
  Calendar, 
  Trophy,
  Target,
  Star,
  Flame,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';

interface StreakTrackerProps {
  onNavigate: (page: string) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  progress: number;
  target: number;
}

interface DayActivity {
  date: string;
  hasActivity: boolean;
  tasksCompleted: number;
}

export function StreakTracker({ onNavigate }: StreakTrackerProps) {
  const [currentStreak] = useState(12);
  const [longestStreak] = useState(28);
  const [totalTasks] = useState(156);
  const [streakGoal] = useState(30);

  // Generate the last 30 days of activity
  const [activityData] = useState<DayActivity[]>(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate activity data - more recent days have higher activity
      const hasActivity = i < 12 ? true : Math.random() > 0.3;
      const tasksCompleted = hasActivity ? Math.floor(Math.random() * 5) + 1 : 0;
      
      days.push({
        date: date.toISOString().split('T')[0],
        hasActivity,
        tasksCompleted
      });
    }
    
    return days;
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Getting Started',
      description: 'Complete your first cleaning task',
      icon: 'target',
      isUnlocked: true,
      unlockedDate: '2024-01-15',
      progress: 1,
      target: 1
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: 'fire',
      isUnlocked: true,
      unlockedDate: '2024-01-22',
      progress: 7,
      target: 7
    },
    {
      id: '3',
      title: 'Eco Champion',
      description: 'Complete 50 cleaning tasks',
      icon: 'star',
      isUnlocked: true,
      unlockedDate: '2024-02-10',
      progress: 50,
      target: 50
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Maintain a 30-day streak',
      icon: 'trophy',
      isUnlocked: false,
      progress: 12,
      target: 30
    },
    {
      id: '5',
      title: 'Century Club',
      description: 'Complete 100 cleaning tasks',
      icon: 'award',
      isUnlocked: true,
      unlockedDate: '2024-03-01',
      progress: 100,
      target: 100
    },
    {
      id: '6',
      title: 'Consistency King',
      description: 'Maintain a 60-day streak',
      icon: 'zap',
      isUnlocked: false,
      progress: 12,
      target: 60
    }
  ]);

  const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
      case 'target': return <Target className="h-6 w-6" />;
      case 'fire': return <Flame className="h-6 w-6" />;
      case 'star': return <Star className="h-6 w-6" />;
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'award': return <Award className="h-6 w-6" />;
      case 'zap': return <Zap className="h-6 w-6" />;
      default: return <Target className="h-6 w-6" />;
    }
  };

  const getDayOfWeek = (dateString: string) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const streakProgress = (currentStreak / streakGoal) * 100;
  const weeklyAverage = Math.round(totalTasks / 22); // Assuming 22 weeks of activity

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
              <Zap className="h-6 w-6 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Streak Tracker</h1>
                <p className="text-sm text-gray-600">Track your cleaning consistency and achievements</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Current Streak</p>
                  <p className="text-4xl font-bold">{currentStreak}</p>
                  <p className="text-orange-100">days</p>
                </div>
                <Flame className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Longest Streak</p>
                  <p className="text-3xl font-bold text-purple-600">{longestStreak}</p>
                  <p className="text-sm text-gray-600">days</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-green-600">{totalTasks}</p>
                  <p className="text-sm text-gray-600">completed</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weekly Average</p>
                  <p className="text-3xl font-bold text-blue-600">{weeklyAverage}</p>
                  <p className="text-sm text-gray-600">tasks/week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Activity Calendar</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Your cleaning activity over the last 30 days</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Legend */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span>No activity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200 rounded"></div>
                    <span>1-2 tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>3-4 tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>5+ tasks</span>
                  </div>
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day labels */}
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-xs text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Activity squares */}
                  {activityData.map((day, index) => {
                    let bgColor = 'bg-gray-200';
                    if (day.hasActivity) {
                      if (day.tasksCompleted >= 5) bgColor = 'bg-green-600';
                      else if (day.tasksCompleted >= 3) bgColor = 'bg-green-400';
                      else bgColor = 'bg-green-200';
                    }
                    
                    return (
                      <div
                        key={index}
                        className={`w-8 h-8 ${bgColor} rounded cursor-pointer transition-transform hover:scale-110 flex items-center justify-center text-xs text-white font-medium`}
                        title={`${day.date}: ${day.tasksCompleted} tasks`}
                      >
                        {day.hasActivity && day.tasksCompleted > 0 ? day.tasksCompleted : ''}
                      </div>
                    );
                  })}
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {activityData.filter(d => d.hasActivity).length}
                    </p>
                    <p className="text-sm text-gray-600">Active days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {activityData.reduce((sum, d) => sum + d.tasksCompleted, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.round((activityData.filter(d => d.hasActivity).length / activityData.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Consistency</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak Progress & Achievements */}
          <div className="space-y-6">
            {/* Streak Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Streak Goal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {currentStreak}/{streakGoal}
                  </div>
                  <p className="text-gray-600">days until next milestone</p>
                </div>
                
                <Progress value={streakProgress} className="h-3" />
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current</span>
                  <span>{Math.round(streakProgress)}%</span>
                  <span>Goal</span>
                </div>
                
                <div className="pt-2 text-center">
                  <p className="text-sm text-gray-600">
                    {streakGoal - currentStreak} more days to reach your goal!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Achievements</span>
                  </div>
                  <Badge variant="secondary">{unlockedAchievements.length}/{achievements.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.slice(0, 4).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      achievement.isUnlocked 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {!achievement.isUnlocked && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{achievement.progress}/{achievement.target}</span>
                            <span>{Math.round((achievement.progress / achievement.target) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.target) * 100} 
                            className="h-1"
                          />
                        </div>
                      )}
                      {achievement.isUnlocked && achievement.unlockedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {/* Navigate to full achievements page */}}
                >
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Motivational Section */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Flame className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Keep the Streak Alive! 🔥
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You're doing great! {currentStreak} days and counting. 
              Complete a task today to keep your streak going.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => onNavigate('location')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Target className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('tasks')}
              >
                <Clock className="h-4 w-4 mr-2" />
                View Pending Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}