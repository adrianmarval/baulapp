'use client';
import {signOut, useSession} from 'next-auth/react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {Button} from '@mui/material';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export function LogoutButton() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [session]);

  const openCenterPopup = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(url, title, `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`);

    newWindow?.focus();
  };

  if (status === 'unauthenticated') {
    return (
      <Button
        variant='contained'
        onClick={() => {
          openCenterPopup('/auth/signin', 'Sample Sign In');
        }}
        className='group flex items-center space-x-4 rounded-md bg-green-600 p-2 font-medium'
        type='submit'
      >
        <p>Login</p>
        <LoginIcon />
      </Button>
    );
  }

  if (status === 'loading') {
    return (
      <Button
        variant='contained'
        onClick={() => {
          openCenterPopup('/auth/signin', 'Sample Sign In');
        }}
        className='group flex items-center space-x-4 rounded-md p-2 font-medium'
        type='submit'
      >
        <p>Espere...</p>
        <HourglassEmptyIcon />
      </Button>
    );
  }

  return (
    <Button
      variant='contained'
      onClick={() => {
        signOut({redirect: false});
        router.refresh();
      }}
      className='group flex items-center space-x-4 rounded-md bg-red-600 p-2 font-medium'
      type='submit'
    >
      <p>Logout</p>
      <LogoutIcon />
    </Button>
  );
}
