require("dotenv");

module.exports = {
	jwt: {
		secret: process.env.KEY_TOKEN,
		expiresIn: 12 * 60 * 60, //12hrs
		refreshExpiresIn: 30 * 24 * 60 * 60 //30d
	}
};
