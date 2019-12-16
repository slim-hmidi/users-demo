import mongoose from "mongoose";

/* To avoid deprecation warnings mentioned by mongoose when
starting the database, we set these options according to the
warnings messages.If you want to get more information about
this issue, visit this link below:
https://mongoosejs.com/docs/connections.html#options.
*/

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
