import Navbar from '@/components/navbar';
import './globals.css';
import { Grid, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import Image from 'next/image';
import BackgroundImg from '@/assets/home-background.png';
import ReduxProvider from '@/components/redux-provider';
import AuthProvider from '@/components/auth-provider';
import ProtectedRoutes from '@/components/protected-routes';

export const metadata = {
  title: 'Resumer',
  description:
    'Get you resume specially talored for you and specific Job description'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <ProtectedRoutes>
                <Grid
                  minHeight='100vh'
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <Navbar />
                  <Image
                    src={BackgroundImg}
                    alt=''
                    className='home-background'
                  />
                  <Grid
                    flexGrow={1}
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                      overflow: 'auto'
                    }}
                  >
                    {children}
                  </Grid>
                </Grid>
              </ProtectedRoutes>
            </AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
