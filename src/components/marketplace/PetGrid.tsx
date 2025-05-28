import { useEffect, useState } from "react";
import PetCard from "@/components/cards/PetCard";
import { log } from "console";

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

interface PetGridProps {
  pets: PetType[];

}

const PetGrid = ({ pets }: PetGridProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchFavorites(token);
      console.log("fetchfavs func called");
      
    }
  }, []);

  const fetchFavorites = async (token: string) => {
    try {
      
      const res = await fetch("http://localhost:8080/api/user/getUserFavs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("called getfavs api");
      const data = await res.json();
      setFavorites(data.favorites || []);
      console.log("get:"+data.favorites);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };
  const addFavorite = async (petId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    try {
      console.log("addfavs:"+petId);
      const res = await fetch(`http://localhost:8080/api/user/addfavs/${petId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };
  
  const removeFavorite = async (petId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/api/user/removefavs/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  const displayedPets = isLoggedIn
    ? [...pets].sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        return aFav === bFav ? 0 : aFav ? -1 : 1;
      })
    : pets;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedPets.map((pet) => (
        <PetCard
          key={pet.id}
          {...pet}
          isFavorite={favorites.includes(pet.id)}
          onAddFavorite={addFavorite}
          onRemoveFavorite={removeFavorite}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default PetGrid;
