const express = require("express");
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

dotenv.config()

const url = process.env.MONGO_URL
const client = new MongoClient(url);
const dbName = 'passop';

client.connect();

app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResults = await collection.find({}).toArray();
    res.json(findResults);
    // res.send("hello theere!");
})

app.post("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResults = await collection.insertOne(password);
    res.send({success : true, result: findResults})
})

app.delete("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const result = await collection.deleteOne(password)
    res.send({success : true, result: result})
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})