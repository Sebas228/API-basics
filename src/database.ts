import mongoose from "mongoose";
import { mongodb } from "./keys";

mongoose.set("useFindAndModify", true);

mongoose
  .connect(mongodb.URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(db => console.log("DB is Connected"))
  .catch(err => console.log(err));
