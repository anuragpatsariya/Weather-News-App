import type { NextApiRequest, NextApiResponse } from 'next';
import type { NewsData, NewsError } from '../../types/news';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsData | NewsError>
): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ message: 'Keyword parameter is required' });
  }

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'News API key is not configured' });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        keyword
      )}&apiKey=${apiKey}&language=en&sortBy=publishedAt&pageSize=10`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        message: errorData.message || 'Failed to fetch news data',
      });
    }

    const data = await response.json();
    
    // Ensure we have the expected data structure
    if (!data.articles || !Array.isArray(data.articles)) {
      return res.status(500).json({
        message: 'Invalid news data format received',
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('News API Error:', error);
    return res.status(500).json({
      message: 'Failed to fetch news data',
    });
  }
} 