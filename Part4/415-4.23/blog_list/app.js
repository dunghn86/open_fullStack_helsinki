import { blogRouter } from "./src/controller/blogController.js";
import { userRouter } from "./src/controller/userController.js";
import loginRouter from "./src/controller/login.js";
import express from "express";
import "dotenv/config";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

export default app;
