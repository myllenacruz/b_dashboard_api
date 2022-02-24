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

			name: {
				type: Sequelize.STRING(40),
				allowNull: false,
				unique: true
			},

			deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});

		await queryInterface.bulkInsert("user_role", [
			{ id: 1, name: "Administrator", deleted: false },
			{ id: 2, name: "Comum", deleted: false },
			{ id: 3, name: "Regular", deleted: false }
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
