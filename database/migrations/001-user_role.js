module.exports = {
	/**
	* @param {import("sequelize").QueryInterface} queryInterface
	* @param {import("sequelize").DataTypes} Sequelize
	*/
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("user_role", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},

			id_group: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "user_group", key: "id" },
				defaultValue: 1
			},

			name: {
				type: Sequelize.STRING(40),
				allowNull: false,
				unique: true
			},

			module: {
				type: Sequelize.ENUM("COMUM", "ALL", "REGULAR", "ADMINISTRATOR"),
				allowNull: false
			},

			code: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true
			}
		});

		await queryInterface.bulkInsert("user_role", [
			{ id: 1, 	name: "Delete Users", 		module: "ADMINISTRATOR",	code: "SYS_D_USERS", id_group: 2 },
			{ id: 2, 	name: "Register Users", 	module: "ADMINISTRATOR", 	code: "SYS_R_USERS", id_group: 2 },
			{ id: 3,	name: "Edit Users", 		module: "ADMINISTRATOR", 	code: "SYS_E_USERS", id_group: 2 },
			{ id: 4,	name: "Create Post", 		module: "REGULAR", 			code: "SYS_C_POSTS", id_group: 3 },
			{ id: 5,	name: "Edit Post", 			module: "REGULAR", 			code: "SYS_E_POSTS", id_group: 3 }
		]);
	},

	/**
	* @param {import("sequelize").QueryInterface} queryInterface
	* @param {import("sequelize").Sequelize} Sequelize
	*/
	down: async (queryInterface, Sequelize) => {
	   await queryInterface.dropTable("user_role");
	}
};
