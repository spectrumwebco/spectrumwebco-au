import analyticsService from '../services/analytics-service';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';

async function generateTestData() {
  try {
    console.log('Generating test analytics data...');
    
    // Generate random session IDs
    const sessionIds = Array.from({ length: 10 }, () => uuidv4());
    
    // Sample URLs
    const urls = [
      '/',
      '/about',
      '/contact',
      '/blog',
      '/blog/post-1',
      '/blog/post-2',
      '/services',
      '/pricing',
      '/work',
      '/process'
    ];
    
    // Sample referrers
    const referrers = [
      'https://google.com',
      'https://bing.com',
      'https://twitter.com',
      'https://linkedin.com',
      'https://facebook.com',
      'https://github.com',
      null
    ];
    
    // Sample user agents
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
    ];
    
    // Generate page views for the last 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Generate 500 random page views
    const pageViews = [];
    
    for (let i = 0; i < 500; i++) {
      const sessionId = sessionIds[Math.floor(Math.random() * sessionIds.length)];
      const url = urls[Math.floor(Math.random() * urls.length)];
      const referrer = referrers[Math.floor(Math.random() * referrers.length)];
      const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
      const ipAddress = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      
      // Random date between 30 days ago and now
      const randomDate = new Date(
        thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
      );
      
      pageViews.push({
        url,
        sessionId,
        referrer,
        userAgent,
        ipAddress,
        created_at: randomDate
      });
    }
    
    // Sort by date
    pageViews.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
    
    // Insert page views
    for (const pageView of pageViews) {
      await sequelize.query(`
        INSERT INTO page_views (
          url, session_id, referrer, user_agent, ip_address, created_at, updated_at
        ) VALUES (
          :url, :sessionId, :referrer, :userAgent, :ipAddress, :createdAt, :updatedAt
        )
      `, {
        replacements: {
          url: pageView.url,
          sessionId: pageView.sessionId,
          referrer: pageView.referrer,
          userAgent: pageView.userAgent,
          ipAddress: pageView.ipAddress,
          createdAt: pageView.created_at,
          updatedAt: pageView.created_at
        }
      });
    }
    
    console.log(`✅ Generated ${pageViews.length} test page views`);
    
    // Test analytics queries
    console.log('\nTesting analytics queries:');
    
    // Get page views by URL
    const pageViewsByUrl = await analyticsService.getPageViewsByUrl({
      startDate: thirtyDaysAgo,
      endDate: now
    });
    
    console.log('\nPage views by URL:');
    console.table(pageViewsByUrl.slice(0, 5));
    
    // Get page views over time
    const pageViewsOverTime = await analyticsService.getPageViewsOverTime(
      { startDate: thirtyDaysAgo, endDate: now },
      '1 day'
    );
    
    console.log('\nPage views over time (daily):');
    console.table(pageViewsOverTime.slice(0, 5));
    
    // Get unique visitors
    const uniqueVisitors = await analyticsService.getUniqueVisitors({
      startDate: thirtyDaysAgo,
      endDate: now
    });
    
    console.log(`\nUnique visitors: ${uniqueVisitors}`);
    
    // Get top referrers
    const topReferrers = await analyticsService.getTopReferrers(
      { startDate: thirtyDaysAgo, endDate: now },
      5
    );
    
    console.log('\nTop referrers:');
    console.table(topReferrers);
    
    console.log('\n✅ Analytics test completed successfully');
  } catch (error) {
    console.error('❌ Error generating test data:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the test
generateTestData().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
