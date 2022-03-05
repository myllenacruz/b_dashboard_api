const jwt = require("jsonwebtoken");
const validTokens = {};
const jwtConf = require("../config/auth");

const { isRequestInvalid } = require("../utils/http-validation");
const { body } = require("express-validator");

const db = require("../database/index");

/**
 * @param {import("express").Request} req
 */
function getToken (req) {
	const headerToken = req.headers.authorization.split(" ");
	if (typeof headerToken !== "undefined")
		return headerToken[1];
	else
		return null;
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function login (req, res) {
	if (isRequestInvalid(req, res)) return;
	const user = req.body.name;
	const pass = req.body.password;

	try {
		const regUser = await db.User.findOne({
			attributes: ["id", "name", "email", "password", "id_user_role"],
			where: { name: user, password: pass }
		});

		if (!regUser)
			res.status(401).json({ message: "Invalid user. Try again! "});

		const userRole = (await db.UserRole.findAll({ where: { id: regUser.id_user_role }})).map(n => n.name);

		const token = jwt.sign({
			user_id: regUser.id,
			userName: regUser.name,
			userRole
		}, jwtConf.jwt.secret, { expiresIn: "10h" });

		const loginReturn = {
			token,
			userName: regUser.name,
			userId: regUser.id,
			userRole
		};

		const tokenCreated = Date.now();
		setTimeout(() => {
			if (validTokens[token] === tokenCreated)
				delete validTokens[token];
		}, jwtConf.jwt.refreshExpiresIn);

		res.status(200).json(loginReturn);
	} catch (err) {
		console.info("ERROR :", err);
		res.status(500).json({
			message: "Could not get user query!",
			error: err.message
		});
	}
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function ensureAuthorized (req, res, next) {
	const bearerToken = getToken(req);
	if (bearerToken && validTokens[bearerToken]) {
		req.token = bearerToken;
		jwt.verify(bearerToken, jwtConf.jwt.secret, (err, decoded) => {
			if (err) {
				res.status(403).json({ message: "Unauthorized. Invalid session."});
				res.end();
			} else {
				req.session = decoded;
				res.locals.user = decoded;
				next(null, decoded);
			}
		});
	} else {
		res.status(403).json({ message: "Unauthorized. Invalid session." });
		res.end();
	}
}

login.genValidations = [
	body("name").isString().isLength({ min: 4, max: 30 }).notEmpty().withMessage("User invalid. Try again!"),
	body("password").notEmpty().isLength({ min: 4 }).withMessage("Invalid password. Try again!")
];

//TODO: Verificar se o usuário possui permissão.

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function logout (req, res) {
	const bearerToken = getToken(req);
	if (validTokens[bearerToken])
		delete validTokens[bearerToken];

	res.status(200);
	res.end();
}

module.exports = { ensureAuthorized, login, logout };
