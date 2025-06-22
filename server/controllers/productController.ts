import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";
import Pet from "../models/Pet";
import Product from "../models/Product";


export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("getallproductss called");
    const products = await Product.find();
    console.log("allproducts:"+products[0]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};