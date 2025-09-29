import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { LocationSetter } from './components/LocationSetter';
import { TaskManagement } from './components/TaskManagement';
import { ReviewSystem } from './components/ReviewSystem';
import { NotificationCenter } from './components/NotificationCenter';
import { StreakTracker } from './components/StreakTracker';

type Page = 'login' | 'home' | 'location' | 'capture' | 'tasks' | 'reviews' | 'notifications' | 'streaks' | 'schedule' | 'robots';

interface UserCredentials {
  email: string;
  password: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<UserCredentials | null>(null);

  const handleLogin = (credentials: UserCredentials) => {
    // In a real app, this would validate credentials with a backend
    setUser(credentials);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Mock capture functionality
  const CaptureComponent = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Camera Capture</h2>
          <p className="text-gray-600 mb-6">
            This feature would access your device's camera to capture photos of waste areas for AI analysis and automatic task creation.
          </p>
          <div className="space-y-4">
            <button
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => alert('Camera access would be requested here')}
            >
              Open Camera
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => handleNavigate('home')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user && currentPage !== 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'home':
        return <HomePage onNavigate={handleNavigate} userEmail={user?.email || ''} />;
      case 'location':
        return <LocationSetter onNavigate={handleNavigate} />;
      case 'capture':
        return <CaptureComponent />;
      case 'tasks':
      case 'schedule':
      case 'robots':
        return <TaskManagement onNavigate={handleNavigate} />;
      case 'reviews':
        return <ReviewSystem onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationCenter onNavigate={handleNavigate} />;
      case 'streaks':
        return <StreakTracker onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} userEmail={user?.email || ''} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}