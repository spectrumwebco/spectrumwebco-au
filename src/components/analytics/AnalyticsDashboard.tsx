import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface PageViewsByUrl {
  url: string;
  view_count: number;
}

interface PageViewsOverTime {
  time_bucket: string;
  view_count: number;
}

interface TopReferrer {
  referrer: string;
  count: number;
}

interface AnalyticsDashboardProps {
  timeRange?: {
    startDate: Date;
    endDate: Date;
  };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  timeRange = {
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date()
  }
}) => {
  const [pageViewsByUrl, setPageViewsByUrl] = useState<PageViewsByUrl[]>([]);
  const [pageViewsOverTime, setPageViewsOverTime] = useState<PageViewsOverTime[]>([]);
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(0);
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Format dates for API requests
        const startDateStr = timeRange.startDate.toISOString();
        const endDateStr = timeRange.endDate.toISOString();
        
        // Fetch page views by URL
        const pageViewsByUrlResponse = await fetch(
          `/api/analytics/pageviews/by-url?startDate=${startDateStr}&endDate=${endDateStr}`
        );
        
        if (!pageViewsByUrlResponse.ok) {
          throw new Error('Failed to fetch page views by URL');
        }
        
        const pageViewsByUrlData = await pageViewsByUrlResponse.json();
        setPageViewsByUrl(pageViewsByUrlData.data);
        
        // Fetch page views over time
        const pageViewsOverTimeResponse = await fetch(
          `/api/analytics/pageviews/over-time?startDate=${startDateStr}&endDate=${endDateStr}&interval=1 day`
        );
        
        if (!pageViewsOverTimeResponse.ok) {
          throw new Error('Failed to fetch page views over time');
        }
        
        const pageViewsOverTimeData = await pageViewsOverTimeResponse.json();
        setPageViewsOverTime(pageViewsOverTimeData.data);
        
        // Fetch unique visitors
        const uniqueVisitorsResponse = await fetch(
          `/api/analytics/visitors/unique?startDate=${startDateStr}&endDate=${endDateStr}`
        );
        
        if (!uniqueVisitorsResponse.ok) {
          throw new Error('Failed to fetch unique visitors');
        }
        
        const uniqueVisitorsData = await uniqueVisitorsResponse.json();
        setUniqueVisitors(uniqueVisitorsData.data.uniqueVisitors);
        
        // Fetch top referrers
        const topReferrersResponse = await fetch(
          `/api/analytics/referrers/top?startDate=${startDateStr}&endDate=${endDateStr}&limit=5`
        );
        
        if (!topReferrersResponse.ok) {
          throw new Error('Failed to fetch top referrers');
        }
        
        const topReferrersData = await topReferrersResponse.json();
        setTopReferrers(topReferrersData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Page Views */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Page Views</h3>
          <p className="text-3xl font-bold">
            {pageViewsOverTime.reduce((sum, item) => sum + Number(item.view_count), 0)}
          </p>
        </div>
        
        {/* Unique Visitors */}
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold">{uniqueVisitors}</p>
        </div>
        
        {/* Date Range */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Date Range</h3>
          <p className="text-sm">
            {format(timeRange.startDate, 'MMM d, yyyy')} - {format(timeRange.endDate, 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Top Pages</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pageViewsByUrl.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                      {item.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.view_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Referrers */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Top Referrers</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topReferrers.length > 0 ? (
                  topReferrers.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                        {item.referrer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                      No referrer data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
