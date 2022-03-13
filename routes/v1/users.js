const { Router } = require("express");
const router = Router();

const { getAllUsers, createUsers, deleteUsers } = require("../../controllers/users");

router.get("/", getAllUsers);
router.post("/", createUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
