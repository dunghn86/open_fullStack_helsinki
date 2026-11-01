import mongoose from "mongoose";

// const { transform } = _;
const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  name: String,
  passwordHashed: {
    type: String,
    minLength: 3,
    required: true,
  },
});
userSchema.virtual("blogs", {
  ref: "blog",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("user", userSchema);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});
export { User, userSchema };
