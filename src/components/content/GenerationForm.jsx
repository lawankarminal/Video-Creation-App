import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, Users, Palette, Bookmark } from 'lucide-react';
import { mockGenerationStyles, mockTones, mockAudiences } from '../../data/mockData';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';

const GenerationForm = () => {
  const { generateContent, loading } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    style: mockGenerationStyles[0],
    duration: 60,
    tone: mockTones[0],
    targetAudience: mockAudiences[0],
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value, 10) : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.topic) {
      alert('Please enter a topic');
      return;
    }
    
    // Generate content
    const result = await generateContent(formData);
    
    // Navigate to the new content if successful
    if (result) {
      navigate(`/content/${result.id}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center mb-1">
            <Sparkles size={16} className="mr-2 text-purple-600" />
            <span>What would you like to create a video about?</span>
          </div>
        </label>
        <textarea
          id="topic"
          name="topic"
          rows={3}
          placeholder="Enter a topic or describe the video content you want to create..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          value={formData.topic}
          onChange={handleChange}
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Be as detailed as possible for better results (e.g., "5 productivity hacks for remote workers")
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative mb-4">
          <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Palette size={16} className="mr-2 text-purple-600" />
              <span>Content Style</span>
            </div>
          </label>
          <select
            id="style"
            name="style"
            className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.style}
            onChange={handleChange}
          >
            {mockGenerationStyles.map(style => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative mb-4">
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Bookmark size={16} className="mr-2 text-purple-600" />
              <span>Tone</span>
            </div>
          </label>
          <select
            id="tone"
            name="tone"
            className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.tone}
            onChange={handleChange}
          >
            {mockTones.map(tone => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-purple-600" />
              <span>Duration (seconds)</span>
            </div>
          </label>
          <input
            type="range"
            id="duration"
            name="duration"
            min="15"
            max="120"
            step="15"
            className="w-full"
            value={formData.duration}
            onChange={handleChange}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>15s</span>
            <span className="font-semibold">{formData.duration}s</span>
            <span>120s</span>
          </div>
        </div>
        
        <div className="relative mb-4">
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-purple-600" />
              <span>Target Audience</span>
            </div>
          </label>
          <select
            id="targetAudience"
            name="targetAudience"
            className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-gray-100 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.targetAudience}
            onChange={handleChange}
          >
            {mockAudiences.map(audience => (
              <option key={audience} value={audience}>
                {audience}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <Button
          type="submit"
          isLoading={loading}
          fullWidth
          icon={<Sparkles size={18} />}
          className="text-lg py-3"
        >
          Generate Video Content
        </Button>
        <p className="mt-2 text-center text-sm text-gray-500">
          This will create a draft that you can review before publishing to social platforms.
        </p>
      </div>
    </form>
  );
};

export default GenerationForm;