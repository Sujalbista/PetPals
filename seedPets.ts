import mongoose from "mongoose";
import dotenv from "dotenv";
import Pet from "./server/models/Pet";
import {productData} from "./src/data/productData";
import Product from "./server/models/Product";
dotenv.config();

const seedPets = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI not defined in .env");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    await Product.deleteMany();
    await Product.insertMany(productData);
    console.log("Pet data seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding pet data:", err);
    process.exit(1);
  }
};

seedPets();
