// utils/manageDBData.js
import User from '../models/User.js';
import sequelize from '../config/db.js';
import * as fs from 'node:fs';

const updateUsersDailyExercise = async () => {
  try {
    await sequelize.authenticate();

    const users = await User.findAll();
    console.log('users: ', users);
    const usersJson = JSON.stringify(users, null, 2);

    console.log('usersJson: ', usersJson);
    fs.writeFileSync('./schema.sql', usersJson)

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateUsersDailyExercise();
