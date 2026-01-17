'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Scene from '@/components/3d/Scene';
import ParticlesBackground from '@/components/3d/ParticlesBackground';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* 3D Background for Dashboard */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Scene cameraPosition={[0, 0, 10]} enableOrbitControls={false} enableStars={false}>
          <ParticlesBackground count={300} />
        </Scene>
      </div>
      
      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/10 backdrop-blur-lg border-b border-white/10 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">3D Todo Dashboard</h1>
            <div className="flex space-x-4">
              <a href="/dashboard/tasks" className="hover:text-blue-400 transition-colors">Tasks</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Profile</a>
              <a href="/login" className="hover:text-blue-400 transition-colors">Logout</a>
            </div>
          </div>
        </nav>
        
        {/* Children Content */}
        <div className="container mx-auto py-8">
          {children}
        </div>
      </div>
    </div>
  );
}