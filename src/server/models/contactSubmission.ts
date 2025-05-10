import pool from '../config/db';

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  budget?: string;
  created_at?: Date;
}

/**
 * Create a new contact form submission
 * @param submission The contact form submission data
 * @returns The created contact form submission
 */
export async function createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
  const { name, email, company, phone, message, budget } = submission;
  
  const query = `
    INSERT INTO contact_submissions (name, email, company, phone, message, budget)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  
  const values = [name, email, company, phone, message, budget];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Get all contact form submissions
 * @param limit The maximum number of submissions to return
 * @param offset The number of submissions to skip
 * @returns An array of contact form submissions
 */
export async function getContactSubmissions(limit = 100, offset = 0): Promise<ContactSubmission[]> {
  const query = `
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  
  const values = [limit, offset];
  
  const result = await pool.query(query, values);
  return result.rows;
}

/**
 * Get a contact form submission by ID
 * @param id The ID of the submission to get
 * @returns The contact form submission or null if not found
 */
export async function getContactSubmissionById(id: number): Promise<ContactSubmission | null> {
  const query = `
    SELECT * FROM contact_submissions
    WHERE id = $1
  `;
  
  const values = [id];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Update a contact form submission
 * @param id The ID of the submission to update
 * @param submission The updated submission data
 * @returns The updated contact form submission or null if not found
 */
export async function updateContactSubmission(
  id: number,
  submission: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>
): Promise<ContactSubmission | null> {
  // Build the SET clause dynamically based on the provided fields
  const setClause = Object.entries(submission)
    .filter(([_, value]) => value !== undefined)
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(', ');
  
  if (!setClause) {
    return getContactSubmissionById(id); // Nothing to update
  }
  
  const query = `
    UPDATE contact_submissions
    SET ${setClause}
    WHERE id = $1
    RETURNING *
  `;
  
  const values = [id, ...Object.values(submission).filter(value => value !== undefined)];
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

/**
 * Delete a contact form submission
 * @param id The ID of the submission to delete
 * @returns True if the submission was deleted, false otherwise
 */
export async function deleteContactSubmission(id: number): Promise<boolean> {
  const query = `
    DELETE FROM contact_submissions
    WHERE id = $1
    RETURNING id
  `;
  
  const values = [id];
  
  const result = await pool.query(query, values);
  return result.rowCount > 0;
}

/**
 * Get contact form submissions within a time range
 * @param startDate The start date of the range
 * @param endDate The end date of the range
 * @returns An array of contact form submissions
 */
export async function getContactSubmissionsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<ContactSubmission[]> {
  const query = `
    SELECT * FROM contact_submissions
    WHERE created_at BETWEEN $1 AND $2
    ORDER BY created_at DESC
  `;
  
  const values = [startDate, endDate];
  
  const result = await pool.query(query, values);
  return result.rows;
}