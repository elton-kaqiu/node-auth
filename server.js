const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require(`dotenv`);
const db = require("./configs/db.config");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App listening in port:${PORT}  `));

app.get("/test", (req, res, next) => {
  res.send(`Hello world!`);
});
