
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/cards/ProductCard";
import { Search, Filter, ShoppingCart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import StoreFilters from "@/components/store/StoreFilters";
import FeaturedCollections from "@/components/store/FeaturedCollections";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
// Sample product data
import { productData } from "@/data/productData";

const Store = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [activeFilters, setActiveFilters] = useState({
    petType: "all",
    categories: [],
    priceRange: [0, 100],
    onSale: false
  });
  
  const { addToCart } = useCart();
  
  // Filter products based on search query and active filters
  useEffect(() => {
    let result = productData;
    
    // Search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Pet type filter (handled by Tabs)
    if (activeFilters.petType !== "all") {
      result = result.filter(product => 
        product.petType === activeFilters.petType || product.petType === "All Pets"
      );
    }
    
    // Category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Sale filter
    if (activeFilters.onSale) {
      result = result.filter(product => product.discountPercentage);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, activeFilters]);
  
  // Handle adding a product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast(`${product.name} added to cart`, {
      description: `$${product.discountPercentage 
        ? (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2) 
        : product.price.toFixed(2)}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart")
      }
    });
  };
  
  // Toggle category filter
  const toggleCategoryFilter = (category) => {
    setActiveFilters(prev => {
      const categories = prev.categories.includes(category) 
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      petType: "all",
      categories: [],
      priceRange: [0, 100],
      onSale: false
    });
    setSearchQuery("");
  };

  // Handle pet type change
  const handlePetTypeChange = (value) => {
    setActiveFilters(prev => ({ ...prev, petType: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pet-purple">Pet Products Store</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Shop premium products for your pets. From food to toys, we have everything your furry, feathery, or scaly friends need.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <img 
          src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=2070"
          alt="Pet Store Banner" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pet-purple/80 to-transparent flex items-center">
          <div className="p-8 max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Summer Sale</h2>
            <p className="text-white mb-6">Up to 25% off on selected premium pet products!</p>
            <Button className="bg-white text-pet-purple hover:bg-gray-100">
              <ShoppingCart className="mr-2 h-4 w-4" /> Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2" 
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:w-auto flex items-center">
              <Filter className="mr-2 h-4 w-4" /> Filters
              {(activeFilters.categories.length > 0 || activeFilters.onSale) && (
                <Badge className="ml-2 bg-pet-purple text-white">{activeFilters.categories.length + (activeFilters.onSale ? 1 : 0)}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Narrow down your search with these filters
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-4">
              <StoreFilters 
                activeFilters={activeFilters} 
                setActiveFilters={setActiveFilters} 
                resetFilters={resetFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Product Categories */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant={activeFilters.categories.includes("Food") ? "default" : "outline"} 
            className={`h-auto py-3 ${activeFilters.categories.includes("Food") ? "bg-pet-purple" : ""}`}
            onClick={() => toggleCategoryFilter("Food")}
          >
            Food & Treats
          </Button>
          <Button 
            variant={activeFilters.categories.includes("Toys") ? "default" : "outline"} 
            className={`h-auto py-3 ${activeFilters.categories.includes("Toys") ? "bg-pet-purple" : ""}`}
            onClick={() => toggleCategoryFilter("Toys")}
          >
            Toys & Enrichment
          </Button>
          <Button 
            variant={activeFilters.categories.includes("Bedding") ? "default" : "outline"} 
            className={`h-auto py-3 ${activeFilters.categories.includes("Bedding") ? "bg-pet-purple" : ""}`}
            onClick={() => toggleCategoryFilter("Bedding")}
          >
            Beds & Furniture
          </Button>
          <Button 
            variant={activeFilters.categories.includes("Accessories") ? "default" : "outline"} 
            className={`h-auto py-3 ${activeFilters.categories.includes("Accessories") ? "bg-pet-purple" : ""}`}
            onClick={() => toggleCategoryFilter("Accessories")}
          >
            Grooming
          </Button>
        </div>
      </div>

      {/* Mobile Category Accordion */}
      <div className="block md:hidden mb-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="categories">
            <AccordionTrigger>All Categories</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-2">
                {["Food", "Toys", "Bedding", "Accessories", "Equipment", "Housing", "Feeders"].map((category) => (
                  <Button 
                    key={category}
                    variant={activeFilters.categories.includes(category) ? "default" : "outline"} 
                    className={`h-auto py-2 w-full ${activeFilters.categories.includes(category) ? "bg-pet-purple" : ""}`}
                    onClick={() => toggleCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tabs for Pet Types */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={handlePetTypeChange}>
        <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
          <TabsTrigger value="all">All Pets</TabsTrigger>
          <TabsTrigger value="Dogs">Dogs</TabsTrigger>
          <TabsTrigger value="Cats">Cats</TabsTrigger>
          <TabsTrigger value="Birds">Birds</TabsTrigger>
          <TabsTrigger value="Fish">Fish</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-8">
                <p className="text-gray-500 mb-4">No products match your current filters</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {["Dogs", "Cats", "Birds", "Fish"].map((petType) => (
          <TabsContent key={petType} value={petType} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))
              ) : (
                <div className="col-span-4 text-center py-8">
                  <p className="text-gray-500 mb-4">No products match your current filters</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Featured Collections */}
      <FeaturedCollections />
      
    </div>
  );
};

export default Store;
