const express = require('express');
const path = require("path");
const db = require("./config/connection");
const models = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const games = await models.Game.find({});
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

db.once("open", () => {
    console.log("Connection to db successful");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});