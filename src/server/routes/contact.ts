import express from 'express';
import { createContactSubmission, getContactSubmissions, getContactSubmissionById } from '../models/contactSubmission';
import { getSessionByToken } from '../models/session';

const router = express.Router();

/**
 * Submit a contact form
 * POST /api/contact
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone, message, budget } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Create contact submission
    const submission = await createContactSubmission({
      name,
      email,
      company,
      phone,
      message,
      budget,
    });
    
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get all contact form submissions (requires authentication)
 * GET /api/contact
 */
router.get('/', async (req, res) => {
  try {
    // Check authentication
    const sessionToken = req.headers.authorization?.split(' ')[1];
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const session = await getSessionByToken(sessionToken);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get pagination parameters
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;
    
    // Get submissions
    const submissions = await getContactSubmissions(limit, offset);
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Get a contact form submission by ID (requires authentication)
 * GET /api/contact/:id
 */
router.get('/:id', async (req, res) => {
  try {
    // Check authentication
    const sessionToken = req.headers.authorization?.split(' ')[1];
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const session = await getSessionByToken(sessionToken);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get submission ID
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    
    // Get submission
    const submission = await getContactSubmissionById(id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.status(200).json(submission);
  } catch (error) {
    console.error('Error getting contact submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;