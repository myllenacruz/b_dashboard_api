const { AppError } = require("../../errors/appError");
const { verify } = require("jsonwebtoken");
const auth = require("../../config/auth");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function ensureAuthentication (req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) throw new AppError("Unauthorized. User session is invalid.", 401);

	const token = authHeader.split(" ");

	try {
		verify(token, auth.jwt.secret, (err, decoded) => {
			if (err) {
				res.status(403).json({ message: "Unauthorized. User session is invalid."});
				res.end();
			} else {
				req.session = decoded;
				res.locals.user = decoded;
				next(null, decoded);
			}
		});
	} catch {
		throw new AppError("Authorization failed: Invalid token.", 401);
	}

	next();
}
