"use client";
import Header from './components/Header';
import './styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Prime Flix NextApp',
  description: 'Practice NextJs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
      >
        <ToastContainer autoClose={3000} />
        <Header />
        {children}
      </body>
    </html>
  )
}
