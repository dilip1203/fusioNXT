import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Bot,
  Clock,
  MapPin,
  Settings,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

interface NotificationCenterProps {
  onNavigate: (page: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionType?: 'task_completed' | 'robot_status' | 'system_alert' | 'review_reminder';
  actionData?: any;
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Task Completed Successfully',
      message: 'EcoBot Alpha has completed cleaning at Central Park Entrance. Review and rating requested.',
      timestamp: '2 minutes ago',
      isRead: false,
      actionType: 'task_completed',
      actionData: { taskId: '1', location: 'Central Park Entrance' }
    },
    {
      id: '2',
      type: 'warning',
      title: 'Robot Battery Low',
      message: 'EcoBot Gamma battery level is at 15%. Returning to charging station automatically.',
      timestamp: '15 minutes ago',
      isRead: false,
      actionType: 'robot_status',
      actionData: { robotId: 'EB-003', batteryLevel: 15 }
    },
    {
      id: '3',
      type: 'info',
      title: 'New Task Assigned',
      message: 'A new high-priority cleaning task has been assigned to EcoBot Beta at Shopping District.',
      timestamp: '1 hour ago',
      isRead: true,
      actionType: 'task_completed',
      actionData: { taskId: '2', location: 'Shopping District' }
    },
    {
      id: '4',
      type: 'success',
      title: 'Streak Milestone Achieved!',
      message: 'Congratulations! You\'ve maintained a 10-day cleaning streak. Keep up the great work!',
      timestamp: '2 hours ago',
      isRead: true,
      actionType: 'system_alert'
    },
    {
      id: '5',
      type: 'info',
      title: 'Weekly Report Available',
      message: 'Your weekly cleaning performance report is ready for review.',
      timestamp: '1 day ago',
      isRead: true,
      actionType: 'system_alert'
    },
    {
      id: '6',
      type: 'error',
      title: 'Robot Maintenance Required',
      message: 'EcoBot Alpha requires scheduled maintenance. Please contact support.',
      timestamp: '2 days ago',
      isRead: false,
      actionType: 'robot_status',
      actionData: { robotId: 'EB-001', issue: 'maintenance_required' }
    }
  ]);

  const [settings, setSettings] = useState({
    taskCompletion: true,
    robotStatus: true,
    systemAlerts: true,
    reviewReminders: true,
    emailNotifications: false,
    pushNotifications: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAsUnread = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: false } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const todayNotifications = notifications.filter(n => 
    n.timestamp.includes('minute') || n.timestamp.includes('hour')
  );
  const olderNotifications = notifications.filter(n => 
    n.timestamp.includes('day')
  );

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
              <div className="relative">
                <Bell className="h-6 w-6 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notification Center</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All as Read
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All Notifications ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Today's Notifications */}
            {todayNotifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Today</span>
                </h3>
                <div className="space-y-3">
                  {todayNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`border-l-4 ${getNotificationColor(notification.type)} ${
                        !notification.isRead ? 'ring-2 ring-blue-200' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                              </div>
                              <p className={`text-sm ${!notification.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-4">
                            {notification.isRead ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsUnread(notification.id)}
                                className="p-1"
                              >
                                <EyeOff className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Action buttons for specific notification types */}
                        {notification.actionType === 'task_completed' && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => onNavigate('reviews')}
                                className="text-xs"
                              >
                                Write Review
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => onNavigate('tasks')}
                                className="text-xs"
                              >
                                View Task
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {notification.actionType === 'robot_status' && (
                          <div className="mt-3 pt-3 border-t">
                            <Button 
                              size="sm"
                              onClick={() => onNavigate('robots')}
                              className="text-xs"
                            >
                              Check Robot Status
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Older Notifications */}
            {olderNotifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Earlier</span>
                </h3>
                <div className="space-y-3">
                  {olderNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`border-l-4 ${getNotificationColor(notification.type)} ${
                        !notification.isRead ? 'ring-2 ring-blue-200' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                              </div>
                              <p className={`text-sm ${!notification.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-4">
                            {notification.isRead ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsUnread(notification.id)}
                                className="p-1"
                              >
                                <EyeOff className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="p-1"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {notifications.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-600">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-6">
            {unreadCount > 0 ? (
              <div className="space-y-3">
                {notifications.filter(n => !n.isRead).map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`border-l-4 ${getNotificationColor(notification.type)} ring-2 ring-blue-200`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            </div>
                            <p className="text-sm text-gray-700">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="p-1"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-600">All caught up!</h3>
                  <p className="text-gray-500">No unread notifications.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Task Completion</h4>
                      <p className="text-sm text-gray-600">Get notified when cleaning tasks are completed</p>
                    </div>
                    <Button
                      variant={settings.taskCompletion ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings({...settings, taskCompletion: !settings.taskCompletion})}
                    >
                      {settings.taskCompletion ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Robot Status Updates</h4>
                      <p className="text-sm text-gray-600">Receive updates about robot status and issues</p>
                    </div>
                    <Button
                      variant={settings.robotStatus ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings({...settings, robotStatus: !settings.robotStatus})}
                    >
                      {settings.robotStatus ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">System Alerts</h4>
                      <p className="text-sm text-gray-600">Important system messages and updates</p>
                    </div>
                    <Button
                      variant={settings.systemAlerts ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings({...settings, systemAlerts: !settings.systemAlerts})}
                    >
                      {settings.systemAlerts ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Review Reminders</h4>
                      <p className="text-sm text-gray-600">Reminders to review completed tasks</p>
                    </div>
                    <Button
                      variant={settings.reviewReminders ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSettings({...settings, reviewReminders: !settings.reviewReminders})}
                    >
                      {settings.reviewReminders ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Delivery Methods</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Push Notifications</h5>
                        <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                      </div>
                      <Button
                        variant={settings.pushNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({...settings, pushNotifications: !settings.pushNotifications})}
                      >
                        {settings.pushNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Email Notifications</h5>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Button
                        variant={settings.emailNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                      >
                        {settings.emailNotifications ? "On" : "Off"}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <Button className="w-full">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}