
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, PerspectiveCamera, RoundedBox, useTexture } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface CardMeshProps {
  isHovered: boolean;
  position: [number, number, number];
  imgUrl: string;
}

const CardMesh = ({ isHovered, position, imgUrl }: CardMeshProps) => {
  const meshRef = useRef<Group>(null!);
  const textRef = useRef<Mesh>(null!);
  
  // Load texture using useTexture hook from drei
  const texture = useTexture(imgUrl);
  
  // Spring animation for hover effect
  const { scale, positionZ } = useSpring({
    scale: isHovered ? 1.05 : 1,
    positionZ: isHovered ? 0.2 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <animated.group
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <animated.mesh position-z={positionZ}>
        <RoundedBox args={[3, 4, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.1}
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Property image as a texture */}
        <mesh position={[0, 0.5, 0.11]}>
          <planeGeometry args={[2.8, 2]} />
          <meshBasicMaterial map={texture} />
        </mesh>
        
        {/* Title text */}
        <Text
          ref={textRef}
          position={[0, -1, 0.15]}
          fontSize={0.2}
          maxWidth={2.5}
          lineHeight={1.2}
          letterSpacing={0.02}
          textAlign="center"
          color="#333333"
        >
          Luxury Property
        </Text>
      </animated.mesh>
    </animated.group>
  );
};

interface Property3DCardProps {
  imgUrl: string;
  className?: string;
}

const Property3DCard = ({ imgUrl, className = "" }: Property3DCardProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`relative h-64 w-full rounded-lg overflow-hidden shadow-xl ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 10, 7.5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <CardMesh isHovered={hovered} position={[0, 0, 0]} imgUrl={imgUrl} />
      </Canvas>
    </div>
  );
};

export default Property3DCard;
