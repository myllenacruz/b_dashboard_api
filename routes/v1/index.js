const { Router } = require("express");

const loginRouter = require("./login");

const router = Router();

router.use(loginRouter);

module.exports = router;
