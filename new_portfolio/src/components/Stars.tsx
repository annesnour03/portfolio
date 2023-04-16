import { useState, useRef, Suspense, Ref } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { Points as t_Points } from "three";
const random = require("maath/random/dist/maath-random.esm");

type StarsCanvasProps = {
  color?: string;
  size?: number;
};

const Stars = ({ color = "#FFF", size = 0.003 }: StarsCanvasProps) => {
  const ref = useRef<t_Points>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((_, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = ({
  color = "#FFF",
  size = 0.003,
}: StarsCanvasProps) => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars color={color} size={size} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};
