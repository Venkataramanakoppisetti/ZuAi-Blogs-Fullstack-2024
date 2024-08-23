const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database")
const app = express();

app.use(cors());
app.use(bodyParser.json());

const authenticate = require('./middlewares/authenticate');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

app.use('/posts', authenticate, postsRouter);
app.use('/auth', authRouter); 

const PORT = 10000;
const HOST = '0.0.0.0';

app.listen(PORT,HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
