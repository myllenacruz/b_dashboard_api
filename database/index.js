const Sequelize = require("sequelize");
const dbConfig = require("./config.json");

const sequelize = new Sequelize(dbConfig.development);

const { initUserRole } = require("./models/userRole");
const { initUser } = require("./models/user");
const { initUserGroup } = require("./models/userGroup");

const db = {
	db: sequelize,

	UserRole: initUserRole(sequelize),
	User: initUser(sequelize),
	UserGroup: initUserGroup(sequelize)
};

Object.keys(db).forEach(modelName => {
	if ("associate" in db[modelName])
		db[modelName].associate(db);
});

module.exports = db;
