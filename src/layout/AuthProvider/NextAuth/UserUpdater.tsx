'use client';

import { useSession} from 'next-auth/react';
import { memo } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { useUserStore } from '@/store/user';
import { LobeUser } from '@/types/user';

// update the user data into the context
const UserUpdater = memo(() => {
  let { data: session, status } = useSession();
  let isSignedIn = (status === 'authenticated' && session && !!session.user) || false;
  const nextUser = session?.user;
  const useStoreUpdater = createStoreUpdater(useUserStore);
  let lobeUser = {
    fullName: nextUser?.name,
    } as LobeUser;
  if (nextUser?.email==='hsq123asd@gmail.com'){
    lobeUser = {
      avatar: nextUser?.image,
      email: nextUser?.email,
      fullName: nextUser?.name,
      id: nextUser?.id,
    } as LobeUser;
   
  }
  else{
    session=null;
    isSignedIn = false;
    // signOut();
  }
  useStoreUpdater('isLoaded', true);
  useStoreUpdater('user', lobeUser);
  useStoreUpdater('isSignedIn', isSignedIn);

  useStoreUpdater('nextSession', session);
  useStoreUpdater('nextUser', nextUser);
  return null;
});

export default UserUpdater;
