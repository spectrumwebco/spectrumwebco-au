import express from 'express';
import { createUser, getUserByEmail, hashPassword } from '../models/user';
import { createSession, deleteSession, getSessionByToken, deleteUserSessions } from '../models/session';

const router = express.Router();

/**
 * Register a new user
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Create user
    const passwordHash = hashPassword(password);
    const user = await createUser({
      email,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName,
    });
    
    // Create session
    const session = await createSession(user.id!);
    
    // Return user and session token
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      sessionToken: session.session_token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Login a user
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const passwordHash = hashPassword(password);
    if (user.password_hash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Create session
    const session = await createSession(user.id!);
    
    // Return user and session token
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      sessionToken: session.session_token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Logout a user
 * POST /api/auth/logout
 */
router.post('/logout', async (req, res) => {
  try {
    const { sessionToken } = req.body;
    
    // Validate input
    if (!sessionToken) {
      return res.status(400).json({ error: 'Session token is required' });
    }
    
    // Delete session
    await deleteSession(sessionToken);
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get the current user
 * GET /api/auth/me
 */
router.get('/me', async (req, res) => {
  try {
    const sessionToken = req.headers.authorization?.split(' ')[1];
    
    // Validate input
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get session
    const session = await getSessionByToken(sessionToken);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get user
    const user = await getUserByEmail(session.user_id.toString());
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Return user
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;