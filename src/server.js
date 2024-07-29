const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require(`dotenv`);
const db = require("./configs/db.config");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening in port:${PORT}  `));

app.get("/test", (req, res, next) => {
  res.send(`Hello world!`);
});