import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { mockVideos } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setVideos(mockVideos);
  }, []);
  
  const generateContent = async (params) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newVideo = {
        id: Date.now().toString(),
        title: `Video about ${params.topic}`,
        description: `A ${params.duration} second ${params.style} video about ${params.topic} with a ${params.tone} tone, targeted at ${params.targetAudience}.`,
        thumbnail: `https://picsum.photos/seed/${params.topic}-${Date.now()}/300/200`,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft',
        duration: params.duration,
        tags: params.topic.split(' '),
        platforms: [],
      };
      
      setVideos(prev => [newVideo, ...prev]);
      setLoading(false);
      toast.success('Content generated successfully!');
      return newVideo;
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
      setLoading(false);
      return null;
    }
  };
  
  const publishContent = async (videoId, platforms, metadata) => {
    setLoading(true);
    
    try {
      const videoIndex = videos.findIndex(v => v.id === videoId);
      if (videoIndex === -1) {
        throw new Error('Video not found');
      }
      
      const updatedVideos = [...videos];
      updatedVideos[videoIndex] = {
        ...updatedVideos[videoIndex],
        status: 'processing',
        platforms,
        ...(metadata.title && { title: metadata.title }),
        ...(metadata.description && { description: metadata.description }),
        ...(metadata.tags && { tags: metadata.tags }),
        updatedAt: new Date().toISOString(),
      };
      setVideos(updatedVideos);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      updatedVideos[videoIndex] = {
        ...updatedVideos[videoIndex],
        status: 'published',
        views: 0,
        likes: 0,
        shares: 0,
      };
      setVideos(updatedVideos);
      
      setLoading(false);
      toast.success(`Published to ${platforms.join(', ')} successfully!`);
      return true;
    } catch (error) {
      const videoIndex = videos.findIndex(v => v.id === videoId);
      if (videoIndex !== -1) {
        const updatedVideos = [...videos];
        updatedVideos[videoIndex] = {
          ...updatedVideos[videoIndex],
          status: 'failed',
          updatedAt: new Date().toISOString(),
        };
        setVideos(updatedVideos);
      }
      
      toast.error('Failed to publish content. Please try again.');
      setLoading(false);
      return false;
    }
  };
  
  const getVideoById = (id) => {
    return videos.find(v => v.id === id);
  };
  
  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    toast.success('Video deleted successfully');
  };
  
  const updateVideo = (id, data) => {
    const videoIndex = videos.findIndex(v => v.id === id);
    if (videoIndex !== -1) {
      const updatedVideos = [...videos];
      updatedVideos[videoIndex] = {
        ...updatedVideos[videoIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setVideos(updatedVideos);
      toast.success('Video updated successfully');
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        videos,
        loading,
        generateContent,
        publishContent,
        getVideoById,
        deleteVideo,
        updateVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};