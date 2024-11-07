import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const authObj = auth();
  const userId = authObj?.userId;

  if (!userId) {
    // console.log("No authenticated user detected");
    return NextResponse.next();
  }

  let profileCUID: string | undefined; // Variable to store profile cuid

  if (!req.cookies.has('__piquette')) {
    try {
      const profileResponse = await fetch(`${req.nextUrl.origin}/api/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-user-cuid': userId,
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json() as { cuid: string };
        profileCUID = profileData.cuid;
      } else {
        const createResponse = await fetch(`${req.nextUrl.origin}/api/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (createResponse.ok) {
          const newProfileData = await createResponse.json() as { cuid: string };
          profileCUID = `profile_${newProfileData.cuid}`;
          const response = NextResponse.next();
          response.cookies.set('__piquette', profileCUID, { path: '/', httpOnly: false });
          return response;
        } else {
          console.error('Failed to create profile');
        }
      }
    } catch (error) {
      console.error('Error while fetching or creating profile:', error);
    }

    if (profileCUID) {
      const response = NextResponse.next();
      response.cookies.set('__piquette', `profile_${profileCUID}`, { path: '/', httpOnly: false });
      return response;
    }
  }

  if (isProtectedRoute(req)) authObj.protect();
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/((?!!builder\\.io).*)'
  ],
};