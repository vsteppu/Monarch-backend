'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   
    await queryInterface.addColumn('daily_exercise', 'exercises',
        {
            type: DataTypes.JSON,
            defaultValue: [
                { name: 'push_ups', value: 0, display_name: 'Push ups' },
                { name: 'sit_ups', value: 0, display_name: 'Sit ups' },
                { name: 'squats', value: 0, display_name: 'Squats' },
                { name: 'running', value: 0, display_name: 'Running' },
            ]
        }
    );
    await queryInterface.removeColumn('daily_exercise', 'push_ups');
    await queryInterface.removeColumn('daily_exercise', 'running');
    await queryInterface.removeColumn('daily_exercise', 'sit_ups');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
