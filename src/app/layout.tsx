import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'Sedthasard App',
  description: 'ແອັບຕິດຕາມການເງິນສຳລັບນັກສຶກສາ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Phetsarath+OT&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
            {children}
            <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
