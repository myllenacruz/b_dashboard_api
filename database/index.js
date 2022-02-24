const Sequelize = require("sequelize");
const dbConfig = require("./config.json");

const config = new Sequelize(dbConfig.development);

const { initUserRole } = require("./models/userRole");
const { initUser } = require("./models/user");

const db = {
	db: config,

	UserRole: initUserRole(config),
	User: initUser(config)
};

Object.keys(db).forEach(modelName => {
	if ("associate" in db[modelName])
		db[modelName].associate(db);
});

module.exports = db;
