
module.exports = {
	/**
	* @param {import("sequelize").QueryInterface} queryInterface
	* @param {import("sequelize").DataTypes} Sequelize
	*/
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("user", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true
			},

			user: {
				type: Sequelize.STRING(30),
				allowNull: false
			},

			name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			email: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			password: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			id_user_group: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "user_group", key: "id" },
				defaultValue: 1
			},

			deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});
	},

	/**
	 * Função que desfaz a migração
	 * @param {import("sequelize").QueryInterface} queryInterface
	 * @param {import("sequelize").Sequelize} Sequelize
	 */
	 down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("user");
	}
};
