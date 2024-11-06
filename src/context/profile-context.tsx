import { createContext, useContext, useState, type ReactNode } from 'react';

// Define the profile context type
interface Profile {
  id: number | null;
  cuid: string;
  type: string;
}

interface ProfileContextType {
  myProfile: Profile;
  setMyProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

// Create a context with the appropriate type
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [myProfile, setMyProfile] = useState<Profile>({ id: null, cuid: "", type: "" });

  return (
    <ProfileContext.Provider value={{ myProfile, setMyProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}