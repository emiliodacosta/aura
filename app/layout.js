// import { Inter } from "next/font/google";
import './globals.css';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'aura - Internal',
  description: 'Aura Patients Directory',
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className='bg-lightGray text-white'>{children}</body>
    </html>
  );
}
