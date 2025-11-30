import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const UserParameters = sequelize.define(
    'UserParameters',
    {
        level:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        rank:{
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue: 'e',
        },
        status:{
            type:DataTypes.STRING,
            allowNull: false,
            defaultValue: 'e',
        },
    },
    {
        tableName: 'user_parameters',
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
)

export default UserParameters