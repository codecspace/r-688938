
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import RotatingCube from './RotatingCube';

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <RotatingCube position={[-2, -1, 0]} size={1.2} color="#D4AF37" wobble={true} />
          <RotatingCube position={[2, 1, -2]} size={0.8} color="#fff8e1" speed={0.5} />
          <RotatingCube position={[0, 0, 1]} size={1.5} color="#FFCB74" wobble={true} />
          <RotatingCube position={[3, -1, -1]} size={0.6} color="#D4AF37" speed={2} />
          <RotatingCube position={[-3, 1, -3]} size={1} color="#FFECB3" wobble={true} />
        </Float>
        <ContactShadows 
          position={[0, -3, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={3}
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
