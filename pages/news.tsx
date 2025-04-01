import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import type { NewsData } from '../types/news';
import type { NextPage } from 'next';

const NewsPage: NextPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [news, setNews] = useState<NewsData | null>(null);
  const [error, setError] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchNews = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setNews(null);
    
    try {
      const response = await fetch(`/api/news?keyword=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch news data');
      }
      
      setNews(data as NewsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>News App</h1>
      
      <form onSubmit={searchNews} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Enter Country Name"
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

      {isClient && news && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {news.articles.map((article: { title: string; description: string; url: string }, index: number) => (
            <div key={index} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>{article.title}</h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>{article.description}</p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#0070f3', 
                  textDecoration: 'none',
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px'
                }}
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsPage; 