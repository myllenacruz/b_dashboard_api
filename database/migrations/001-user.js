const { UserRole } = require("..");

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
				autoIncrement: true,
				primaryKey: true
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

			id_user_role: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: UserRole, key: "id" }
			},

			deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		});

		await queryInterface.bulkInsert("user", [
			{
				user: "admin", name: "Bimo", email: "admin@admin.com", password: "admin", id_user_role: 1
			},
			{
				user: "comum", name: "Bimo Comum", email: "comum@comum.com", password: "comum", id_user_role: 2
			},
			{
				user: "regular", name: "Bimo Regular", email: "regular@regular.com", password: "comum", id_user_role: 3
			}
		]);
	}
};
