const { Model, DataTypes } = require("sequelize");

class User extends Model {
	/**
	* @param {import("../index")} models
	*/
	static associate (models) {
		User.belongsTo(models.UserRole, { as: "user_role", foreignKey: "id_user_role" });
	}
}

/**
* @param {import("sequelize").Sequelize} sequelize Connection with the database
*/
function initUser (sequelize) {
	User.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		user: DataTypes.STRING(30),
		name: DataTypes.STRING(100),
		email: DataTypes.STRING(100),
		password: DataTypes.STRING(100),

		id_user_role: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.UserRole,
				key: "id"
			}
		},

		deleted: DataTypes.BOOLEAN
	},
	{
		sequelize,
		timestamps: false,
		modelName: "User",
		tableName: "user",
		underscored: true
	});

	return User;
}

module.exports = { initUser };
