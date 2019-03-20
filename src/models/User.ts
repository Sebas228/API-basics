import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, unique: true },
  role: { type: Number, default: 2 },
  image: String,
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export default model("User", userSchema);
