import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type : String,
    required : [true,'Please add a name']        //name is required, gives please add a name when not given
  },
  breed: String,
  age: String,
  image: String,
  location: String,
  tags: [String],
  type: { type: String, enum: ["adoption", "sale"] }, // can be adoption or sale
  price: {
    type:Number,
    default: 0
  }
});

export default mongoose.model("Pet", petSchema);
