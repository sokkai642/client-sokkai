import { Search, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center space-x-4">
        {/* Search Input Section */}
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {/* <Search className="w-5 h-5" /> */}
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>

        {/* Filters Button */}
        <button className="flex items-center space-x-2 px-4 py-3 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden md:inline">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
