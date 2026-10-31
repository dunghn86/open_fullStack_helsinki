import { Router } from "express";
import { Blog } from '../models/blogModels.js'
import { connectDB, disconnectDB } from "../Utils/config.js";
import logger from "../Utils/logger.js";
import { checkLikesMissing } from "../Utils/list_helper.js";


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

blogRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ message: "Missing title or author" });
    }
    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes === undefined ? 0 : req.body.likes
    });
    console.log('newBlog', newBlog)
    try {
        connectDB();
        const savedBlog = await newBlog.save()
        console.log('savedBlog', savedBlog)
        console.log('Added successful!')
        return res.status(201).json(savedBlog);
    } catch (error) {
        logger.error(error)
        res.status(400)
    }
    disconnectDB();
})

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        connectDB();
        const result = await Blog.findByIdAndDelete(id)
        if (!result)
            return res.status(404).json({ message: `Can not find blog id ${id}` })
        return res.status(204).json({ message: `Deleted successfully blog id ${id}` })
    } catch (error) {
        return res.status(400).json({ message: `Can not deleted blog id ${id}` })
    }
})

blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const dataUpdate = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url === undefined ? "" : req.body.url,
        likes: req.body.likes === undefined ? 0 : req.body.likes
    }
    if (!dataUpdate.title || !dataUpdate.author)
        return res.status(400).json({ message: "Missing title or author" })
    try {
        const result = await Blog.findByIdAndUpdate(id,dataUpdate,{returnDocument: 'after'})
        console.log('result', result)
        if(!result) 
                return res.status(400).end()
        return res.status(200).json(result)//({ message: `Updated successfully blog id ${id}` })
    }catch(error){
        return res.status(404).end()
    }
})
export { blogRouter }