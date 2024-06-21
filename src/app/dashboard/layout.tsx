import {ThemeProvider, CssBaseline, Box} from '@mui/material';
import theme from '@/theme/theme';
import {Navbar} from '@/components/navbar';
import {Sidebar} from '@/components/sidebar';

interface Props {
  children: React.ReactNode;
}
const DRAWER_WIDTH = 240; // Ancho del sidebar en píxeles

const Layout = ({children}: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{display: 'flex'}}>
        <Navbar DRAWER_WIDTH={DRAWER_WIDTH} />
        <Sidebar DRAWER_WIDTH={DRAWER_WIDTH} />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '90vh',
            marginTop: 12,
            ml: 4,
            mr: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
