"use client";
import { useState } from 'react';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domainname: domain }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <h1>Domain Crawler</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain name"
        />
        <button type="submit">Crawl</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
