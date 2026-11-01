import _ from "lodash";
import mongoose from "mongoose";

const { transform } = _;
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
});
const Blog = mongoose.model("blog", blogSchema);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export { Blog, blogSchema };
