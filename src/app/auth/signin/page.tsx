'use client';
import {Spinner} from '@/components/common/Spinner';
import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';

const SigninPage = () => {
  const {data: session, status} = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) void signIn();
    if (session) window.close();
  }, [session, status]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'white',
      }}
    >
      {status === 'loading' && (
        <div className='flex h-[500px] items-center justify-center'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default SigninPage;
