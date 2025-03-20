
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { PerspectiveCamera, RoundedBox } from '@react-three/drei';
import { Mesh, Group, TextureLoader } from 'three';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback component when texture loading fails
const FallbackCard = () => (
  <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-xl bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
    <div className="text-gray-500">Property Image</div>
  </div>
);

interface CardMeshProps {
  isHovered: boolean;
  position: [number, number, number];
  imgUrl: string;
}

const CardMesh = ({ isHovered, position, imgUrl }: CardMeshProps) => {
  const meshRef = useRef<Group>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Load texture manually to handle errors
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      imgUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", err);
        setError(true);
      }
    );
    
    // Cleanup
    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, [imgUrl]);
  
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

  // If there was an error loading the texture, render a simple colored card
  if (error) {
    return (
      <animated.group
        ref={meshRef}
        position={position}
        scale={scale}
      >
        <animated.mesh position-z={positionZ}>
          <RoundedBox args={[3, 4, 0.2]} radius={0.1} smoothness={4}>
            <meshStandardMaterial 
              color="#f0f0f0" 
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>
        </animated.mesh>
      </animated.group>
    );
  }

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
        {loaded && texture && (
          <mesh position={[0, 0, 0.11]}>
            <planeGeometry args={[2.8, 3.8]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        )}
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
    <ErrorBoundary FallbackComponent={FallbackCard}>
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
    </ErrorBoundary>
  );
};

export default Property3DCard;
