import Navbar from '@/components/navbar';
import './globals.css';
import { Grid } from '@mui/material';
import Image from 'next/image';
import BackgroundImg from '@/assets/home-background.png';
import BackgroundImg1 from '@/assets/test.png';
import Providers from '@/components/providers';
import ProtectedRoutes from '@/components/protected-routes';

export const metadata = {
  title: 'Resumer',
  description:
    'Get your resume customized for specific job descriptions'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Grid
            minHeight='100vh'
            maxHeight={{ md: '100vh' }}
            display={'flex'}
            flexDirection={'column'}
            overflow={{ md: 'hidden' }}
          >
            <Navbar />
            <Image
              src={BackgroundImg1}
              alt=''
              className='home-background'
              priority={true}
            />
            <ProtectedRoutes>
              <Grid
                flexGrow={1}
                display={'flex'}
                flexDirection={'column'}
                sx={{
                  overflow: 'auto',
                  mt: '70px'
                }}
              >
                {children}
              </Grid>
            </ProtectedRoutes>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
