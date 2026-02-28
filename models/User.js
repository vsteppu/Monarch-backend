import { randomUUID } from "crypto";
import { env } from "cloudflare:workers";

export const db = env.MONARCH_DB;

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

/* Prepared SQL statements used by the model helpers */
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
};

/**
 * Initialize the users table on a D1 binding.
 * Role: Ensure the users table exists before performing CRUD operations.
 * Usage: await initUsersTable(env.DB)
 */
export const initUsersTable = async () => {
    await db.prepare(createUsersTableSQL).run();
};

/**
 * Simple helper to create a user row in D1.
 * Role: Insert a new user, generating a UUID for id, then return the inserted user record.
 * Note: Expects password to already be hashed.
 */
export const createUser = async ({ name, email, password }) => {
    const id = randomUUID();

    await db
        .prepare(sql.create)
        .bind(name, email, password, id)
        .run();

    const user = await authenticateUser(db, email);
    return user;
};

/**
 * Fetch a user by email.
 * Role: Query the users table for the first record matching the given email.
 * Returns the full row or undefined if not found.
 */
export const authenticateUser = async (email) => {
    const response = await db
        .prepare(sql.readByEmail)
        .bind(email)
        .first();

    return response;
};

/**
 * Fetch a user by id.
 * Role: Retrieve a single user row by its UUID primary key.
 */
export const getUserById = async (id) => {
    const response = await db
        .prepare(sql.readById)
        .bind(id)
        .first();

    return response;
};

/**
 * Update a user's fields by id.
 * Role: Update name, email, and password for the specified user and return the DB response.
 */
export const updateUser = async (id, { name, email, password }) => {
    const response = await db
        .prepare(sql.update)
        .bind(name, email, password, id)
        .run();

    return response;
};

/**
 * Delete a user by id.
 * Role: Remove the user row with the given id and return the DB response.
 */
export const deleteUser = (id) => {
    return db
        .prepare(sql.delete)
        .bind(id)
        .run();
};
