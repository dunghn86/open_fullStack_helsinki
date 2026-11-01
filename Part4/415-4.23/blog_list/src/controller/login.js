import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModels.js";
import "dotenv/config";
import { connectDB } from "../Utils/config.js";

const loginRouter = Router();

export default loginRouter.post("/", async (req, res) => {
  connectDB();
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHashed);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  res.status(200).send({ token, user: userForToken });
});
