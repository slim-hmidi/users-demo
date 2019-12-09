import mongoose from "mongoose";

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let dbName = process.env.__DEV_DB_NAME__;
if (process.env.NODE_ENV === "test") {
  dbName = process.env.__TEST_DB_NAME__;
}
(async () => {
  try {
    console.log('process.env: ', process.env.__MONGO_HOST__)
    await mongoose.connect(`${process.env.__MONGO_HOST__}/${dbName}`, options);
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
