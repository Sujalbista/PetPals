export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  category?: string;
  petType?: string;
  discountPercentage?: number;
  description?: string;
  quantity?: number;
}

// Sample product data
export const productData: Product[] = [
  {
    id: "1",
    name: "Premium Dog Food - Grain Free Formula",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=500",
    price: 49.99,
    rating: 4.5,
    reviewCount: 128,
    category: "Food",
    petType: "Dogs",
    discountPercentage: 15,
    description: "High-quality grain-free dog food formulated for optimal nutrition and digestive health."
  },
  {
    id: "2",
    name: "Interactive Cat Toy with Feathers",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=500",
    price: 19.99,
    rating: 4.2,
    reviewCount: 84,
    category: "Toys",
    petType: "Cats",
    description: "Engaging feather toy that stimulates your cat's natural hunting instincts."
  },
  {
    id: "3",
    name: "Comfortable Pet Bed - Medium Size",
    image: "https://images.unsplash.com/photo-1567281613786-9a2626e7aeea?auto=format&fit=crop&q=80&w=500",
    price: 59.99,
    rating: 4.7,
    reviewCount: 210,
    category: "Bedding",
    petType: "Dogs",
    discountPercentage: 20,
    description: "Plush, orthopedic pet bed that provides support and comfort for dogs up to 50 pounds."
  },
  {
    id: "4",
    name: "Bird Cage with Play Gym Top",
    image: "https://images.unsplash.com/photo-1502780402662-acc2c5fa4583?auto=format&fit=crop&q=80&w=500",
    price: 89.99,
    rating: 4.3,
    reviewCount: 56,
    category: "Housing",
    petType: "Birds",
    description: "Spacious cage with integrated play area to keep your feathered friend happy and active."
  },
  {
    id: "5",
    name: "Automatic Pet Water Fountain",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&q=80&w=500",
    price: 34.99,
    rating: 4.1,
    reviewCount: 172,
    category: "Feeders",
    petType: "All Pets",
    description: "Circulating water fountain that encourages pets to drink more water for better health."
  },
  {
    id: "6",
    name: "Catnip Toys Bundle - Pack of 5",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=500",
    price: 12.99,
    rating: 4.0,
    reviewCount: 98,
    category: "Toys",
    petType: "Cats",
    discountPercentage: 10,
    description: "Set of 5 catnip-filled toys in various shapes to keep your cat entertained for hours."
  },
  {
    id: "7",
    name: "Adjustable Dog Harness - No Pull",
    image: "https://images.unsplash.com/photo-1605897472359-86aea67b0768?auto=format&fit=crop&q=80&w=500",
    price: 24.99,
    rating: 4.8,
    reviewCount: 243,
    category: "Accessories",
    petType: "Dogs",
    description: "Comfortable harness with multiple adjustment points for a perfect fit and better control on walks."
  },
  {
    id: "8",
    name: "Aquarium Filter System - 20 Gallon",
    image: "https://images.unsplash.com/photo-1559488750-8a980fd5d9fa?auto=format&fit=crop&q=80&w=500",
    price: 42.99,
    rating: 4.4,
    reviewCount: 67,
    category: "Equipment",
    petType: "Fish",
    description: "Efficient filtration system that keeps aquarium water clear and healthy for your fish."
  },
];
