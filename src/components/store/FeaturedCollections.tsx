import { Button } from "@/components/ui/button";
import { Leaf, BookOpen, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const navigate = useNavigate();

  const handleNavigate = (category: string) => {
    navigate(`/store?category=${category}`);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Featured Collections</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-pet-green-light dark:bg-pet-green-dark/10 rounded-lg p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl md:text-xl font-bold mb-2 text-pet-purple">Eco-Friendly Products</h3>
            <p className="mb-4 text-gray-700 dark:text-300">Sustainable pet products that are good for your pet and the planet.</p>
            <Button 
              variant="outline" 
              className="bg-white dark:bg-gray-800 text-pet-green hover:text-white dark:text-pet-green-light border-pet-green dark:border-pet-green-light hover:bg-pet-green dark:hover:bg-pet-green-light/20"
              onClick={() => handleNavigate("eco-friendly")}
            >
              Shop Now
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <Leaf className="w-full h-full text-pet-green dark:text-pet-green-light" />
          </div>
        </div>
        
        <div className="bg-pet-orange-light dark:bg-pet-orange-dark/10 rounded-lg p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl md:text-xl font-bold mb-2 text-pet-purple">Training Essentials</h3>
            <p className="mb-4 text-gray-700 dark:text-300">Everything you need to train your pet effectively and humanely.</p>
            <Button 
              variant="outline" 
              className="bg-white dark:bg-gray-800 text-pet-orange hover:text-white dark:text-pet-orange-light border-pet-orange dark:border-pet-orange-light hover:bg-pet-orange dark:hover:bg-pet-orange-light/20"
              onClick={() => handleNavigate("training")}
            >
              Shop Now
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <BookOpen className="w-full h-full text-pet-orange dark:text-pet-orange-light" />
          </div>
        </div>
        
        <div className="bg-pet-blue-light dark:bg-pet-blue-dark/10 rounded-lg p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl md:text-xl font-bold mb-2 text-pet-purple">New Arrivals</h3>
            <p className="mb-4 text-gray-700 dark:text-300">Check out the latest and greatest products for your pets.</p>
            <Button 
              variant="outline" 
              className="bg-white dark:bg-gray-800 text-pet-blue hover:text-white dark:text-pet-blue-light border-pet-blue dark:border-pet-blue-light hover:bg-pet-blue dark:hover:bg-pet-blue-light/20"
              onClick={() => handleNavigate("new-arrivals")}
            >
              Shop Now
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 opacity-20 group-hover:opacity-30 transition-opacity">
            <Package className="w-full h-full text-pet-blue dark:text-pet-blue-light" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
