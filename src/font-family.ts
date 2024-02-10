import { Righteous, Poppins } from 'next/font/google';

export const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

export const poppins = Poppins({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: 'normal'
});
