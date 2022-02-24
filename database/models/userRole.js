const { Model, DataTypes } = require("sequelize");

class UserRole extends Model {
	/**
	* @param {import("../index")} models
	*/
	static associate (models) {
		UserRole.hasMany(models.User, { as: "user", foreignKey: "id_user_role" });
	}
}

/**
* @param {import("sequelize").Sequelize} sequelize Connection with the database
*/
function initUserRole (sequelize) {
	UserRole.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		name: DataTypes.STRING(40),
		deleted: DataTypes.BOOLEAN
	},
	{
		sequelize,
		timestamps: false,
		modelName: "UserRole",
		tableName: "user_role",
		underscored: true
	});

	return UserRole;
}

module.exports = { initUserRole };
