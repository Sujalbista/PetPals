
import { Button } from "@/components/ui/button";
import { Dog, Cat, Rabbit, Bird, Fish } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Dog, label: "Dogs", param: "dogs" },
  { icon: Cat, label: "Cats", param: "cats" },
  { icon: Rabbit, label: "Small Pets", param: "small-pets" },
  { icon: Bird, label: "Birds", param: "birds" },
  { icon: Fish, label: "Fish", param: "fish" },
];

interface CategoryButtonsProps {
  onSelectCategory?: (category: string) => void;
}

const CategoryButtons = ({ onSelectCategory }: CategoryButtonsProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (param: string) => {
    if (onSelectCategory) {
      onSelectCategory(param);
    } else {
      navigate(`/marketplace?category=${param}`);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Browse by Pet Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant="outline"
            className="flex flex-col items-center py-6 h-auto dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            onClick={() => handleCategoryClick(category.param)}
          >
            <category.icon className="h-8 w-8 mb-2 text-pet-purple dark:text-pet-purple-light" />
            <span className="dark:text-gray-200">{category.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
