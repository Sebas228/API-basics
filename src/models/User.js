import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { hashPassword } from "../helpers/hashPassword";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: {
    type: String,
    default: "ROLE_STUDENT",
    enum: ["ROLE_STUDENT", "ROLE_TEACHER", "ROLE_ADMIN"]
  },
  image: String,
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;

  try {
    let passwordHash = await hashPassword(this.password);
    this.password = passwordHash;
  } catch (e) {
    console.log(e);
  }
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export default model("User", userSchema);
