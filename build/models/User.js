"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const hashPassword_1 = require("../helpers/hashPassword");
const userSchema = new mongoose_1.Schema({
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
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        try {
            let passwordHash = yield hashPassword_1.hashPassword(this.password);
            this.password = passwordHash;
        }
        catch (e) {
            console.log(e);
        }
    });
});
userSchema.plugin(mongoose_unique_validator_1.default, { message: "{PATH} must be unique" });
exports.default = mongoose_1.model("User", userSchema);
