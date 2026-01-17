import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text, Center } from '@react-three/drei';
import { Task } from '@/types/task';
import { useSpring, animated } from '@react-spring/three';
import { useEffect } from 'react';

interface TaskCard3DProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TaskCard3D: React.FC<TaskCard3DProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [hovered, setHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Handle the 3D flip animation for completion
  const handleClick = () => {
    if (task.completed) {
      // If already completed, allow editing
      onEdit();
    } else {
      // If not completed, trigger completion with animation
      setIsFlipping(true);
      setTimeout(() => {
        onToggleComplete();
        setIsFlipping(false);
      }, 500); // Duration of flip animation
    }
  };

  // Animation values for the 3D card
  const { rotationY, scale } = useSpring({
    rotationY: hovered ? Math.PI / 8 : 0,
    scale: hovered ? [1.05, 1.05, 1.05] : [1, 1, 1],
    config: { mass: 1, tension: 300, friction: 10 }
  });

  const { rotationX, rotationY: flipRotationY } = useSpring({
    rotationX: isFlipping ? Math.PI : 0,
    rotationY: isFlipping ? Math.PI : 0,
    config: { mass: 1, tension: 300, friction: 20 }
  });

  return (
    <div className="h-64 cursor-pointer" onClick={handleClick}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <animated.group
          rotation-y={rotationY}
          scale={scale}
        >
          <Center>
            <animated.mesh
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
              rotation-x={rotationX}
              rotation-y={flipRotationY}
            >
              <Box args={[2, 1.5, 0.2]} castShadow receiveShadow>
                <meshStandardMaterial
                  color={task.completed ? "#4ade80" : "#60a5fa"}
                  transparent
                  opacity={0.8}
                  roughness={0.2}
                  metalness={0.7}
                />
              </Box>

              {/* Task title as 3D text */}
              <Text
                position={[0, 0.3, 0.11]}
                fontSize={0.3}
                maxWidth={3}
                textAlign="center"
                color="white"
              >
                {task.title}
              </Text>

              {/* Completion indicator */}
              <Text
                position={[0, -0.3, 0.11]}
                fontSize={0.4}
                color="white"
              >
                {task.completed ? "✓" : "○"}
              </Text>
            </animated.mesh>
          </Center>
        </animated.group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enabled={hovered}
        />
      </Canvas>

      {/* 2D overlay for actions */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard3D;