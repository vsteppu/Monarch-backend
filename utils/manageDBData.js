// utils/manageDBData.js
import User from '../models/User.js';
import sequelize from '../config/db.js';

const updateUsersDailyExercise = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const users = await User.findAll();

    for (const user of users) {
        const oldExercise = user.daily_exercise;

        const newExercise = [
            { name: 'push_ups', value: oldExercise.push_ups || 0, display_name: 'Push ups'  },
            { name: 'sit_ups', value: oldExercise.sit_ups || 0, display_name: 'Sit ups'  },
            { name: 'squats', value: oldExercise.squats || 0, display_name: 'Squats'  },
            { name: 'running', value: oldExercise.running || 0, display_name: 'Running'  },
        ];

        user.daily_exercise = newExercise;
        await user.save();
    }

    console.log('All users updated!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};


async function dropAllIndexes() {
  const [indexes] = await sequelize.query('SHOW INDEX FROM users;')

  for (const index of indexes) {
    const indexName = index.Key_name
    if (indexName !== 'PRIMARY') {
      console.log(`Dropping index: ${indexName}`)
      await sequelize.query(`DROP INDEX ${indexName} ON users;`)
    }
  }

  console.log('✅ All non-primary indexes dropped.')
}

//dropAllIndexes()
//updateUsersDailyExercise();
