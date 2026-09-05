import { blogRouter } from "./src/controller/blogController.js";
import express from 'express'
import 'dotenv/config';


const app = express();

app.use(express.static('dist'))
app.use(express.json());
app.use('/api/blogs', blogRouter)


export default app
