
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "@/components/marketplace/SearchBar";
import CategoryButtons from "@/components/marketplace/CategoryButtons";
import PetTabs from "@/components/marketplace/PetTabs";
import AdoptionSection from "@/components/marketplace/AdoptionSection";
import { PetType } from "@/components/marketplace/PetGrid";

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPets, setAllPets] = useState<PetType[]>([]);
  const [filteredPets, setFilteredPets] = useState<PetType[]>(allPets);
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
 
  // Fetch all pets from API on mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log("fetching all pets");
        const res = await fetch("http://localhost:8080/api/pets", {
          method: "GET"});
        const data = await res.json();
        data.forEach((data)=>console.log(data._id));
        const normalizedPets = data.map((pet: any) => ({
          ...pet,
          id: pet.id || pet._id || Math.random().toString(), // fallback for test only
        }));
        
        setAllPets(normalizedPets);
        setFilteredPets(normalizedPets);
        
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    fetchPets();
  }, []);

  // Filter pets based on URL parameters
  useEffect(() => {
    let result = [...allPets];
    
    // Apply category filter if present
    if (categoryParam) {
      // Convert URL parameter to match the tag format
      const categoryTag = categoryParam === "dogs" ? "Dog" : 
                         categoryParam === "cats" ? "Cat" : 
                         categoryParam === "small-pets" ? "Small Pet" : 
                         categoryParam === "birds" ? "Bird" : 
                         categoryParam === "fish" ? "Fish" : "";
      
      result = result.filter(pet => {
        return pet.tags.some(tag => tag.toLowerCase() === categoryTag.toLowerCase());
      });
    }
    
    // Apply search filter if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(query) || 
        pet.breed.toLowerCase().includes(query) || 
        pet.location.toLowerCase().includes(query) ||
        pet.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPets(result);
  }, [categoryParam, searchQuery]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pet-purple dark:text-pet-purple-light">Pet Marketplace</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find your perfect furry, feathery, or scaly companion. Browse pets available for adoption
          or purchase from trusted breeders and shelters.
        </p>
      </div>

      {/* Search and Filter */}
      <SearchBar initialValue={searchQuery} onSearch={handleSearch} />

      {/* Pet Categories */}
      <CategoryButtons onSelectCategory={handleCategorySelect} />
      
      {/* Active filters display */}
      {(categoryParam || searchQuery) && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {categoryParam && (
            <span className="bg-pet-purple-light dark:bg-pet-purple-dark/30 text-pet-purple dark:text-pet-purple-light px-3 py-1 rounded-full text-sm">
              Category: {categoryParam.replace("-", " ")}
            </span>
          )}
          {searchQuery && (
            <span className="bg-pet-blue-light dark:bg-pet-blue-light/30 text-pet-blue dark:text-pet-blue-light px-3 py-1 rounded-full text-sm">
              Search: {searchQuery}
            </span>
          )}
          <button 
            onClick={clearFilters} 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-pet-purple dark:hover:text-pet-purple-light underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Tabs for Adoption / For Sale */}
      <PetTabs petData={filteredPets} />

      {/* Educational Block */}
      <AdoptionSection />
    </div>
  );
};

export default Marketplace;
