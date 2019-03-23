"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const keys_1 = require("./keys");
mongoose_1.default.set("useFindAndModify", true);
mongoose_1.default
    .connect(keys_1.keys.URI, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db => console.log("DB is Connected"))
    .catch(err => console.log(err));
