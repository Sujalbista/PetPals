import mongoose from "mongoose";
import dotenv from "dotenv";
import Pet from "./models/Pet";
import {petData} from "../src/data/petData";

dotenv.config();

const seedPets = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");

    await Pet.deleteMany();
    await Pet.insertMany(petData);
    console.log("Pet data seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding pet data:", err);
    process.exit(1);
  }
};

seedPets();
