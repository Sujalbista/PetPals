
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

export interface PetProfileCardProps {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  bio: string;
  image: string;
  popularityScore: number;
  isVerified?: boolean;
  tags: string[];
}

const PetProfileCard = ({ 
  name, 
  species, 
  breed, 
  age, 
  owner, 
  bio, 
  image, 
  isVerified,
  tags 
}: PetProfileCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} the ${breed}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full dark:bg-gray-800/80 dark:hover:bg-gray-700" 
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <Heart className={`h-5 w-5 ${isFollowing ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}`} />
        </Button>
        <Badge className="absolute bottom-2 left-2 bg-pet-purple text-white dark:bg-pet-purple-light dark:text-gray-900">
          {species}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <CardTitle className="text-lg dark:text-white">{name}</CardTitle>
            {isVerified && (
              <CheckCircle className="h-4 w-4 ml-1 text-pet-purple dark:text-pet-purple-light" />
            )}
          </div>
        </div>
        <CardDescription className="text-sm mt-1 dark:text-gray-400">
          <span className="font-medium">{breed}</span> · {age}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {bio}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>Owner: {owner}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-pet-purple-light text-pet-purple border-pet-purple-light dark:bg-gray-700 dark:text-pet-purple-light dark:border-gray-700">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full ${isFollowing 
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600' 
            : 'bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple'}`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetProfileCard;
