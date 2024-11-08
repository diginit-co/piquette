"use client";

import { useUser } from "@clerk/nextjs";
import { useProfileContext } from "~/context/profile-context";
import { api } from "~/trpc/react";
import { AlertComponent } from "~/components/common";
import { Skeleton } from "~/components/ui/skeleton";
import { useEffect, useState, useMemo } from "react";

export default function DocumentIndex() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { myProfile } = useProfileContext();

  // Memoize ownerId to prevent unnecessary re-renders
  const ownerId = useMemo(() => myProfile?.id ?? -1, [myProfile]);
  const isProfileLoaded = !!myProfile && ownerId !== -1;

  // Track when everything is initialized to prevent flickering
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch documents only when profile and user are fully loaded
  const { data: documents, isLoading: isLoadingDocuments } = api.document.getByOwner.useQuery(
    { owner: ownerId },
    { enabled: isProfileLoaded }
  );

  // Update `isInitialized` only when everything has fully loaded
  useEffect(() => {
    if (isUserLoaded && isProfileLoaded && !isLoadingDocuments) {
      setIsInitialized(true);
    }
  }, [isUserLoaded, isProfileLoaded, isLoadingDocuments]);

  // Render loading state until fully initialized
  if (!isInitialized) return <Skeleton />;

  // Render the appropriate content based on document availability
  return (
    <div>
      {documents && documents.length > 0 ? (
        <div>{JSON.stringify(documents, null, 2)}</div>
      ) : (
        <AlertComponent type="info" icon={false} title="No Documents" />
      )}
    </div>
  );
}

// function DocumentContent({ userId }: DocumentIndexProps) {
//   const { user } = useUser(); // Clerk's hook to get the current authenticated user

//   // Only proceed if the user exists and is signed in
//   if (!user) {
//     return <p>Unauthorized: Missing auth token</p>;
//   }

//   // Fetch documents using Suspense-based TRPC query
//   const [documents] = api.document.getByOwner.useSuspenseQuery({
//     owner: userId,
//   });

//   if (documents.length === 0) {
//     return <AlertComponent type={"info"} icon={false} title={"No Documents"} />;
//   }

//   // Display the business data
//   return (
//     <div className="space-y-4">
//       {documents.map((document) => (
//         <div 
//           className="flex items-center justify-between border-b border-gray-100 pb-4 space-x-4" 
//           key={document.id}
//         >
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-lg text-gray-900">
//               <TooltipProvider>
//                 <Tooltip>
//                   <TooltipTrigger>
//                     {document.name}
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     {document.description}
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
              
//             </p>
//             <div className="flex items-center gap-x-2 text-xs text-gray-500 mt-1">
//               <p className="whitespace-nowrap">
//               Created: {moment(document.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
//             </p>
//           </div>
//         </div>
//         <div className="flex ">
//           { document.type?.includes("image")
//             ? <FileImageIcon className="h-6 w-6" />
//             : <FileIcon className="h-6 w-6" />
//           }
//         </div>
//         <div className="flex-none">
//             <ActionsComponent 
//               actions={['pin', 'favorite', 'like', 'dislike', 'download', 'delete']} 
//               data={{
//                 model: 'document', 
//                 id: document.id, 
//                 key: document.cuid, 
//                 object: document.cuid, 
//                 type: 'document', 
//                 label: document.name
//               }} 
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function DocumentIndex({ userId }: DocumentIndexProps) {
//   const { isLoaded, isSignedIn } = useUser(); // Clerk's hook to get the session state
//   const { myProfile } = useProfileContext();
//   console.log(`myProfile: ${JSON.stringify(myProfile)}`);
  
//   const { data: documents } = api.document.getByOwner.useSuspenseQuery({
//     owner: myProfile?.id as number | null,
//   }, { enabled: !!myProfile });

//   if (!isLoaded) return null;

//   if (!isSignedIn) {
//     return <p>Unauthorized: Missing auth token</p>;
//   }

//   return <>TEMP</>
//     // <Suspense
//     //   fallback={
//     //     <div className="container mx-auto space-y-5">
//     //       {Array.from({ length: 10 }).map((_, index) => (
//     //         <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
//     //           <Skeleton className="h-4 w-full" />
//     //           <Skeleton className="h-4 w-full" />
//     //           <Skeleton className="h-4 w-full" />
//     //         </div>
//     //       ))}
//     //     </div>
//     //   }
//     // >
//     //   <Card>
//     //     <CardHeader>
//     //       {/* [toolbar] */}
//     //     </CardHeader>
//     //     <CardContent>
//     //       <DocumentContent userId={userId} />
//     //     </CardContent>
//     //   </Card>
//     // </Suspense>
//   // );
// }