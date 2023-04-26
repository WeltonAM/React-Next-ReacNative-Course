import Header from './components/Header';
import './styles/globals.css';

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
        <Header />
        {children}
      </body>
    </html>
  )
}
