"use client";
import { useUser } from '@clerk/nextjs';
import { useProfileContext } from '~/context/profile-context';
import Head from 'next/head';

export default function DashboardPage() {
  const { myProfile } = useProfileContext();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Piquette | Dashboard</title>
        <meta name="description" content="Dashboard for Piquette" />
      </Head>
      <h1>Home</h1>
      {user && <p>Welcome, {user.firstName}!</p>}
      
      {myProfile && (
        <div>
          <p>Profile ID: {myProfile.id}</p>
          <p>Profile CUID: {myProfile.cuid}</p>
          <p>Profile Type: {myProfile.type}</p>
        </div>
      )}
    </>
  );
}