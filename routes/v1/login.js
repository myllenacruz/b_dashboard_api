const { Router } = require("express");

const { login, logout, ensureAuthorized } = require("../../controllers/login");

const router = Router();

router.post("/login", login.genValidations, login, ensureAuthorized);

router.get("/validateSession", async (req, res) => {
	res.status(200).json({ valid: true });
});

router.get("/logout", logout);

module.exports = router;
