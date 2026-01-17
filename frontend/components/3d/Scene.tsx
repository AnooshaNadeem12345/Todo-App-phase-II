"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableOrbitControls?: boolean;
  enableStars?: boolean;
  className?: string;
}

const SceneComponent: React.FC<SceneProps> = ({
  children,
  cameraPosition = [0, 0, 5],
  enableOrbitControls = true,
  enableStars = true,
  className = ''
}) => {
  return (
    <Canvas
      camera={{ position: cameraPosition }}
      className={className}
      shadows
    >
      {enableStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {children}
      
      {enableOrbitControls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />}
    </Canvas>
  );
};

const Scene: React.FC<SceneProps> = (props) => {
  return <SceneComponent {...props} />;
};

export default Scene;