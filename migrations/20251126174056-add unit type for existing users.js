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
        await queryInterface.sequelize.query(`
            UPDATE users
            SET daily_exercise = JSON_SET(
                daily_exercise,
                '$[0].unit_type', 'reps',
                '$[1].unit_type', 'reps',
                '$[2].unit_type', 'reps',
                '$[3].unit_type', 'km'
            )
            WHERE daily_exercise IS NOT NULL;
            `
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
