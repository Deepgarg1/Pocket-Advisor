export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const NOTION_SECRET = process.env.NOTION_SECRET;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;
  
  if (!NOTION_SECRET || !DATABASE_ID) {
    return res.status(500).json({ error: 'Missing Notion configuration. Please add NOTION_SECRET and NOTION_DATABASE_ID to your environment variables.' });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${encodeURIComponent(DATABASE_ID)}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sorts: [{ timestamp: 'created_time', direction: 'descending' }]
      })
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Notion feed API returned error status:', response.status, text);
      return res.status(response.status >= 400 && response.status < 500 ? response.status : 502).json({
        error: 'Failed to retrieve feed from Notion'
      });
    }
    
    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.setHeader('Expires', new Date(Date.now() + 300 * 1000).toUTCString());
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error handling notion-feed request:', error);
    return res.status(500).json({ error: 'Internal server error while fetching Notion feed' });
  }
}
