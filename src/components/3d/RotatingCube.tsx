
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { Mesh } from 'three';

interface RotatingCubeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  speed?: number;
  wobble?: boolean;
}

const RotatingCube = ({ 
  position, 
  size = 1, 
  color = "#D4AF37", 
  speed = 1,
  wobble = false 
}: RotatingCubeProps) => {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      {wobble ? (
        <MeshWobbleMaterial 
          color={color} 
          factor={0.3} 
          speed={2} 
          metalness={0.8}
          roughness={0.2}
        />
      ) : (
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
        />
      )}
    </mesh>
  );
};

export default RotatingCube;
