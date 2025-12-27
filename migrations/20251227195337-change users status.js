'use strict';

import UserParameters from '../models/UserParameters.js';
import sequelize from '../config/db.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const users = await UserParameters.findAll();

    for (const user of users) {
        const oldExercise = user.status;

        user.status = 'beginner'
        await user.save();
    }
    await queryInterface.changeColumn('user_parameters', 'status', 
        {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'beginner',
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
  }
};
