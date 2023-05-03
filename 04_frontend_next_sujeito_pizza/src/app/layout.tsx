import '../styles/globals.scss';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Sujeito Pizza',
  description: 'Sujeito Pizza Admin Web App WeltonMatosDev',
  icons: {
    icon: 'logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
