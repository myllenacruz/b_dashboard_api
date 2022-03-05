const { Router } = require("express");

const { login, logout, ensureAuthorized } = require("../../controllers/login");

const router = Router();

router.post("/login", login.genValidations, login);

router.get("/logout", logout);

//TODO: Add rota para validar sessão do usuário.

module.exports = router;
