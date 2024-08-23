const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database")
const app = express();

app.use(cors());
app.use(bodyParser.json());

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const PORT = 10000;
// const HOST = '0.0.0.0'

app.listen(PORT,() => {
    console.log(`Server is running at http://${PORT}`)
})