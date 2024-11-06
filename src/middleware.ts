import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const authObj = auth();
  const userId = authObj?.userId;

  if (!userId) {
    console.log("No authenticated user detected");
    return NextResponse.next();
  }

  let profileCUID; // Variable to store profile cuid

  try {
    // Attempt to fetch the profile with userId passed as a header
    const profileResponse = await fetch(`${req.nextUrl.origin}/api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId, // Pass userId as a custom header
      },
    });

    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      profileCUID = profileData.cuid; // Use the retrieved cuid if profile exists
    } else {
      // Profile not found, create a new profile
      const createResponse = await fetch(`${req.nextUrl.origin}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (createResponse.ok) {
        const newProfileData = await createResponse.json();
        profileCUID = `profile_${newProfileData.cuid}`; // Use the new profile's cuid
        // Set the profile cookie with the new cuid
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

  // Set the profile cookie if cuid is available
  if (profileCUID) {
    const response = NextResponse.next();
    response.cookies.set('__piquette', `profile_${profileCUID}`, { path: '/', httpOnly: false });
    return response;
  }

  // Continue with the original middleware logic
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