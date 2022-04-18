const models = require("../database/");
const bcrypt = require("bcrypt");

async function createUsers (req, res) {
	const user = req.body.user;
	const userName = req.body.name;
	const userMail = req.body.email;
	const pass = req.body.password;

	try {
		const salt = await bcrypt.genSalt(11);
		const hashPass = await bcrypt.hashSync(pass, salt);

		await models.User.create({
			user,
			name: userName,
			email: userMail,
			password: hashPass
		});

		return res.status(201).json({ message: "User create with succes!" });
	} catch (err) {
		console.error(err);

		return res.status(406).json({ message: "Could not create user!" });
	}

}

async function deleteUsers (req, res) {
	try {
		await models.User.destroy({ where: { id: req.params.id }});

		return res.status(200).json({ message: "User deleted!" });
	} catch (err) {
		console.error("ERROR: ", err);

		res.status(500).json({ message: "Could not delete user!" });
	}
}
module.exports = { createUsers, deleteUsers };
