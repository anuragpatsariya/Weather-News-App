import type { NextApiRequest, NextApiResponse } from 'next';
import type { WeatherData, WeatherError } from '../../types/weather';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | WeatherError>
): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { city } = req.query;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ message: 'City parameter is required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'OpenWeather API key is not configured' });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Failed to fetch weather data',
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      message: 'Failed to fetch weather data',
    });
  }
} 