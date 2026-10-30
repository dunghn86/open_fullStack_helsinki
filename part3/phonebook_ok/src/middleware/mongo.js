import mongoose, { Schema } from "mongoose";
import { configDotenv } from "dotenv";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
let password = process.argv[2];
const URL_DB = process.URL_DB;
mongoose.connect(URL_DB);
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

if (process.argv.length === 3) {
  console.log("Phonebook:");
  Phonebook.find({}).then((result) => {
    result.forEach((phonebook) => {
      console.log(`${phonebook.name}  ${phonebook.number} `);
    });
    mongoose.connection.close();
  });
} else {
  let name = process.argv[3];
  let number = process.argv[4];

  let phoneNumber = Phonebook.create({ name: name, number: number }).then(
    () => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    },
  );
}
// mongoose.connection.close();
