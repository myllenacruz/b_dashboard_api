const { Router } = require("express");
const router = Router();

const { getAllUsers } = require("../../controllers/users");

router.get("/", getAllUsers);

module.exports = router;
