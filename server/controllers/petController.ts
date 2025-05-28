import { Request, Response } from "express";
import Pet from "../models/Pet";
import Cart from "../models/Cart";
import User from "../models/User";

// Get all pets
const getAllPets = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("getallpets called");
    const pets = await Pet.find();
    console.log("allpets:"+pets);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add to cart
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId } = req.body;
    const userId = (req as any).user.id; // Assuming you're adding the user to req in your auth middleware

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, pets: [] });

    if (!cart.pets.includes(petId)) cart.pets.push(petId);
    await cart.save();

    res.json({ message: "Pet added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Error adding pet to cart" });
  }
};

// Heart (favorite)
const heartPet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { petId } = req.body;
    const userId = (req as any).user.id; // Assuming you're adding the user to req in your auth middleware

    const user = await User.findById(userId);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (!user.favorites.includes(petId)) {
      user.favorites.push(petId);
    } else {
      user.favorites = user.favorites.filter(p => p.toString() !== petId);
    }

    await user.save();
    res.json({ message: "Favorite updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating favorites" });
  }
};

const checkout = async (req: Request, res: Response): Promise<void> => {
  const { items, subtotal } = req.body;

  if (!items || !Array.isArray(items) || typeof subtotal !== 'number') {
    res.status(400).json({ message: 'Invalid request data' });
    return;
  }

  console.log('Order received:', items, subtotal);

  // Simulate processing (e.g. payment, saving order, etc.)
  setTimeout(() => {
    return res.status(200).json({ message: 'Order placed successfully!' });
  }, 1000);
};




export {getAllPets,heartPet,addToCart,checkout};

