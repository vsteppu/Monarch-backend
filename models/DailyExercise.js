import { randomUUID } from "crypto";

/**
 * SQL DDL for Cloudflare D1 table to store a user's daily exercise payloads.
 * Columns:
 * - exercise_id: TEXT (UUID generated in app code)
 * - user_id: TEXT (references users.id)
 * - daily_exercise: JSON payload
 * - timestamps and soft-delete (deleted_at)
 */
export const createDailyExerciseTableSQL = `
    CREATE TABLE IF NOT EXISTS daily_exercise (
    exercise_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    daily_exercise JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
    );
`;

/* Prepared SQL statements used by the model helpers */
export const sql = {
    create: `
        INSERT INTO daily_exercise (user_id, daily_exercise, exercise_id, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `,
    readById: `
        SELECT * FROM daily_exercise WHERE user_id = ?
    `,
    update: `
        UPDATE daily_exercise SET daily_exercise = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?
    `,
    delete: `
        DELETE FROM daily_exercise WHERE user_id = ?
    `
}

/**
 * initTable
 * Role: Ensure the daily_exercise table exists on the provided D1 binding.
 * Usage: await initTable(env.MONARCH_DB)
 */
export const initTable = async (db) => {
    await db.prepare(createDailyExerciseTableSQL).run();
};

/**
 * registerExercise
 * Role: Insert a new daily exercise record for a user. Generates a UUID for exercise_id.
 * Note: Expects daily_exercise to be JSON-serializable (string or JSON depending on D1 driver).
 * Returns: nothing (consider returning insert metadata if needed).
 */
export const registerExercise = async (db, { user_id, daily_exercise }) => {
    const exercise_id = randomUUID();
    await db
        .prepare(sql.create)
        .bind(user_id, daily_exercise, exercise_id)
        .run();
};

/**
 * fetchExercises
 * Role: Retrieve the first daily_exercise row for a given user_id.
 * Returns: the row object or undefined if not found.
 */
export const fetchExercises = async (db, user_id) => {
    const response = await db
        .prepare(sql.readById)
        .bind(user_id)
        .first();

    return response;
};

/**
 * updateExercises
 * Role: Update the daily_exercise JSON payload for the specified user_id.
 * Returns: nothing (consider returning update metadata if needed).
 */
export const updateExercises = async (db, user_id, daily_exercise) => {
    await db
        .prepare(sql.update)
        .bind(daily_exercise, user_id)
        .run();
};

/**
 * deleteExercise
 * Role: Remove all daily_exercise rows for the specified user_id and return DB response.
 * Returns: DB response object (e.g., changes/rowsAffected).
 */
export const deleteExercise = (db, user_id) => {
    return db
        .prepare(sql.delete)
        .bind(user_id)
        .run();
};