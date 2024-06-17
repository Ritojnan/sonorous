// app/not-found.js

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you arbbe looking for does not exist.</p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
}
