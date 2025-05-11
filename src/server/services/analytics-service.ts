import PageView from '../models/PageView';
import sequelize from '../config/database';
import { Op } from 'sequelize';

interface PageViewData {
  url: string;
  userId?: string;
  sessionId: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
}

interface TimeRange {
  startDate: Date;
  endDate: Date;
}

class AnalyticsService {
  /**
   * Track a page view
   */
  async trackPageView(data: PageViewData): Promise<PageView> {
    return await PageView.create({
      url: data.url,
      user_id: data.userId,
      session_id: data.sessionId,
      referrer: data.referrer,
      user_agent: data.userAgent,
      ip_address: data.ipAddress,
      created_at: new Date()
    });
  }

  /**
   * Get page views for a specific time range
   */
  async getPageViews(timeRange: TimeRange): Promise<PageView[]> {
    return await PageView.findAll({
      where: {
        created_at: {
          [Op.between]: [timeRange.startDate, timeRange.endDate]
        }
      },
      order: [['created_at', 'DESC']]
    });
  }

  /**
   * Get page view count by URL
   */
  async getPageViewsByUrl(timeRange: TimeRange): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT 
        url, 
        COUNT(*) as view_count
      FROM page_views
      WHERE created_at BETWEEN :startDate AND :endDate
      GROUP BY url
      ORDER BY view_count DESC
    `, {
      replacements: { 
        startDate: timeRange.startDate, 
        endDate: timeRange.endDate 
      }
    });

    return results as any[];
  }

  /**
   * Get page views over time (for charts)
   */
  async getPageViewsOverTime(timeRange: TimeRange, interval: string = '1 hour'): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT 
        time_bucket(:interval, created_at) AS time_bucket,
        COUNT(*) as view_count
      FROM page_views
      WHERE created_at BETWEEN :startDate AND :endDate
      GROUP BY time_bucket
      ORDER BY time_bucket
    `, {
      replacements: { 
        interval,
        startDate: timeRange.startDate, 
        endDate: timeRange.endDate 
      }
    });

    return results as any[];
  }

  /**
   * Get unique visitors count
   */
  async getUniqueVisitors(timeRange: TimeRange): Promise<number> {
    const [results] = await sequelize.query(`
      SELECT 
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_views
      WHERE created_at BETWEEN :startDate AND :endDate
    `, {
      replacements: { 
        startDate: timeRange.startDate, 
        endDate: timeRange.endDate 
      }
    });

    return results[0]?.unique_visitors || 0;
  }

  /**
   * Get top referrers
   */
  async getTopReferrers(timeRange: TimeRange, limit: number = 10): Promise<any[]> {
    const [results] = await sequelize.query(`
      SELECT 
        referrer, 
        COUNT(*) as count
      FROM page_views
      WHERE 
        created_at BETWEEN :startDate AND :endDate
        AND referrer IS NOT NULL
        AND referrer != ''
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT :limit
    `, {
      replacements: { 
        startDate: timeRange.startDate, 
        endDate: timeRange.endDate,
        limit
      }
    });

    return results as any[];
  }
}

export default new AnalyticsService();
