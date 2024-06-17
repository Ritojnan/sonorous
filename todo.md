// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  
  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  // Optional callbacks
  callbacks: {
    async signIn(user, account, profile) {
      // Add custom sign in logic here
      return true;
    },
    async session(session, user) {
      // Add custom session logic here
      return session;
    },
  },
});









```// pages/protected.js

import { useSession, getSession } from 'next-auth/client';

export default function ProtectedPage() {
  const [session, loading] = useSession();

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}

// Optional: Server-side rendering
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
```