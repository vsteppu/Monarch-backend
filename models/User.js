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
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	deleted_at TIMESTAMP
	);
`;

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
    console.log("id: ", id);
    const sql = `
        INSERT INTO users ( name, email, password, id, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	`;
    console.log("sql: ", sql);
    const response = await db
        .prepare(sql)
        .bind(name, email, password, id)
        .run();
    console.log("response: ", response);
    return response;
};

export const authenticateUser = async (db, { email, password }) => {
    const sql = `
        SELECT * FROM users WHERE email = ? LIMIT 1
    `;
    const user = await db.prepare(sql).bind(email).first();
    if (!user) return null;

    const isValid = bcrypt.compareSync(password, user.password);
    return isValid ? user : null;
};

export default {
    createUsersTableSQL,
    initUsersTable,
    createUser,
    authenticateUser,
};
