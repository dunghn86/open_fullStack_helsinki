import express from "express";
import axios from "axios";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { openDB, closeDB, Phonebook } from "./src/config/db.js";

dotenv.config();
const app = new express();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/", (req, res) => {
  res.send("HomePage");
});

//Part3.1 API get all users
app.get("/api/persons", async (req, res, next) => {
  try {
    // let response = await axios("http://localhost:3000/persons");
    openDB();
    await Phonebook.find({})
      .then((item) => {
        res.json(item);
      })
      .catch((error) => next(error));
  } catch (error) {
    console.error(error);
  }
});
//Part 3.2 API get info
app.get("/info", async (req, res, next) => {
  try {
    // let response = await axios("http://localhost:3000/persons");
    // let data = response.data;
    openDB();
    let data = await Phonebook.find({});
    let date = new Date();
    let count = data.reduce((count, element) => count + 1, 0);
    res.send(`Phonebook has info for ${count} people</br> ${date}`);
  } catch (error) {
    console.error(error);
  }
});
//Part3.3 API get user by ID
app.get("/api/persons/:id", async (req, res, next) => {
  try {
    // const url = "http://localhost:3000/persons";
    let ID = req.params.id;
    // let respone = await axios(`${url}/${ID}`);
    // let data = respone.data;
    // res.json(data);
    openDB();
    let data = await Phonebook.findById(ID);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});
// part3.4 API delete a user
app.delete("/api/persons/:id", async (req, res) => {
  try {
    // const url = "http://localhost:3000/persons";
    let ID = req.params.id;
    // let response = await axios.delete(`${url}/${ID}`);
    // console.log("response.status", response.status);

    const result = await Phonebook.deleteOne({ _id: ID }).catch((error) =>
      next(error),
    );
    if (result.deletedCount === 1) res.send({ message: "delete successfull" });
    else res.send({ message: "delete unsuccessfull" });
  } catch (error) {
    console.error(error);
  }
});

// Part3.5 3.6 API add a new user
app.post("/api/persons", async (req, res) => {
  try {
    // const url = "http://localhost:3000/persons";
    const body = req.body;
    // let ID = Math.round(Math.random() * 1000);
    // check the name or number miss
    if (!body.name || !body.number)
      return res.send({ error: "The name or number is missing" });
    // check name existed
    // const resUser = await axios(url);
    // const dataUser = resUser.data;
    // let isExistedUser = dataUser.find((item) => item.name === body.name);
    // let isExistedUser = await Phonebook.find({ name: body.name });
    // if (isExistedUser.length == 0)
    //   return res.send({ error: "the name must be unique" });
    const user = {
      //   "id": ID.toString(),
      "name": body.name,
      "number": body.number,
    };
    // const response = await axios.post(url, user);
    // res.json(response.data);
    let newUser = await Phonebook.create(user).catch((error) => next(error));
    return res.status(201).json(newUser);

    // if (response.status === 201) console.log("Create successfull");
    // else console.log("Cannot create new user");
  } catch (error) {
    console.error(error);
  }
});
//3.17 API update an existed user
app.patch("/api/persons/:id", async (req, res, next) => {
  let body = req.body;
  let { ID } = req.params;
  let result = await Phonebook.updateOne(ID, {
    number: body.number,
  })
    .then((result) => {
      if (result.matchedCount === 1 && result.modifiedCount === 1)
        res.send({ message: "Update successfull" });
      else res.send({ error: "Cannot update user" });
    })
    .catch((error) => next(error));
});
closeDB();
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
