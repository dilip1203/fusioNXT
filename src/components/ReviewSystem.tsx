import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  MessageSquare, 
  Camera,
  ThumbsUp,
  ThumbsDown,
  Award,
  Send
} from 'lucide-react';

interface ReviewSystemProps {
  onNavigate: (page: string) => void;
}

interface CompletedTask {
  id: string;
  location: string;
  completedAt: string;
  robotId: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  hasReview: boolean;
  rating?: number;
  feedback?: string;
}

interface Review {
  id: string;
  taskId: string;
  location: string;
  rating: number;
  feedback: string;
  createdAt: string;
  isPublic: boolean;
}

export function ReviewSystem({ onNavigate }: ReviewSystemProps) {
  const [completedTasks] = useState<CompletedTask[]>([
    {
      id: '1',
      location: 'Central Park Entrance',
      completedAt: '2 hours ago',
      robotId: 'EB-001',
      duration: '1h 45m',
      beforeImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300',
      afterImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
      hasReview: false
    },
    {
      id: '2',
      location: 'Shopping District',
      completedAt: '4 hours ago',
      robotId: 'EB-003',
      duration: '1h 45m',
      beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      afterImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
      hasReview: true,
      rating: 5,
      feedback: 'Excellent cleaning job! The area looks spotless.'
    },
    {
      id: '3',
      location: 'Riverside Walk',
      completedAt: '1 day ago',
      robotId: 'EB-002',
      duration: '50m',
      beforeImage: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e9?w=300',
      afterImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300',
      hasReview: true,
      rating: 4,
      feedback: 'Good job overall, but missed a few spots near the benches.'
    }
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      taskId: '2',
      location: 'Shopping District',
      rating: 5,
      feedback: 'Excellent cleaning job! The area looks spotless.',
      createdAt: '4 hours ago',
      isPublic: true
    },
    {
      id: '2',
      taskId: '3',
      location: 'Riverside Walk',
      rating: 4,
      feedback: 'Good job overall, but missed a few spots near the benches.',
      createdAt: '1 day ago',
      isPublic: true
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = async () => {
    if (!selectedTask || rating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSelectedTask(null);
      setRating(0);
      setFeedback('');
      setIsSubmitting(false);
      // In a real app, this would update the completedTasks state
    }, 1500);
  };

  const renderStars = (value: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

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
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Review System</h1>
                <p className="text-sm text-gray-600">Rate and review completed cleaning tasks</p>
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
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600 fill-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {completedTasks.filter(t => !t.hasReview).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Review Score</p>
                  <p className="text-3xl font-bold text-green-600">A+</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="completed">Completed Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Review Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {selectedTask ? (
              // Review Form
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span>Submit Review</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Task Details */}
                    <div>
                      <h3 className="font-semibold mb-4">
                        {completedTasks.find(t => t.id === selectedTask)?.location}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Rate the cleaning quality (1-5 stars)</Label>
                          <div className="mt-2">
                            {renderStars(rating, true)}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="feedback">Additional Feedback</Label>
                          <Textarea
                            id="feedback"
                            placeholder="Share your thoughts about the cleaning quality, efficiency, or any issues..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Before/After Images */}
                    <div>
                      <h4 className="font-semibold mb-4">Before & After Comparison</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Before</p>
                          <img
                            src={completedTasks.find(t => t.id === selectedTask)?.beforeImage}
                            alt="Before cleaning"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">After</p>
                          <img
                            src={completedTasks.find(t => t.id === selectedTask)?.afterImage}
                            alt="After cleaning"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={rating === 0 || isSubmitting}
                      className="flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTask(null);
                        setRating(0);
                        setFeedback('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Completed Tasks List
              <div className="grid gap-6">
                {completedTasks.filter(task => !task.hasReview).map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Task Info */}
                        <div className="lg:col-span-2">
                          <h3 className="text-lg font-semibold mb-2">{task.location}</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Completed</p>
                              <p className="font-medium">{task.completedAt}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Duration</p>
                              <p className="font-medium">{task.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Robot</p>
                              <p className="font-medium">{task.robotId}</p>
                            </div>
                          </div>
                        </div>

                        {/* Before/After Preview */}
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Before & After</p>
                          <div className="grid grid-cols-2 gap-2">
                            <img
                              src={task.beforeImage}
                              alt="Before cleaning"
                              className="w-full h-16 object-cover rounded"
                            />
                            <img
                              src={task.afterImage}
                              alt="After cleaning"
                              className="w-full h-16 object-cover rounded"
                            />
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center">
                          <Button
                            onClick={() => setSelectedTask(task.id)}
                            className="w-full"
                          >
                            <Star className="h-4 w-4 mr-2" />
                            Write Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {completedTasks.filter(task => !task.hasReview).length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                      <p className="text-gray-600">No pending reviews at the moment.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{review.location}</h3>
                        <p className="text-sm text-gray-600">{review.createdAt}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{review.feedback}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant={review.isPublic ? "default" : "secondary"}>
                        {review.isPublic ? "Public" : "Private"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter(r => r.rating === stars).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      
                      return (
                        <div key={stars} className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 w-20">
                            <span className="text-sm">{stars}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Positive Feedback</span>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Improvement Needed</span>
                      <div className="flex items-center space-x-2">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">15%</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Common Praise</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Thorough cleaning quality</li>
                        <li>• Fast completion times</li>
                        <li>• Reliable scheduling</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}