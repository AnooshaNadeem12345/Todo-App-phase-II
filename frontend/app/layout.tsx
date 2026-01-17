import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Scene from '../components/3d/Scene';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3D Todo App',
  description: 'Professional 3D Todo application with immersive interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative w-full h-screen overflow-hidden">
            {/* 3D Background */}
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
              <Scene cameraPosition={[0, 0, 10]} enableOrbitControls={false} enableStars={false} children={''}>
              </Scene>
            </div>
            {/* Main Content */}
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
            
            {/* Toast Notifications */}
            <Toaster 
              position="top-right"
              theme="system"
              richColors
              closeButton
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}