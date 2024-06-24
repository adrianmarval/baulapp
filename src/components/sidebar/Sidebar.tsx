import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  ListItem,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import {Search, Dashboard} from '@mui/icons-material';
import Image from 'next/image';
import {LogoutButton} from './LogoutButton';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import {getServerSession} from 'next-auth';
import Link from 'next/link';
import {capitalizeFullName} from '@/libs/utils';

interface Props {
  DRAWER_WIDTH: number;
}

const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'Samplicio',
    path: '/dashboard/samplicio',
    icon: <Search />,
  },
  {
    title: 'Spectrum',
    path: '/dashboard/spectrum',
    icon: <Search />,
  },
  {
    title: 'Samplecube',
    path: '/dashboard/samplecube',
    icon: <Search />,
  },
  {
    title: 'Internos',
    path: '/dashboard/internos',
    icon: <Search />,
  },
];

export const Sidebar = async ({DRAWER_WIDTH}: Props) => {
  const session = await getServerSession(authOptions);

  const username = session?.user?.name ? capitalizeFullName(session.user.name) : 'No Name';
  const profilePicture = session?.user?.image ?? '/profile.webp';

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar>
        <Typography variant='h5'>Baul Privado</Typography>
      </Toolbar>
      <Divider />
      <Box className='mt-5 flex flex-col justify-center items-center h-52'>
        <Avatar className='text-8xl font-extrabold mb-4' sx={{width: 120, height: 120}}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography className='block text-lg font-semibold text-gray-600'>{username}</Typography>
        <Typography className='block text-gray-400'>User</Typography>
      </Box>
      <List className='mt-5'>
        {sidebarItems.map((item) => (
          <Link key={item.title} href={item.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Toolbar sx={{mt: 'auto', mx: 'auto'}}>
        <LogoutButton />
      </Toolbar>
    </Drawer>
  );
};
