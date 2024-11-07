import { NextRequest } from 'next/server';
import { api } from '~/trpc/server';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-cuid');
  
  const profileCUID = req.headers.get('x-profile-cuid');
  

  
  

  // handle getByCUID
  if (!userId && profileCUID?.startsWith('profile_')) {
    // strip _profile_ from the cuid
    const profileToken = profileCUID.replace('profile_', '');

    try {
      const profile = await api.profile.getByCUID({ profile: profileToken });
    
      if (profile) {
        return new Response(JSON.stringify({ id: profile.id, cuid: profile.cuid, type: profile.type }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ message: 'Profile not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  
  // handle getByUser
  if (userId && !profileCUID) {
    try {
      const profile = await api.profile.getByUser({ user: userId });
  
      if (profile) {
        return new Response(JSON.stringify({ cuid: profile.cuid }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ message: 'Profile not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      // console.error('Error fetching profile:', error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
}

export async function POST(req: NextRequest) {
  const { userId }: { userId: string } = await req.json() as { userId: string };

  if (!userId) {
    return new Response(JSON.stringify({ message: 'UserId is required' }), {
      status: 400,
      headers: { 
        // 'x-clerk-auth-token': userId,
        'Content-Type': 'application/json'
      },
    });
  }

  console.log('POST request for /api/profile');
  console.log(`UserId: ${userId}`);

  try {
    const newProfile = await api.profile.create({ user: userId } as { user: string });
    return new Response(JSON.stringify({ cuid: newProfile.cuid }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}