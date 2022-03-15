const { Router } = require("express");

const loginRouter = require("./login");
const userRouter = require("./users");

const router = Router();

router.use(loginRouter);
router.use(userRouter);

module.exports = router;
