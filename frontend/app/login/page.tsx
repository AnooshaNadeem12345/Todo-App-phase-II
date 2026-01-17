'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';
import GlassCard from '@/components/ui/GlassCard';
import Scene from '@/components/3d/Scene';
import ParticlesBackground from '@/components/3d/ParticlesBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signIn(email, password);
      router.push('/dashboard/tasks');
      router.refresh(); // Refresh to update auth state
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="absolute inset-0 z-0">
        <Scene cameraPosition={[0, 0, 10]} enableOrbitControls={false} enableStars={false}>
          <ParticlesBackground count={800} />
        </Scene>
      </div>
      
      <GlassCard className="z-10 w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}