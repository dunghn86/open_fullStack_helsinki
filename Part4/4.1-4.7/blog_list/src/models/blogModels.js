import mongoose from "mongoose"


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});
const Blog = mongoose.model('blog', blogSchema);
export { Blog }
