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
    await queryInterface.changeColumn('users', 'daily_exercise', 
        {
            type: Sequelize.JSON,
            defaultValue: [
                { name: 'push_ups', value: 0, display_name: 'Push ups', unit_type: 'reps' },
                { name: 'sit_ups', value: 0, display_name: 'Sit ups', unit_type: 'reps' },
                { name: 'squats', value: 0, display_name: 'Squats', unit_type: 'reps' },
                { name: 'running', value: 0, display_name: 'Running', unit_type: 'km' },
            ],
        }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('users', 'daily_exercise', 
        {
            type: Sequelize.JSON,
            defaultValue: [
                { name: 'push_ups', value: 0, display_name: 'Push ups' },
                { name: 'sit_ups', value: 0, display_name: 'Sit ups' },
                { name: 'squats', value: 0, display_name: 'Squats' },
                { name: 'running', value: 0, display_name: 'Running' },
            ],
        }
    )
  }
};
