const { Model, DataTypes } = require("sequelize");

class UserGroup extends Model {
	/**
	* @param {import("../index")} models
	*/
	static associate (models) {
		UserGroup.hasMany(models.User, { as: "users", foreignKey: "id_user_group" });
		UserGroup.hasMany(models.UserRole, { as: "roles", foreignKey: "id_group" });
	}
}

/**
* @param {import("sequelize").Sequelize} sequelize Connection with the database
*/
function initUserGroup (sequelize) {
	UserGroup.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},

		deleted: DataTypes.BOOLEAN
	},
	{
		sequelize,
		timestamps: false,
		modelName: "UserGroup",
		tableName: "user_group",
		underscored: true
	});

	return UserGroup;
}

module.exports = { initUserGroup };
