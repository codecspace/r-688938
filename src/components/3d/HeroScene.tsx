
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import RotatingCube from './RotatingCube';
import { ErrorBoundary } from 'react-error-boundary';

// Simple fallback component when 3D rendering fails
const Fallback = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-100 to-white opacity-50"></div>
);

const HeroSceneContent = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
      />
      <RotatingCube position={[-2, -1, 0]} size={1.2} color="#D4AF37" wobble={true} />
      <RotatingCube position={[2, 1, -2]} size={0.8} color="#fff8e1" speed={0.5} />
      <RotatingCube position={[0, 0, 1]} size={1.5} color="#FFCB74" wobble={true} />
      <RotatingCube position={[3, -1, -1]} size={0.6} color="#D4AF37" speed={2} />
      <RotatingCube position={[-3, 1, -3]} size={1} color="#FFECB3" wobble={true} />
      <Environment preset="city" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        makeDefault
      />
    </>
  );
};

const HeroScene = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <div className="absolute inset-0 -z-10">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
          <HeroSceneContent />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};

export default HeroScene;
