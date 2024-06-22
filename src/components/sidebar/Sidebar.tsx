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
} from '@mui/material';
import {Search, Dashboard} from '@mui/icons-material';
import Image from 'next/image';
import {LogoutButton} from './LogoutButton';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import {getServerSession} from 'next-auth';
import Link from 'next/link';

interface Props {
  DRAWER_WIDTH: number;
}

const capitalizeFullName = (fullName: string): string => {
  return fullName
    .split(' ') // Dividir el nombre completo en palabras separadas por espacios
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalizar cada palabra
    .join(' '); // Unir las palabras de nuevo en un solo string separado por espacios
};

const sidebarItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'Buscar Jump',
    path: '/dashboard/identifier',
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
      <Toolbar children={<Typography variant='h5'>Baul Privado</Typography>} />
      <Divider />
      <Box className='mt-5 flex flex-col justify-center items-center h-52'>
        <Image
          src={profilePicture}
          alt=''
          width={150}
          height={150}
          priority
          className='m-auto h-24 w-24 rounded-full object-cover md:h-36 md:w-36'
        />
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
