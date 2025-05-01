import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import VideoCard from '../components/Dashboard/VideoCard';
import FilterBar from '../components/Dashboard/FilterBar';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { videos, loading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredVideos, setFilteredVideos] = useState([]);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...videos];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        video =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      result = result.filter(video => filters.status.includes(video.status));
    }
    
    // Apply platform filter
    if (filters.platforms && filters.platforms.length > 0) {
      result = result.filter(
        video =>
          video.platforms.length > 0 &&
          video.platforms.some(platform => filters.platforms.includes(platform))
      );
    }
    
    setFilteredVideos(result);
  }, [videos, searchQuery, filters]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Content</h1>
            <p className="text-gray-600">Manage and track your video content</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link to="/create">
              <Button icon={<Plus size={18} />}>
                Create New Content
              </Button>
            </Link>
          </div>
        </div>
        
        <FilterBar
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
        />
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600 mb-6">
              {videos.length === 0
                ? "You haven't created any content yet. Get started by creating your first video!"
                : "No videos match your current filters. Try adjusting your search or filters."}
            </p>
            
            {videos.length === 0 && (
              <Link to="/create">
                <Button icon={<Plus size={18} />}>
                  Create Your First Video
                </Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;