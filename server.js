const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");
const router = require("./routers/auth/auth");
const routers = require("./routers/unauth/un_auth");
const { verifyToken } = require("./middlewares/Tokens");

// const db = require("./models");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", verifyToken, router);
app.use("/api/v1", routers);

const port = process.env.PORTNUMBER || 5000;
app.listen(port, () => {
  console.log(`Server is connected ${port}`);
});
