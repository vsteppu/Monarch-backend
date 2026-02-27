import { randomUUID } from "crypto";

/**
 * SQL DDL for Cloudflare D1 to mirror the Sequelize User model.
 * - id: TEXT (UUID generated in app code)
 * - name, email, password: required TEXT
 * - timestamps and soft-delete (deleted_at)
 */
export const createUsersTableSQL = `
	CREATE TABLE IF NOT EXISTS users (
	id TEXT PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	password TEXT NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    rank TEXT NOT NULL DEFAULT e,
    status TEXT NOT NULL DEFAULT beginner,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP
	);
`;

const sql = {
    create: `
        INSERT INTO users (name, email, password, id, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `,
    readById: `
        SELECT * FROM users WHERE id = ?
    `,
    readByEmail: `
        SELECT * FROM users WHERE email = ?
    `,
    update: `
        UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `,
    delete: `
        DELETE FROM users WHERE id = ?
    `
}

/**
 * Initialize the users table on a D1 binding.
 * Usage: await initUsersTable(env.DB)
 */
export const initUsersTable = async (db) => {
    await db.prepare(createUsersTableSQL).run();
};

/**
 * Simple helper to create a user row in D1.
 * Generates a UUID for id if not provided.
 * Returns the inserted record id and fields (does not return hashed password or fetched row).
 */
export const createUser = async (db, { name, email, password }) => {
    const id = randomUUID();

    const response = await db
        .prepare(sql.create)
        .bind(name, email, password, id)
        .run();
    return response;
};

export const authenticateUser = async (db, email) => {
    const response = await db
        .prepare(sql.readByEmail)
        .bind(email)
        .first();

    return response;
};

export const getUserById = async (db, id) => {
    const response = await db
        .prepare(sql.readById)
        .bind(id)
        .first();

    return response;
};

export const updateUser = async (db, id, { name, email, password }) => {
    const response = await db
        .prepare(sql.update)
        .bind(name, email, password, id)
        .run();

    return response;
};

export const deleteUser = (db, id) => {
    return db
        .prepare(sql.delete)
        .bind(id)
        .run();
};

export default {
    createUsersTableSQL,
    initUsersTable,
    createUser,
    authenticateUser,
    getUserById,
};
