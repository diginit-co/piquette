"use client";

import { useUser } from "@clerk/nextjs"; // Clerk's hook to get the current user
import { Suspense } from "react";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";

interface BusinessIndexProps {
  userId: string;
}

function BusinessContent({ userId }: BusinessIndexProps) {
  const { user } = useUser(); // Clerk's hook to get the current authenticated user

  // Only proceed if the user exists and is signed in
  if (!user) {
    return <p>Unauthorized: Missing auth token</p>;
  }

  // Fetch businesses using Suspense-based TRPC query
  const [businesses] = api.business.getByOwner.useSuspenseQuery({
    owner: userId,
  });

  // Display the business data
  return (
    <div className="container mx-auto">
      
        {businesses.map((business) => (
          <div key={business.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h3 className="text-xl font-bold">{business.name}</h3>
            <p className="text-gray-600">{business.description}</p>
            <p className="text-gray-500">{business.location}</p>
            <p className="text-gray-500">{business.industry}</p>
          </div>
        ))}
      
    </div>
  );
}

export default function BusinessIndex({ userId }: BusinessIndexProps) {
  const { isLoaded, isSignedIn } = useUser(); // Clerk's hook to get the session state

  if (!isLoaded) {
    return (
      <div className="container mx-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
      </div>
    );
  }

  if (!isSignedIn) {
    return <p>Unauthorized: Missing auth token</p>;
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      }
    >
      <BusinessContent userId={userId} />
    </Suspense>
  );
}