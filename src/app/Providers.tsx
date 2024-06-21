'use client';
import React from 'react';
import {SessionProvider} from 'next-auth/react';
import {Toaster} from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({children}: Props) => {
  return (
    <SessionProvider>
      {children}
      <Toaster position='bottom-left' />
    </SessionProvider>
  );
};
