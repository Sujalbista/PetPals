
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  // Update local state when initialValue changes (e.g., when filters are cleared)
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for pets by breed, age, location..."
          className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          type="submit" 
          className="flex-grow md:flex-grow-0 bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple"
        >
          Search
        </Button>
        <Button variant="outline" className="md:w-auto flex items-center dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
