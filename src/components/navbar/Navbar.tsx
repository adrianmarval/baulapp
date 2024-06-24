import {AppBar, Toolbar, Typography} from '@mui/material';
import {ProfileAvatar} from '../sidebar/ProfileAvatar';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';

interface Props {
  DRAWER_WIDTH: number;
}

export const Navbar = async ({DRAWER_WIDTH}: Props) => {
  const session = await getServerSession(authOptions);

  const username = session?.user?.name ?? 'No Username';

  return (
    <AppBar position='fixed' sx={{width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px`}}>
      <Toolbar className='justify-between'>
        <Typography variant='h6' noWrap component='div'></Typography>
        <ProfileAvatar username={username} />
      </Toolbar>
    </AppBar>
  );
};
