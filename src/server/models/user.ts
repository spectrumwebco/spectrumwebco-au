import crypto from 'crypto';

import pool from '../config/db';

export interface User {
  id?: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Hash a password using SHA-256
 * @param password The password to hash
 * @returns The hashed password
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Create a new user
 * @param user The user data
 * @returns The created user
 */
export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { email, password_hash, first_name, last_name } = user;
  
  const query = `
    INSERT INTO users (email, password_hash, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const values = [email, password_hash, first_name, last_name];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Get a user by email
 * @param email The email of the user to get
 * @returns The user or null if not found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;
  
  const values = [email];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Get a user by ID
 * @param id The ID of the user to get
 * @returns The user or null if not found
 */
export async function getUserById(id: number): Promise<User | null> {
  const query = `
    SELECT * FROM users
    WHERE id = $1
  `;
  
  const values = [id];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Update a user
 * @param id The ID of the user to update
 * @param user The updated user data
 * @returns The updated user or null if not found
 */
export async function updateUser(
  id: number,
  user: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
): Promise<User | null> {
  // Add updated_at to the user object
  const userWithTimestamp = { ...user, updated_at: new Date() };
  
  // Build the SET clause dynamically based on the provided fields
  const setClause = Object.entries(userWithTimestamp)
    .filter(([_, value]) => value !== undefined)
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(', ');
  
  if (!setClause) {
    return getUserById(id); // Nothing to update
  }
  
  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = $1
    RETURNING *
  `;
  
  const values = [id, ...Object.values(userWithTimestamp).filter(value => value !== undefined)];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Delete a user
 * @param id The ID of the user to delete
 * @returns True if the user was deleted, false otherwise
 */
export async function deleteUser(id: number): Promise<boolean> {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
  `;
  
  const values = [id];
  
  const result = await pool.query(query, values);
  return result.rowCount > 0;
}

/**
 * Authenticate a user
 * @param email The user's email
 * @param password The user's password
 * @returns The authenticated user or null if authentication failed
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const passwordHash = hashPassword(password);
  
  const query = `
    SELECT * FROM users
    WHERE email = $1 AND password_hash = $2
  `;
  
  const values = [email, passwordHash];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}