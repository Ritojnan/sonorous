// app/not-found.js

import Link from 'next/link';

export default function NotFound() {
  return (
<div className='flex flex-col items-center justify-center h-screen'>
  <h1 className='text-9xl font-bold mb-4'>404</h1>
  <h2 className='text-2xl font-semibold'>Page Not Found 🥲</h2>
  <Link className='text-2xl underline-offset-1 underline' href="/">Go Home</Link>
</div>
  );
}
