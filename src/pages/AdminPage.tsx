
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "@/components/marketplace/SearchBar";
import CategoryButtons from "@/components/marketplace/CategoryButtons";
import PetTabs from "@/components/marketplace/PetTabs";
import AdoptionSection from "@/components/marketplace/AdoptionSection";
import { petData } from "@/data/petData";
import { PetType } from "@/components/marketplace/PetGrid";

const AdminPage = () => {
  const [newPet, setNewPet] = useState({
    id: "",
    name: "",
    breed: "",
    age: "",
    image: "",
    location: "",
    tags: "",
    type: "adoption",
  });

  const [submittedPets, setSubmittedPets] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPet(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPet = {
      ...newPet,
      tags: newPet.tags.split(",").map(tag => tag.trim()),
    };

    // Simulate sending to database
    console.log("Submitting pet to database:", formattedPet);
    setSubmittedPets(prev => [...prev, formattedPet]);

    // Reset form
    setNewPet({
      id: "",
      name: "",
      breed: "",
      age: "",
      image: "",
      location: "",
      tags: "",
      type: "adoption",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-pet-purple mb-8">Admin Panel - Add New Pet</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-md dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="id" value={newPet.id} onChange={handleChange} placeholder="ID" required className="input" />
          <input name="name" value={newPet.name} onChange={handleChange} placeholder="Name" required className="input" />
          <input name="breed" value={newPet.breed} onChange={handleChange} placeholder="Breed" required className="input" />
          <input name="age" value={newPet.age} onChange={handleChange} placeholder="Age" required className="input" />
          <input name="image" value={newPet.image} onChange={handleChange} placeholder="Image URL" required className="input" />
          <input name="location" value={newPet.location} onChange={handleChange} placeholder="Location" required className="input" />
          <input name="tags" value={newPet.tags} onChange={handleChange} placeholder="Tags (comma-separated)" required className="input" />
          <select name="type" value={newPet.type} onChange={handleChange} className="input">
            <option value="adoption">Adoption</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <button type="submit" className="bg-pet-purple text-white px-6 py-2 rounded-xl hover:bg-pet-purple-dark transition">
          Add Pet
        </button>
      </form>

      {submittedPets.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Submitted Pets:</h2>
          <ul className="space-y-4">
            {submittedPets.map((pet, index) => (
              <li key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                <p><strong>{pet.name}</strong> ({pet.breed}) - {pet.age}</p>
                <p>Location: {pet.location}</p>
                <p>Type: {pet.type}</p>
                <p>Tags: {pet.tags.join(", ")}</p>
                <img src={pet.image} alt={pet.name} className="mt-2 w-48 rounded" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
