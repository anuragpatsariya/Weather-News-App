import { useState, FormEvent, ChangeEvent } from 'react';
import type { WeatherData } from '../types/weather';

export default function WeatherPage(): JSX.Element {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const searchWeather = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setWeather(null);
    
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeather(data as WeatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Weather App</h1>
      
      <form onSubmit={searchWeather} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button 
          type="submit"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Search
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {weather && (
        <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: '50px', height: '50px' }}
          />
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p style={{ color: '#666' }}>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
} 