import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetProfileCard from "@/components/cards/PetProfileCard";
import { Search, Filter, Plus, Dog, Cat, Rabbit, Bird, Fish } from "lucide-react";

const petProfiles = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    owner: "John Smith",
    bio: "Friendly and energetic Golden who loves to play fetch and swim. Always ready for adventures and making new friends at the dog park.",
    image: "https://images.unsplash.com/photo-1556866261-8fda5be36d5d?auto=format&fit=crop&q=80&w=500",
    popularityScore: 92,
    isVerified: true,
    tags: ["Friendly", "Active", "Trained"],
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: "2 years",
    owner: "Emma Johnson",
    bio: "Elegant and vocal Siamese who enjoys sitting in sunny spots and observing the world. Loves interactive toys and bird watching.",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=500",
    popularityScore: 85,
    isVerified: true,
    tags: ["Independent", "Intelligent", "Indoor"],
  },
  {
    id: "3",
    name: "Charlie",
    species: "Bird",
    breed: "African Grey Parrot",
    age: "7 years",
    owner: "Michael Davis",
    bio: "Highly intelligent and talkative parrot with an impressive vocabulary. Loves puzzles, mimicking sounds, and being the center of attention.",
    image: "https://images.unsplash.com/photo-1612024782955-49fae79e42bb?auto=format&fit=crop&q=80&w=500",
    popularityScore: 78,
    tags: ["Talkative", "Smart", "Social"],
  },
  {
    id: "4",
    name: "Oreo",
    species: "Rabbit",
    breed: "Dutch",
    age: "1 year",
    owner: "Sophia Martinez",
    bio: "Curious and gentle Dutch rabbit who loves to explore. Enjoys fresh vegetables and has a particular fondness for carrot tops and cilantro.",
    image: "https://images.unsplash.com/photo-1591561582301-7ce6587cc286?auto=format&fit=crop&q=80&w=500",
    popularityScore: 72,
    tags: ["Gentle", "Curious", "Playful"],
  },
  {
    id: "5",
    name: "Rocky",
    species: "Dog",
    breed: "Siberian Husky",
    age: "4 years",
    owner: "William Taylor",
    bio: "Adventurous husky with boundless energy and a love for the outdoors. Enjoys hiking, running, and has completed several dog sledding competitions.",
    image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?auto=format&fit=crop&q=80&w=500",
    popularityScore: 89,
    isVerified: true,
    tags: ["Athletic", "Vocal", "Outdoor"],
  },
  {
    id: "6",
    name: "Nemo",
    species: "Fish",
    breed: "Betta",
    age: "1.5 years",
    owner: "Olivia Brown",
    bio: "Vibrant and captivating betta with striking blue and red coloration. Lives in a planted 5-gallon tank where he enjoys exploring among the aquatic plants.",
    image: "https://images.unsplash.com/photo-1545816250-e12bedba42ba?auto=format&fit=crop&q=80&w=500",
    popularityScore: 65,
    tags: ["Colorful", "Peaceful", "Aquatic"],
  },
  {
    id: "7",
    name: "Bella",
    species: "Cat",
    breed: "Maine Coon",
    age: "5 years",
    owner: "James Wilson",
    bio: "Majestic and gentle giant with a luxurious coat and friendly disposition. Despite her size, she's a gentle soul who enjoys cuddling and being brushed.",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&q=80&w=500",
    popularityScore: 87,
    isVerified: true,
    tags: ["Gentle", "Fluffy", "Large"],
  },
  {
    id: "8",
    name: "Cooper",
    species: "Dog",
    breed: "Australian Shepherd",
    age: "2 years",
    owner: "Daniel Anderson",
    bio: "Intelligent and agile Aussie who excels at agility training and frisbee catching. Always eager to learn new tricks and commands.",
    image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&q=80&w=500",
    popularityScore: 91,
    isVerified: true,
    tags: ["Smart", "Athletic", "Trainable"],
  },
];

const petMilestones = [
  {
    id: "1",
    petName: "Max",
    milestone: "Completed Advanced Obedience Training",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "2",
    petName: "Luna",
    milestone: "First Birthday Celebration",
    date: "April 2, 2024",
    image: "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: "3",
    petName: "Charlie",
    milestone: "Learned 50 New Words",
    date: "February 10, 2024",
    image: "https://images.unsplash.com/photo-1544089429-b90476b0e52a?auto=format&fit=crop&q=80&w=500",
  },
];

const Profiles = () => {
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPets = petProfiles.filter((pet) => {
    const matchesType = selectedPetType ? pet.species.toLowerCase() === selectedPetType.toLowerCase() : true;
    const matchesSearch = searchQuery
      ? pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.owner.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesType && matchesSearch;
  });

  const handlePetTypeSelect = (type: string) => {
    setSelectedPetType(prevType => prevType === type ? null : type);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-pet-purple dark:text-pet-purple-light">Pet Profiles</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover and connect with amazing pets from around the world. Create a profile for your own
          pet to share their unique personality and adventures with our community.
        </p>
      </div>

      {/* Search and Create Profile */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search pet profiles by name, breed, or location..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Button className="bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple-light/90">
          <Plus className="mr-2 h-4 w-4" /> Create Pet Profile
        </Button>
      </div>

      {/* Pet Types */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Browse by Pet Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button 
            variant={selectedPetType === "Dog" ? "default" : "outline"} 
            className={`flex flex-col items-center py-6 h-auto ${
              selectedPetType === "Dog" 
                ? "bg-pet-purple text-white dark:bg-pet-purple-light" 
                : "hover:border-pet-purple hover:text-pet-purple dark:border-gray-700 dark:text-gray-300 dark:hover:border-pet-purple-light dark:hover:text-pet-purple-light"
            }`}
            onClick={() => handlePetTypeSelect("Dog")}
          >
            <Dog className={`h-8 w-8 mb-2 ${selectedPetType === "Dog" ? "text-white" : "text-pet-purple dark:text-pet-purple-light"}`} />
            <span>Dogs</span>
          </Button>
          
          <Button 
            variant={selectedPetType === "Cat" ? "default" : "outline"} 
            className={`flex flex-col items-center py-6 h-auto ${
              selectedPetType === "Cat" 
                ? "bg-pet-purple text-white dark:bg-pet-purple-light" 
                : "hover:border-pet-purple hover:text-pet-purple dark:border-gray-700 dark:text-gray-300 dark:hover:border-pet-purple-light dark:hover:text-pet-purple-light"
            }`}
            onClick={() => handlePetTypeSelect("Cat")}
          >
            <Cat className={`h-8 w-8 mb-2 ${selectedPetType === "Cat" ? "text-white" : "text-pet-purple dark:text-pet-purple-light"}`} />
            <span>Cats</span>
          </Button>
          
          <Button 
            variant={selectedPetType === "Rabbit" ? "default" : "outline"} 
            className={`flex flex-col items-center py-6 h-auto ${
              selectedPetType === "Rabbit" 
                ? "bg-pet-purple text-white dark:bg-pet-purple-light" 
                : "hover:border-pet-purple hover:text-pet-purple dark:border-gray-700 dark:text-gray-300 dark:hover:border-pet-purple-light dark:hover:text-pet-purple-light"
            }`}
            onClick={() => handlePetTypeSelect("Rabbit")}
          >
            <Rabbit className={`h-8 w-8 mb-2 ${selectedPetType === "Rabbit" ? "text-white" : "text-pet-purple dark:text-pet-purple-light"}`} />
            <span>Small Pets</span>
          </Button>
          
          <Button 
            variant={selectedPetType === "Bird" ? "default" : "outline"} 
            className={`flex flex-col items-center py-6 h-auto ${
              selectedPetType === "Bird" 
                ? "bg-pet-purple text-white dark:bg-pet-purple-light" 
                : "hover:border-pet-purple hover:text-pet-purple dark:border-gray-700 dark:text-gray-300 dark:hover:border-pet-purple-light dark:hover:text-pet-purple-light"
            }`}
            onClick={() => handlePetTypeSelect("Bird")}
          >
            <Bird className={`h-8 w-8 mb-2 ${selectedPetType === "Bird" ? "text-white" : "text-pet-purple dark:text-pet-purple-light"}`} />
            <span>Birds</span>
          </Button>
          
          <Button 
            variant={selectedPetType === "Fish" ? "default" : "outline"} 
            className={`flex flex-col items-center py-6 h-auto ${
              selectedPetType === "Fish" 
                ? "bg-pet-purple text-white dark:bg-pet-purple-light" 
                : "hover:border-pet-purple hover:text-pet-purple dark:border-gray-700 dark:text-gray-300 dark:hover:border-pet-purple-light dark:hover:text-pet-purple-light"
            }`}
            onClick={() => handlePetTypeSelect("Fish")}
          >
            <Fish className={`h-8 w-8 mb-2 ${selectedPetType === "Fish" ? "text-white" : "text-pet-purple dark:text-pet-purple-light"}`} />
            <span>Fish</span>
          </Button>
        </div>
        
        {selectedPetType && (
          <div className="mt-4 flex items-center">
            <span className="text-sm mr-2 dark:text-gray-300">Filtered by: {selectedPetType}</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPetType(null)}>
              Clear filter
            </Button>
          </div>
        )}
      </div>

      {/* Tabs for Profiles and Activity */}
      <Tabs defaultValue="popular" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="popular">Popular Pets</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="activity">Pet Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="mt-6">
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPets
                .sort((a, b) => b.popularityScore - a.popularityScore)
                .map((profile) => (
                  <PetProfileCard key={profile.id} {...profile} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-400">No pets found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setSelectedPetType(null);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
          
          {filteredPets.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300">Load More Profiles</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPets
                .slice()
                .reverse()
                .map((profile) => (
                  <PetProfileCard key={profile.id} {...profile} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 dark:text-gray-400">No pets found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  setSelectedPetType(null);
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
          
          {filteredPets.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300">Load More Profiles</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Recent Pet Milestones</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {petMilestones.map((milestone) => (
                <div key={milestone.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={milestone.image} 
                      alt={milestone.milestone} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-1">{milestone.petName}</h4>
                    <p className="text-gray-700 mb-2">{milestone.milestone}</p>
                    <p className="text-gray-500 text-sm">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-4 mt-8">Pet Achievements</h3>
            
            <div className="bg-pet-purple-light rounded-lg p-6">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-pet-purple-dark mb-2">Celebrating Pet Excellence</h4>
                <p className="text-gray-700">
                  Recognize and celebrate the special achievements of pets in our community. From training 
                  certifications to rescue stories, this is where we highlight extraordinary pets.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="inline-block bg-pet-purple rounded-full p-3 mb-3">
                    <Dog className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="font-bold mb-1">Therapy Dog of the Month</h5>
                  <p className="text-gray-600">Cooper - Bringing joy to hospital patients</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="inline-block bg-pet-purple rounded-full p-3 mb-3">
                    <Cat className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="font-bold mb-1">Rescue Story Spotlight</h5>
                  <p className="text-gray-600">Bella - From shelter to loving home</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="inline-block bg-pet-purple rounded-full p-3 mb-3">
                    <Bird className="h-6 w-6 text-white" />
                  </div>
                  <h5 className="font-bold mb-1">Talented Pet Award</h5>
                  <p className="text-gray-600">Charlie - Mastered 100+ words and phrases</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Profile CTA */}
      <div className="mt-16 bg-gradient-to-r from-pet-purple to-pet-purple-dark dark:from-pet-purple-light dark:to-pet-purple rounded-lg overflow-hidden">
        <div className="md:flex items-center">
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white dark:text-gray-900">Create Your Pet's Profile</h2>
            <p className="text-white/90 dark:text-gray-800 mb-6">
              Share your pet's personality, adventures, and special moments with our community.
              Connect with other pet owners and join a network of pet lovers around the world.
            </p>
            <div className="space-y-4">
              <Button className="bg-white text-pet-purple hover:bg-gray-100 dark:bg-gray-900 dark:text-pet-purple-light dark:hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" /> Get Started
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 h-full">
            <img 
              src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=500" 
              alt="Happy pets" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
