import mongoose, { Document, Schema } from "mongoose";

// Define a TypeScript interface for the user
export interface IUser extends Document {
  email: string;
  password: string;
  favorites: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }]
});

// Export the model with proper typing
const User = mongoose.model<IUser>("User", userSchema);
export default User;
