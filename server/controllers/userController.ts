import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import { AuthRequest } from "../types/AuthRequest";
import Pet from "../models/Pet";


export const addFavorite = async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { petId } = req.params;
  console.log("addfavs:"+petId);
  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: "Invalid pet ID" });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const petObjectId = new mongoose.Types.ObjectId(petId);
    if (!user.favorites.some(fav => fav.equals(petObjectId))) {
      user.favorites.push(petObjectId);
      await user.save();
    }

    res.json({ favorites: user.favorites.map(fav => fav.toString()) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;
  const { petId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: "Invalid pet ID" });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const petObjectId = new mongoose.Types.ObjectId(petId);
    user.favorites = user.favorites.filter(fav => !fav.equals(petObjectId));

    await user.save();

    res.json({ favorites: user.favorites.map(fav => fav.toString()) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};

export const getUserFavorites = async (req: Request, res: Response) => {
  const userId = (req as AuthRequest).user.id;


  try {
    console.log("getfavsapi userid:"+userId);
    
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log({favorites: user.favorites.map((fav: any) => fav._id.toString())} );
    // Return only pet IDs or minimal info depending on your frontend needs
    res.json({ favorites: user.favorites.map((fav: any) => fav._id.toString()) });
    
  } catch (err) {
    res.status(500).json({ message: "Server error", error: (err as Error).message });
  }
};


export const getAllPets = async (req: Request, res: Response) => {
  

  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pets", error: (err as Error).message });
  }
};

