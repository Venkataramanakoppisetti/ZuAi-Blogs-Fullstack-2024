const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database")
const app = express();


const allowedOrigins = ['http://localhost:3000']; // Replace with your frontend URL

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const authenticate = require('./middlewares/authenticate');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

app.use('/posts', authenticate, postsRouter);
app.use('/auth', authRouter); 

const PORT = 10000;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
    console.log(`Server is running at http://${PORT}`);
});
