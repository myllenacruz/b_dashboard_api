const { Router } = require("express");
const router = Router();

const { createUsers, deleteUsers } = require("../../controllers/users");

router.post("/users", createUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
