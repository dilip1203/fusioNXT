import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Navigation,
  Clock,
  AlertCircle
} from 'lucide-react';

interface LocationSetterProps {
  onNavigate: (page: string) => void;
}

interface PinnedLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimatedTime: string;
  status: 'pending' | 'assigned' | 'completed';
}

export function LocationSetter({ onNavigate }: LocationSetterProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pinnedLocations, setPinnedLocations] = useState<PinnedLocation[]>([
    {
      id: '1',
      name: 'Central Park Entrance',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      priority: 'high',
      description: 'Heavy litter accumulation near entrance',
      estimatedTime: '2 hours',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Main Street Plaza',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      priority: 'medium',
      description: 'Regular maintenance cleaning',
      estimatedTime: '1.5 hours',
      status: 'assigned'
    }
  ]);

  const [newLocation, setNewLocation] = useState({
    name: '',
    priority: 'medium' as const,
    description: '',
    estimatedTime: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to mock coordinates
    const lat = 40.7829 + (y / rect.height - 0.5) * 0.02;
    const lng = -73.9654 + (x / rect.width - 0.5) * 0.02;
    
    setSelectedLocation({ lat, lng });
    setShowAddForm(true);
  };

  const handleAddLocation = () => {
    if (selectedLocation && newLocation.name) {
      const location: PinnedLocation = {
        id: Date.now().toString(),
        name: newLocation.name,
        coordinates: selectedLocation,
        priority: newLocation.priority,
        description: newLocation.description,
        estimatedTime: newLocation.estimatedTime,
        status: 'pending'
      };
      
      setPinnedLocations([...pinnedLocations, location]);
      setNewLocation({ name: '', priority: 'medium', description: '', estimatedTime: '' });
      setSelectedLocation(null);
      setShowAddForm(false);
    }
  };

  const handleRemoveLocation = (id: string) => {
    setPinnedLocations(pinnedLocations.filter(loc => loc.id !== id));
  };

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
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <MapPin className="h-6 w-6 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Location Management</h1>
                <p className="text-sm text-gray-600">Pin and manage cleaning locations</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Interface */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Interactive Map</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Click on the map to pin new cleaning locations
              </p>
            </CardHeader>
            <CardContent>
              <div 
                className="relative bg-gradient-to-br from-green-100 to-blue-100 h-96 rounded-lg border-2 border-dashed border-gray-300 cursor-crosshair flex items-center justify-center overflow-hidden"
                onClick={handleMapClick}
              >
                {/* Mock map background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-400"></div>
                    ))}
                  </div>
                </div>
                
                {/* Existing pinned locations */}
                {pinnedLocations.map((location) => (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + (location.coordinates.lng + 73.9654) * 2000}%`,
                      top: `${50 + (40.7829 - location.coordinates.lat) * 2000}%`
                    }}
                  >
                    <div className="bg-red-500 rounded-full p-2 shadow-lg">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ))}
                
                {/* Selected location */}
                {selectedLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + (selectedLocation.lng + 73.9654) * 2000}%`,
                      top: `${50 + (40.7829 - selectedLocation.lat) * 2000}%`
                    }}
                  >
                    <div className="bg-blue-500 rounded-full p-2 shadow-lg animate-pulse">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                {!selectedLocation && pinnedLocations.length === 0 && (
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click anywhere on the map to pin a location</p>
                  </div>
                )}
              </div>
              
              {selectedLocation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Location Selected</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location Form and List */}
          <div className="space-y-6">
            {/* Add Location Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Location Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Central Park Plaza"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={newLocation.priority}
                      onValueChange={(value: 'low' | 'medium' | 'high') => 
                        setNewLocation({ ...newLocation, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="estimatedTime">Estimated Time</Label>
                    <Input
                      id="estimatedTime"
                      placeholder="e.g., 2 hours"
                      value={newLocation.estimatedTime}
                      onChange={(e) => setNewLocation({ ...newLocation, estimatedTime: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the cleaning requirements..."
                      value={newLocation.description}
                      onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleAddLocation} className="flex-1">
                      Add Location
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setSelectedLocation(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Pinned Locations List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Pinned Locations</span>
                  </div>
                  <Badge variant="secondary">{pinnedLocations.length} locations</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pinnedLocations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No locations pinned yet</p>
                    <p className="text-sm">Click on the map to add your first location</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pinnedLocations.map((location) => (
                      <div key={location.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{location.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveLocation(location.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getPriorityColor(location.priority)}>
                            {location.priority} priority
                          </Badge>
                          <Badge className={getStatusColor(location.status)}>
                            {location.status}
                          </Badge>
                        </div>
                        
                        {location.estimatedTime && (
                          <div className="flex items-center space-x-1 mb-2 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{location.estimatedTime}</span>
                          </div>
                        )}
                        
                        {location.description && (
                          <p className="text-sm text-gray-600">{location.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            disabled={pinnedLocations.length === 0}
            onClick={() => onNavigate('schedule')}
          >
            Schedule Cleaning Tasks
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('tasks')}
          >
            View All Tasks
          </Button>
        </div>
      </main>
    </div>
  );
}