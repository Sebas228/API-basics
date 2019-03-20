"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, default: 2 },
    image: String,
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});
userSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH} must be unique" });
exports.default = mongoose_1.model("User", userSchema);
