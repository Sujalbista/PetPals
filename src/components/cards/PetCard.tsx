
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  location: string;
  tags: string[];
  type: "adoption" | "sale";
  price?: number;
  isFavorite?: boolean;
  onAddFavorite?: (petId: string) => void;
  onRemoveFavorite?: (petId: string) => void;
  isLoggedIn: boolean;
}


const PetCard = ({ id, name, breed, age, image, location, tags, type, price,isFavorite,onAddFavorite,onRemoveFavorite,isLoggedIn }: PetCardProps) => {
  const [favorite, setfavorite] = useState<boolean>(false);

  const { addToCart } = useCart();

  // Fallback image handling
  const [imgSrc, setImgSrc] = useState(image);
  const fallbackImage = "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=500";

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const handleAction = () => {
    if (!isLoggedIn) {
      window.location.href = "/signin";
      return;
    }

    if (type === "sale" && price) {
      addToCart({
        id,
        name,
        price,
        image: imgSrc,
        quantity: 1,
        discountPercentage: 0,
      });
      toast.success("Added to cart");
    } else {
      toast.info("Adoption request sent!");
    }
  };
  const handleFavoriteClick = () => {
    setfavorite(!favorite);
    if (!isLoggedIn) {
      window.location.href = "/signin";
      return;
    }
    if(favorite==true){
      onAddFavorite(id);
    }
    else{
      onRemoveFavorite(id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col dark:border-gray-700 dark:bg-gray-800">
      <div className="relative">
        <img 
          src={imgSrc} 
          alt={`${name} the ${breed}`}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-700 rounded-full"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-300"}`}
            />
        </Button>

        <Badge className="absolute bottom-2 left-2 bg-pet-purple text-white dark:bg-pet-purple-light dark:text-gray-900">
          {type === "adoption" ? "Adoption" : "For Sale"}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg dark:text-white">{name}</CardTitle>
          {type === "sale" && price && (
            <span className="text-sm font-medium text-pet-green dark:text-pet-green-light">${price}</span>
          )}
        </div>
        <CardDescription className="flex items-center text-sm mt-1 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400 dark:text-gray-500" />
          {location}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Breed:</span>
            <span className="font-medium dark:text-gray-200">{breed}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Age:</span>
            <span className="font-medium dark:text-gray-200">{age}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-pet-purple-light text-pet-purple border-pet-purple-light dark:bg-pet-purple-light/30 dark:text-pet-purple-light dark:border-pet-purple-light/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-pet-purple hover:bg-pet-purple-dark text-white dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple-light/90 flex items-center gap-2"
          onClick={handleAction}
        >
          {type === "sale" ? (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          ) : (
            "Adopt Me"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
