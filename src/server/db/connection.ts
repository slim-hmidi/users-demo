import mongoose from "mongoose";
import { __DEV_DB_NAME__, __MONGO_HOST__, __TEST_DB_NAME__ } from "../config";

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let dbName = __DEV_DB_NAME__;
if (process.env.NODE_ENV === "test") {
  dbName = __TEST_DB_NAME__;
}
(async () => {
  try {
    await mongoose.connect(`${__MONGO_HOST__}/${dbName}`, options);
  } catch (error) {
    console.log("Database connection error: ", error);
  }
})();

const db = mongoose.connection;
if (process.env.NODE_ENV !== "test") {
  db.on("error", (error) => {
    console.log("Error while establishing database connection: ", error);
  });

  db.on("open", () => {
    console.log("Connection to database established successfully!!");
  });
}

export default db;
