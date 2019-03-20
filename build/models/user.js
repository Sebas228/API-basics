"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firtsName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true },
    password: { type: String, required: true },
    role: Number,
    image: String,
    created_at: { type: Date, default: Date.now }
});
exports.default = mongoose_1.model("User", userSchema);
