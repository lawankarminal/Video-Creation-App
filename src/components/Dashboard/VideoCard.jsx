import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useEffect } from 'react';

const VideoCard = ({ video }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const getPlatformBadges = () => {
    return video.platforms.map(platform => {
      const platformStyles = {
        youtube: 'bg-red-100 text-red-800 p-6',
        instagram: 'bg-pink-100 text-pink-800 p-6',
        tiktok: 'bg-black text-white p-6',
      };
      
      return (
        <span
          key={platform}
          className={`${platformStyles[platform]} px-2 py-1 text-xs font-medium rounded-full`}
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </span>
      );
    });
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-md duration-200">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <div className="absolute top-2 right-2 inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg cursor-pointer transition-all ease-out duration-200 bg-teal-600 text-white hover:bg-teal-700">
          <StatusBadge status={video.status} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Link to={`/content/${video.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-purple-600 transition-colors">
            {video.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(video.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{video.duration}s</span>
          </div>
        </div>
        
        {video.tags.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <Tag size={14} className="mr-1" />
            <span className="truncate">
              {video.tags.slice(0, 3).join(', ')}
              {video.tags.length > 3 && '...'}
            </span>
          </div>
        )}
        
        {video.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {getPlatformBadges()}
          </div>
        )}
        
        {video.status === 'published' && (
          <div className="grid grid-cols-3 gap-2 mt-2 p-2 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-500">Views</p>
              <p className="font-semibold">{video.views}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Likes</p>
              <p className="font-semibold">{video.likes}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Shares</p>
              <p className="font-semibold">{video.shares}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;