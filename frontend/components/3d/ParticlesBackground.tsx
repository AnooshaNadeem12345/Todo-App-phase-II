import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const ParticlesBackground: React.FC<{ count?: number }> = ({ count = 1000 }) => {
  const ref = useRef<any>();

  // Generate random positions for particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20; // x
      pos[i + 1] = (Math.random() - 0.5) * 20; // y
      pos[i + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  // Animate particles
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fa6a6a"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default ParticlesBackground;