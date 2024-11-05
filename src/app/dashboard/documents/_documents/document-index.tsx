"use client";

import { useUser } from "@clerk/nextjs"; // Clerk's hook to get the current user
import { Suspense } from "react";
import { api } from "~/trpc/react";
import moment from "moment";
import Link from "next/link";

import { FileIcon, FileImageIcon } from "lucide-react";
import { ActionsComponent } from "~/components/common";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "~/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
 } from "~/components/ui/tooltip";
import { Skeleton } from "~/components/ui/skeleton";

interface DocumentIndexProps {
  userId: string;
}

function DocumentContent({ userId }: DocumentIndexProps) {
  const { user } = useUser(); // Clerk's hook to get the current authenticated user

  // Only proceed if the user exists and is signed in
  if (!user) {
    return <p>Unauthorized: Missing auth token</p>;
  }

  // Fetch documents using Suspense-based TRPC query
  const [documents] = api.document.getByOwner.useSuspenseQuery({
    owner: userId,
  });

  // Display the business data
  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <div 
          className="flex items-center justify-between border-b border-gray-100 pb-4 space-x-4" 
          key={document.id}
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-lg text-gray-900">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {document.name}
                  </TooltipTrigger>
                  <TooltipContent>
                    {document.description}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            </p>
            <div className="flex items-center gap-x-2 text-xs text-gray-500 mt-1">
              <p className="whitespace-nowrap">
              Created: {moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        </div>
        <div className="flex ">
          { document.type?.includes("image")
            ? <FileImageIcon className="h-6 w-6" />
            : <FileIcon className="h-6 w-6" />
          }
        </div>
        <div className="flex-none">
            <ActionsComponent 
              actions={['pin', 'favorite', 'like', 'dislike', 'download', 'delete']} 
              data={{
                model: 'document', 
                id: document.id, 
                key: document.cuid, 
                object: document.cuid, 
                type: 'document', 
                label: document.name
              }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DocumentIndex({ userId }: DocumentIndexProps) {
  const { isLoaded, isSignedIn } = useUser(); // Clerk's hook to get the session state

  if (!isLoaded) {
    return (
      <div className="container mx-auto space-y-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <Skeleton className="h-4 w-full" />
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
        <div className="container mx-auto space-y-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      }
    >
      <Card>
        <CardHeader>
          {/* [toolbar] */}
        </CardHeader>
        <CardContent>
          <DocumentContent userId={userId} />
        </CardContent>
      </Card>
    </Suspense>
  );
}