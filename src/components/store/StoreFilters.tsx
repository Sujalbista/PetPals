
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FiltersProps {
  activeFilters: {
    petType: string;
    categories: string[];
    priceRange: number[];
    onSale: boolean;
  };
  setActiveFilters: (filters: any) => void;
  resetFilters: () => void;
}

const StoreFilters = ({ activeFilters, setActiveFilters, resetFilters }: FiltersProps) => {
  const categories = [
    "Food",
    "Toys",
    "Bedding",
    "Accessories",
    "Equipment",
    "Housing",
    "Feeders"
  ];
  
  const petTypes = [
    "Dogs",
    "Cats",
    "Birds",
    "Fish",
    "Small Pets",
    "Reptiles"
  ];
  
  // Toggle category filter
  const toggleCategory = (category: string) => {
    setActiveFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
  };
  
  // Toggle pet type filter
  const togglePetType = (type: string) => {
    setActiveFilters(prev => ({
      ...prev,
      petType: prev.petType === type ? "all" : type
    }));
  };
  
  // Toggle sale filter
  const toggleSaleFilter = () => {
    setActiveFilters(prev => ({
      ...prev,
      onSale: !prev.onSale
    }));
  };
  
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={activeFilters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`category-${category}`} className="cursor-pointer">{category}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Pet Types */}
      <div>
        <h3 className="text-lg font-medium mb-3">Pet Type</h3>
        <div className="space-y-2">
          {petTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`pet-${type}`} 
                checked={activeFilters.petType === type}
                onCheckedChange={() => togglePetType(type)}
              />
              <Label htmlFor={`pet-${type}`} className="cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      {/* Special Filters */}
      <div>
        <h3 className="text-lg font-medium mb-3">Special Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sale-items" 
              checked={activeFilters.onSale}
              onCheckedChange={toggleSaleFilter}
            />
            <Label htmlFor="sale-items" className="cursor-pointer">On Sale</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <Button className="w-full" variant="outline" onClick={resetFilters}>
        Reset All Filters
      </Button>
    </div>
  );
};

export default StoreFilters;
