import Navbar from '@/components/navbar';
import './globals.css';
import { Grid, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import Image from 'next/image';
import BackgroundImg from '@/assets/home-background.png';
import Prodiver from '@/components/redux-provider';

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
        <Prodiver>
          <ThemeProvider theme={theme}>
            <Grid minHeight='100vh' display={'flex'} flexDirection={'column'}>
              <Navbar />
              <Image src={BackgroundImg} alt='' className='home-background' />
              <Grid flexGrow={1} display={'flex'} flexDirection={'column'}>
                {children}
              </Grid>
            </Grid>
          </ThemeProvider>
        </Prodiver>
      </body>
    </html>
  );
}
