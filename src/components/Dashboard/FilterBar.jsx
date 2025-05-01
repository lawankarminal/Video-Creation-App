import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const toggleStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };
  
  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const applyFilters = () => {
    onFilterChange({
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
    });
  };
  
  const resetFilters = () => {
    setSelectedStatuses([]);
    setSelectedPlatforms([]);
    onFilterChange({});
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium ${
              showFilters || selectedStatuses.length > 0 || selectedPlatforms.length > 0
                ? 'bg-purple-100 border-purple-300 text-purple-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>Filters</span>
            {(selectedStatuses.length > 0 || selectedPlatforms.length > 0) && (
              <span className="ml-1 bg-purple-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedStatuses.length + selectedPlatforms.length}
              </span>
            )}
          </button>
          
          <button
            className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              {['draft', 'published', 'processing', 'failed'].map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedStatuses.includes(status)
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {['youtube', 'instagram', 'tiktok'].map((platform) => (
                <button
                  key={platform}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedPlatforms.includes(platform)
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => togglePlatform(platform)}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;