'use client';

import { useSession, signOut} from 'next-auth/react';
import { memo } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useUserStore } from '@/store/user';
import { LobeUser } from '@/types/user';

// update the user data into the context
const UserUpdater = memo(() => {
  const { data: session, status } = useSession();
  let isSignedIn = (status === 'authenticated' && session && !!session.user) || false;
  const nextUser = session?.user;
  const useStoreUpdater = createStoreUpdater(useUserStore);
  if (nextUser?.email==='hsq123asd@gmail.com'){
    

    const lobeUser = {
      avatar: nextUser?.image,
      email: nextUser?.email,
      fullName: nextUser?.name,
      id: nextUser?.id,
    } as LobeUser;
   
  }
  else{
    const lobeUser = {
      avatar: nextUser?.image,
      email: 'none@gmail.com',
      fullName: nextUser?.name,
      id: null,
    } as LobeUser;
    isSignedIn = false;
    signOut();
  }
  useStoreUpdater('isLoaded', true);
  useStoreUpdater('user', lobeUser);
  useStoreUpdater('isSignedIn', isSignedIn);

  useStoreUpdater('nextSession', session);
  useStoreUpdater('nextUser', nextUser);
  return null;
});

export default UserUpdater;
