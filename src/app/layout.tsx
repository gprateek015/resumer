import Navbar from '@/components/navbar';
import './globals.css';
import { Grid } from '@mui/material';
import Image from 'next/image';
import BackgroundImg from '@/assets/home-background.png';
import BackgroundImg1 from '@/assets/test.png';
import Providers from '@/components/providers';
import ProtectedRoutes from '@/components/protected-routes';
import ReviewBox from '@/components/review-box';
import RootContainer from '@/components/root-container';
import Socials from '@/components/socials';

export const metadata = {
  title: 'Resumer',
  description: 'Get your resume customized for specific job descriptions'
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
          <RootContainer>
            <Navbar />
            {/* <Image
              src={BackgroundImg1}
              alt=''
              className='home-background'
              priority={true}
            /> */}
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
            <ReviewBox />
            <Socials />
          </RootContainer>
        </Providers>
      </body>
    </html>
  );
}
