const models = require("../database/");
const bcrypt = require("bcrypt");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllUsers (req, res) {
	res.status(200).json({ message: "USUARIOS" });
}

async function createUsers (req, res) {
	const user = req.body.user;
	const userName = req.body.name;
	const userMail = req.body.email;
	const pass = req.body.password;

	const salt = await bcrypt.genSalt(11);
	const hashPass = await bcrypt.hashSync(pass, salt);

	try {
		await models.User.create({
			user,
			name: userName,
			email: userMail,
			password: hashPass
		});

		return res.status(201).json({ message: "User create with succes!" });
	} catch (err) {
		console.log(err);

		return res.status(406).json({ message: "Something is wrong!" });
	}

}

async function deleteUsers (req, res) {
	try {
		await models.User.destroy({ where: { id: req.params.id }});

		return res.status(200).json({ message: "User deleted!" });
	} catch (err) {
		console.info("ERROR: ", err);

		res.status(500).json({ message: "Something is wrong." });
	}
}
module.exports = { getAllUsers, createUsers, deleteUsers };
