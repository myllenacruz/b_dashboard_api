module.exports = {
	/**
	* @param {import("sequelize").QueryInterface} queryInterface
	* @param {import("sequelize").DataTypes} Sequelize
	*/
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("user_group", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},

			name: {
				type: Sequelize.STRING(40),
				allowNull: false,
				unique: true
			}
		});

		await queryInterface.bulkInsert("user_group", [
			{ id: 1, 	name: "Local" },
			{ id: 2, 	name: "Administrator" },
			{ id: 3,	name: "Regular" },
			{ id: 4,	name: "Comum"}
		]);
	},

	/**
	* @param {import("sequelize").QueryInterface} queryInterface
	* @param {import("sequelize").Sequelize} Sequelize
	*/
	down: async (queryInterface, Sequelize) => {
	   await queryInterface.dropTable("user_group");
	}
};
