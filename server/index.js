require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const PORT = 4000;

const app = express();

app.use(express.json());

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(db => {
    app.set("db", db);
    console.log("Db Connected :) !!!");
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
