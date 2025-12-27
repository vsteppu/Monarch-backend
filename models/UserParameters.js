import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

const UserParameters = sequelize.define(
    'UserParameters',
    {   
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
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
            defaultValue: 'beginner',
        },
    },
    {
        tableName: 'user_parameters',
        underscored: true,
    }
)

export default UserParameters