import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const openDB = () => {
  mongoose.connect(process.env.URL_DB);
};

const closeDB = () => {
  mongoose.connection.close();
};
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

export { openDB, closeDB, phonebookSchema, Phonebook };
