import mongoose from "mongoose";
import { keys } from "./keys";

mongoose.set("useFindAndModify", true);

mongoose
  .connect(keys.URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(db => console.log("DB is Connected"))
  .catch(err => console.log(err));
