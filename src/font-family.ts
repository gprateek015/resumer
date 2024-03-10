import { Righteous, Poppins, Space_Grotesk } from 'next/font/google';

export const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

export const poppins = Poppins({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: 'normal'
});

export const space_grotest = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
});
