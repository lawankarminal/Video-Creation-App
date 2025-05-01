import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SendToBack, Upload, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';

const PublishForm = ({ video }) => {
  const { publishContent, loading } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description,
    tags: video.tags.join(', '),
    platforms: [],
  });
  
  const platformOptions = [
    { value: 'youtube', label: 'YouTube Shorts', color: 'bg-red-500' },
    { value: 'instagram', label: 'Instagram Reels', color: 'bg-pink-500' },
    { value: 'tiktok', label: 'TikTok', color: 'bg-black' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const togglePlatform = (platform) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.platforms.length === 0) {
      alert('Please select at least one platform to publish to');
      return;
    }
    
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const success = await publishContent(video.id, formData.platforms, {
      title: formData.title,
      description: formData.description,
      tags,
    });
    
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={100}
        />
        <p className="mt-1 text-xs text-gray-500 flex justify-between">
          <span>Make it catchy and descriptive</span>
          <span>{formData.title.length}/100</span>
        </p>
      </div>
      
      <div className="relative mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500 flex justify-between">
          <span>Include relevant keywords and calls to action</span>
          <span>{formData.description.length}/500</span>
        </p>
      </div>
      
      <div className="relative mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center">
            <Tag size={16} className="mr-2 text-purple-600" />
            <span>Tags</span>
          </div>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with commas"
        />
        <p className="mt-1 text-xs text-gray-500">
          Add relevant tags to help your content get discovered (e.g., productivity, tips, howto)
        </p>
      </div>
      
      <div className="relative mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {platformOptions.map(platform => (
            <button
              key={platform.value}
              type="button"
              className={`border rounded-lg p-3 flex flex-col items-center text-center transition-all ${
                formData.platforms.includes(platform.value)
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => togglePlatform(platform.value)}
            >
              <div className={`w-8 h-8 rounded-full ${platform.color} mb-2 flex items-center justify-center`}>
                <SendToBack size={16} className="text-white" />
              </div>
              <span className="font-medium">{platform.label}</span>
            </button>
          ))}
        </div>
        {formData.platforms.length === 0 && (
          <p className="mt-2 text-xs text-red-500">Please select at least one platform</p>
        )}
      </div>
      
      <div className="pt-4 border-t">
        <Button
          type="submit"
          isLoading={loading}
          fullWidth
          icon={<Upload size={18} />}
        >
          Publish Content
        </Button>
        <p className="mt-2 text-center text-sm text-gray-500">
          Content will be published to the selected platforms with the provided details.
        </p>
      </div>
    </form>
  );
};

export default PublishForm;