import mongoose from "mongoose";
import logger from "../common/logger";

const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  try {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .catch((error) => {
        console.log("connection error:::", error);
      });

    mongoose.set('useCreateIndex', true);

    console.log("mongo DB connected");

    mongoose.set(
      "debug",
      function (collectionName, method, query, doc, options) {
        logger.info(collectionName + "." + method, JSON.stringify(query), doc);
      }
    );
  } catch (e) {
    console.error(e, "error");
  } finally {
    // await client.close();
  }
};

export default connectDB;
