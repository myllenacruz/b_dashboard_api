const { Router } = require("express");
const router = Router();

const { getAllUsers, createUsers, deleteUsers } = require("../../controllers/users");

router.get("/users", getAllUsers);
router.post("/users", createUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
