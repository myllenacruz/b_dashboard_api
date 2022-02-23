/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getAllUsers (req, res) {
	res.status(200).json({ message: "USUARIOS" });
}

module.exports = { getAllUsers };
