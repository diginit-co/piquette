// src/context/profile-context.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Profile {
  id: number | null;
  cuid: string;
  type: string;
}

interface ProfileContextType {
  myProfile: Profile;
  setMyProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [myProfile, setMyProfile] = useState<Profile>({ id: null, cuid: '', type: '' });
  
  useEffect(() => {
    const fetchProfile = async () => {
      const profileToken = document.cookie
        .split('; ')
        .find((row) => row.trim().startsWith('__piquette='))
        ?.split('=')[1];

      if (profileToken) {
        try {
          const response = await fetch('/api/profile', {
            headers: {
              'Authorization': `Bearer ${profileToken}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setMyProfile({ id: data.id, cuid: data.cuid, type: data.type });
          } else {
            setMyProfile({ id: 0, cuid: 'data.cuid', type: 'data.type' });
          }
        } catch (error) {
          setMyProfile({ id: 1, cuid: 'data.cuid', type: 'data.type' });
        }
      } else {
        setMyProfile({ id: 2, cuid: 'data.cuid', type: 'data.type' });
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ myProfile, setMyProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}