const { Model, DataTypes } = require("sequelize");

class UserRole extends Model {
	/**
	* @param {import("../index")} models
	*/
	static associate (models) {
		UserRole.belongsTo(models.UserGroup, { as: "group", foreignKey: "id_group "});
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

		id_group: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: sequelize.models.UserGroup,
				key: "id"
			},
			defaultValue: 1
		},

		name: DataTypes.STRING(40),

		module: {
			type: DataTypes.ENUM("COMUM", "ALL", "REGULAR", "ADMINISTRATOR"),
			allowNull: false
		},

		code: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true
		}

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
