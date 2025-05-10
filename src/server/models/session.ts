import pool from '../config/db';
import crypto from 'crypto';

export interface Session {
  id?: number;
  user_id: number;
  session_token: string;
  expires_at: Date;
  created_at?: Date;
}

/**
 * Generate a random session token
 * @returns A random session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a new session
 * @param userId The ID of the user
 * @param expiresIn The number of seconds until the session expires (default: 7 days)
 * @returns The created session
 */
export async function createSession(userId: number, expiresIn = 7 * 24 * 60 * 60): Promise<Session> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  
  const query = `
    INSERT INTO sessions (user_id, session_token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const values = [userId, sessionToken, expiresAt];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Get a session by token
 * @param token The session token
 * @returns The session or null if not found
 */
export async function getSessionByToken(token: string): Promise<Session | null> {
  const query = `
    SELECT * FROM sessions
    WHERE session_token = $1 AND expires_at > NOW()
  `;
  
  const values = [token];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Delete a session
 * @param token The session token
 * @returns True if the session was deleted, false otherwise
 */
export async function deleteSession(token: string): Promise<boolean> {
  const query = `
    DELETE FROM sessions
    WHERE session_token = $1
    RETURNING id
  `;
  
  const values = [token];
  
  const result = await pool.query(query, values);
  return result.rowCount > 0;
}

/**
 * Delete all sessions for a user
 * @param userId The ID of the user
 * @returns The number of sessions deleted
 */
export async function deleteUserSessions(userId: number): Promise<number> {
  const query = `
    DELETE FROM sessions
    WHERE user_id = $1
    RETURNING id
  `;
  
  const values = [userId];
  
  const result = await pool.query(query, values);
  return result.rowCount;
}

/**
 * Delete expired sessions
 * @returns The number of sessions deleted
 */
export async function deleteExpiredSessions(): Promise<number> {
  const query = `
    DELETE FROM sessions
    WHERE expires_at <= NOW()
    RETURNING id
  `;
  
  const result = await pool.query(query);
  return result.rowCount;
}

/**
 * Extend a session's expiration time
 * @param token The session token
 * @param expiresIn The number of seconds to extend the session by (default: 7 days)
 * @returns The updated session or null if not found
 */
export async function extendSession(token: string, expiresIn = 7 * 24 * 60 * 60): Promise<Session | null> {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  
  const query = `
    UPDATE sessions
    SET expires_at = $2
    WHERE session_token = $1 AND expires_at > NOW()
    RETURNING *
  `;
  
  const values = [token, expiresAt];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}