import express, { Request, Response } from 'express';
import analyticsService from '../services/analytics-service';

const router = express.Router();

// Track page view
router.post('/pageview', async (req: Request, res: Response) => {
  try {
    const { url, userId, sessionId, referrer, userAgent } = req.body;
    
    if (!url || !sessionId) {
      return res.status(400).json({ error: 'URL and sessionId are required' });
    }
    
    const ipAddress = req.ip || req.socket.remoteAddress || '';
    
    const pageView = await analyticsService.trackPageView({
      url,
      userId,
      sessionId,
      referrer,
      userAgent: userAgent || req.headers['user-agent'],
      ipAddress
    });
    
    res.status(201).json({ success: true, data: pageView });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(500).json({ error: 'Failed to track page view' });
  }
});

// Get page views by URL
router.get('/pageviews/by-url', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
    
    const pageViews = await analyticsService.getPageViewsByUrl({ startDate, endDate });
    
    res.json({ success: true, data: pageViews });
  } catch (error) {
    console.error('Error getting page views by URL:', error);
    res.status(500).json({ error: 'Failed to get page views by URL' });
  }
});

// Get page views over time
router.get('/pageviews/over-time', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Default to last 7 days
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
    const interval = req.query.interval as string || '1 hour';
    
    const pageViews = await analyticsService.getPageViewsOverTime({ startDate, endDate }, interval);
    
    res.json({ success: true, data: pageViews });
  } catch (error) {
    console.error('Error getting page views over time:', error);
    res.status(500).json({ error: 'Failed to get page views over time' });
  }
});

// Get unique visitors
router.get('/visitors/unique', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
    
    const uniqueVisitors = await analyticsService.getUniqueVisitors({ startDate, endDate });
    
    res.json({ success: true, data: { uniqueVisitors } });
  } catch (error) {
    console.error('Error getting unique visitors:', error);
    res.status(500).json({ error: 'Failed to get unique visitors' });
  }
});

// Get top referrers
router.get('/referrers/top', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date();
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    const topReferrers = await analyticsService.getTopReferrers({ startDate, endDate }, limit);
    
    res.json({ success: true, data: topReferrers });
  } catch (error) {
    console.error('Error getting top referrers:', error);
    res.status(500).json({ error: 'Failed to get top referrers' });
  }
});

export default router;
