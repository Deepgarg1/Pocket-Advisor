export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const NOTION_SECRET = process.env.NOTION_SECRET;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing page ID' });
  }

  // Notion block/page IDs must be valid 32-char hex or standard UUID format
  const NOTION_ID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  if (!NOTION_ID_REGEX.test(id)) {
    return res.status(400).json({ error: 'Invalid page ID format' });
  }

  if (!NOTION_SECRET) {
    return res.status(500).json({ error: 'Missing Notion configuration' });
  }

  try {
    let allBlocks = [];
    let startCursor = undefined;
    let hasMore = true;
    let iterations = 0;

    // Paginate through Notion blocks up to 500 blocks
    while (hasMore && iterations < 5) {
      iterations++;
      const url = new URL(`https://api.notion.com/v1/blocks/${encodeURIComponent(id)}/children`);
      url.searchParams.set('page_size', '100');
      if (startCursor) {
        url.searchParams.set('start_cursor', startCursor);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_SECRET}`,
          'Notion-Version': '2022-06-28'
        }
      });
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Notion API returned error status:', response.status, text);
        return res.status(response.status >= 400 && response.status < 500 ? response.status : 502).json({
          error: 'Failed to retrieve article content from Notion'
        });
      }
      
      const data = await response.json();
      if (Array.isArray(data.results)) {
        allBlocks.push(...data.results);
      }
      hasMore = !!data.has_more;
      startCursor = data.next_cursor || undefined;
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.setHeader('Expires', new Date(Date.now() + 300 * 1000).toUTCString());
    return res.status(200).json({ results: allBlocks });
  } catch (error) {
    console.error('Error handling notion-page request:', error);
    return res.status(500).json({ error: 'Internal server error while fetching Notion page' });
  }
}
