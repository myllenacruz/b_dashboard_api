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
			attributes: ["id", "name", "email", "password", "id_user_group"],
			where: { name: user }
		});

		if (!regUser)
			res.status(401).json({ message: "Invalid user. Try again! "});

		const permitions = (await db.UserRole.findAll({
			attributes: ["id_group", "code"],
			where: { id_group: regUser.id_user_group }
		})).map(d => d.code);

		const token = jwt.sign({
			user_id: regUser.id,
			userName: regUser.name,
			id_user_group: regUser.id_user_group
		}, jwtConf.jwt.secret, { expiresIn: "10h" });

		const loginReturn = {
			token,
			userName: regUser.name,
			userId: regUser.id,
			userGroup: permitions
		};

		const tokenCreated = Date.now();
		setTimeout(() => {
			if (validTokens[token] === tokenCreated)
				delete validTokens[token];
		}, jwtConf.jwt.refreshExpiresIn);

		res.status(200).json(loginReturn);
	} catch (err) {
		console.info("ERROR: ", err);
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

function hasPermissions (...permissions) {
	return async function (req, res, next) {
		ensureAuthorized(req, res, async (_, user) => {
			try {
				let allPossiblePermissions = [];

				for (const permission of permissions) {
					if (typeof permission == "string")
						allPossiblePermissions.push(permission);
					else
						allPossiblePermissions = allPossiblePermissions.concat(permission);
				}

				const features = (await db.UserRole.findAll({
					attributes: ["id_group", "code"],
					where: { code: allPossiblePermissions, id_group: user.id_user_group }
				}));

				for (const permission of permissions) {
					const feature = features.find((f) => {
						if (typeof permission === "string") {
							return f.code === permission;
						}

						return permission.indexOf(f.code) !== -1;
					});

					if (!feature) {
						res.status(401).json({ message: "Unauthorized. The user does not have the required level of access." });
						return res.end();
					}
				}

				next();
			} catch (err) {
				console.info(err);

				res.status(500).json({ message: "Unauthorized!" });
			}

		});
	};
}

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

module.exports = { ensureAuthorized, login, logout, hasPermissions };
