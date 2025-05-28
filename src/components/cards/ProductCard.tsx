
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  category?: string;
  petType?: string;
  discountPercentage?: number;
  onAddToCart?: () => void;
}

const ProductCard = ({ 
  name, 
  image, 
  price, 
  rating, 
  reviewCount, 
  category, 
  petType, 
  discountPercentage,
  onAddToCart
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const discountedPrice = discountPercentage 
    ? price - (price * (discountPercentage / 100)) 
    : price;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col dark:border-gray-700 dark:bg-gray-800">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700 p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {discountPercentage && (
          <Badge className="absolute top-2 left-2 bg-pet-orange text-white dark:bg-pet-orange-light dark:text-gray-900">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-700 rounded-full" 
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-300'}`} />
        </Button>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex flex-col">
          <Badge 
            variant="outline" 
            className="w-fit text-xs mb-2 bg-pet-blue-light text-pet-blue border-pet-blue-light dark:bg-pet-blue-light/20 dark:text-pet-blue-light dark:border-pet-blue-light/30"
          >
            {petType}
          </Badge>
          <CardTitle className="text-base line-clamp-2 h-12 dark:text-white">{name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
            />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({reviewCount})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-bold text-lg dark:text-white">${discountedPrice.toFixed(2)}</span>
          {discountPercentage && (
            <span className="text-gray-400 dark:text-gray-500 text-sm line-through">${price.toFixed(2)}</span>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-900 dark:hover:bg-pet-purple"
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
