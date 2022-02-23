const { Router } = require("express");
const router = Router();

// const loginRouter = require("./login");
const usersRouter = require("./users");

//Apenas com o fim de teste
router.use("/users", usersRouter);

module.exports = router;
