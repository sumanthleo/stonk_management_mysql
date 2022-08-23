const express = require("express");
const { user_router } = require("./user_routes");
const routers = express.Router();

// router.post("/creates", createUser);

routers.use(user_router);

module.exports = routers;
