import { Router } from "express";
import { connectDB } from "../Utils/config.js";
import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";

const userRouter = Router();

//API get all user
userRouter.get("/", async (req, res) => {
  connectDB();
  let users = await User.find({}).populate("blogs", "title author url likes");
  res.json(users);
});

//API create a new user
userRouter.post("/", async (req, res) => {
  connectDB();
  let userData = req.body;
  let saltRounds = 10;
  let passwordHash = await bcrypt.hash(userData.password, saltRounds);
  console.log("userData", userData);
  console.log("passwordHash", passwordHash);
  let newUser = {
    username: userData.username,
    name: userData.name,
    passwordHashed: passwordHash,
  };
  let result = await User.create(newUser)
    .then((response) => res.status(201).json(response))
    .catch((error) => res.status(400).send(error));
});
export { userRouter };
