const { Model, DataTypes } = require("sequelize");

class User extends Model {
	/**
	* @param {import("../../index")} models
	*/
	static associate (models) {
		User.belongsTo(models.UserGroup, { as: "user_group", foreignKey: "id_user_group" });
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

		id_user_group: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.UserGroup,
				key: "id"
			},
			defaultValue: 1
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
