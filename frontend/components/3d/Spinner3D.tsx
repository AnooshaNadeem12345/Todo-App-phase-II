import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';

interface Spinner3DProps {
  size?: number;
  color?: string;
  speed?: number;
}

const AnimatedSphere: React.FC<Spinner3DProps> = ({ size = 1, color = '#6366f1', speed = 1 }) => {
  const meshRef = React.useRef<any>();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <motion.mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
      />
    </motion.mesh>
  );
};

const Spinner3D: React.FC<Spinner3DProps> = ({ size = 1, color = '#6366f1', speed = 1 }) => {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <AnimatedSphere size={size} color={color} speed={speed} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={speed} />
      </Canvas>
    </div>
  );
};

export default Spinner3D;