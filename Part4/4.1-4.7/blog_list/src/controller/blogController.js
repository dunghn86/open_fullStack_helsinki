import { Router } from "express";
import { Blog } from '../models/blogModels.js'
import { connectDB, disconnectDB } from "../Utils/config.js";


const blogRouter = Router();

blogRouter.get('/', (req, res) => {
    connectDB();
    Blog.find({}).then(blog => {
        res.json(blog)
    })

})

blogRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        connectDB();
        Blog.findById(id).then((result) => {
            res.json(result);
        })
            .catch(res.status(400));
    }
})

blogRouter.post('/', (req, res) => {
    const blogDataUpload = new Blog(req.body);
    console.log('req.body', req.body)
    if (blogDataUpload)
        connectDB();
    Blog.create(blogDataUpload).then(blog => {
        res.json(blog);
        console.log('Added successful!')
    })


})
export { blogRouter }