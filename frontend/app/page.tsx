import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Scene from '../components/3d/Scene';
import './globals.css';

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>App is running 🚀</h1>
    </main>
  );
}
