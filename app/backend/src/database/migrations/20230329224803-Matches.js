'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{
          model:'teams',
          key:'id'
        }
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
      },
      away_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference:{
          model:'teams',
          key:'id'
        }
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('matches');
  }
};
