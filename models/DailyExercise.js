import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'

const DailyExercise = sequelize.define(
    'DailyExercise',
    {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        daily_exercise: {
            type: DataTypes.JSON,
            defaultValue: [
                { name: 'push_ups', value: 0, display_name: 'Push ups', unit_type: 'reps' },
                { name: 'sit_ups', value: 0, display_name: 'Sit ups', unit_type: 'reps' },
                { name: 'squats', value: 0, display_name: 'Squats', unit_type: 'reps' },
                { name: 'running', value: 0, display_name: 'Running', unit_type: 'km' },
            ]
        },
    },
    {
        tableName: 'daily_exercise',
        paranoid: true,
        underscored: true,
    }
)

export default DailyExercise