import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/common/Header';
import PublishForm from '../components/content/PublishForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PublishContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVideoById, loading } = useApp();
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
  
  // If loading or video not found yet
  if (loading || !video) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            to={`/content/${id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Content</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900">Publish to Social Media</h1>
          <p className="text-gray-600">
            Customize how your content will appear on social platforms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h2 className="font-medium text-gray-900">{video.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {video.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PublishForm video={video} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublishContent;