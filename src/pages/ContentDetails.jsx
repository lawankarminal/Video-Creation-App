import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Tag, Calendar, ArrowLeft, Edit, Trash2, Upload } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVideoById, deleteVideo, loading } = useApp();
  const [video, setVideo] = useState(id ? getVideoById(id) : undefined);
  
  // Fetch video on mount and when ID changes
  useEffect(() => {
    if (id) {
      const foundVideo = getVideoById(id);
      setVideo(foundVideo);
      
      // If video not found, redirect to 404
      if (!foundVideo) {
        navigate('/404');
      }
    }
  }, [id, getVideoById, navigate]);
  
  // Handle delete video
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      if (id) {
        deleteVideo(id);
        navigate('/');
      }
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // If loading or video not found yet
  if (loading || !video) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <StatusBadge status={video.status} />
                <span className="text-sm text-gray-500 ">
                  <Clock size={14} className="inline mr-1" />
                  {video.duration}s
                </span>
                <span className="text-sm text-gray-500">
                  <Calendar size={14} className="inline mr-1" />
                  {formatDate(video.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              {video.status === 'draft' && (
                <Link to={`/publish/${video.id}`}>
                  <Button
                    variant="primary"
                    icon={<Upload size={16} />}
                  >
                    Publish
                  </Button>
                </Link>
              )}
              
              <Button
                variant="outline"
                icon={<Edit size={16} />}
                onClick={() => navigate(`/publish/${video.id}`)}
              >
                Edit
              </Button>
              
              <Button
                variant="outline"
                icon={<Trash2 size={16} />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 mb-6">{video.description}</p>
            
            {video.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 flex items-center">
                  <Tag size={16} className="mr-2" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {video.platforms.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Published to</h2>
                <div className="flex flex-wrap gap-2">
                  {video.platforms.map(platform => {
                    const platformStyles = {
                      youtube: 'bg-red-100 text-red-800',
                      instagram: 'bg-pink-100 text-pink-800',
                      tiktok: 'bg-gray-800 text-white',
                    };
                    
                    return (
                      <span
                        key={platform}
                        className={`${platformStyles[platform]} px-3 py-1 rounded-full text-sm`}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            
            {video.status === 'published' && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Performance</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-500 mb-1">Views</h3>
                    <p className="text-2xl font-bold text-gray-900">{video.views}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-500 mb-1">Likes</h3>
                    <p className="text-2xl font-bold text-gray-900">{video.likes}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm text-gray-500 mb-1">Shares</h3>
                    <p className="text-2xl font-bold text-gray-900">{video.shares}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentDetails;