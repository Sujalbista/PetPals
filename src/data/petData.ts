export type PetType = {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  location: string;
  tags: string[];
  type: "adoption" | "sale";
  price?: number;
};

export const petData: PetType[] = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500",
    location: "Los Angeles, CA",
    tags: ["Dog", "Friendly", "Trained"],
    type: "adoption"
  },
  {
    id: "2",
    name: "Luna",
    breed: "Siamese",
    age: "1 year",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=500",
    location: "San Francisco, CA",
    tags: ["Cat", "Playful", "Indoor"],
    type: "sale",
    price: 500
  },
  {
    id: "3",
    name: "Charlie",
    breed: "Budgie",
    age: "6 months",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&q=80&w=500",
    location: "Seattle, WA",
    tags: ["Bird", "Friendly", "Trained"],
    type: "adoption"
  },
  // Add a few more pets with proper tags
  {
    id: "4",
    name: "Rocky",
    breed: "German Shepherd",
    age: "3 years",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=500",
    location: "Portland, OR",
    tags: ["Dog", "Guard Dog", "Trained"],
    type: "sale",
    price: 800
  },
  {
    id: "5",
    name: "Milo",
    breed: "Persian",
    age: "2 years",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=500",
    location: "Denver, CO",
    tags: ["Cat", "Gentle", "Indoor"],
    type: "adoption"
  }
];
