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
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            minWidth: '350px', // Ancho mínimo
            padding: '5px', // Relleno
            fontSize: '1.25rem', // Tamaño de fuente
    
          },
        }}
      />
    </SessionProvider>
  );
};
