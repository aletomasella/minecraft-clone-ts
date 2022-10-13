import { usePlane } from "@react-three/cannon";
import React from "react";
import { useStore } from "../hooks";
import { groundTexture } from "../utilities";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addCube = useStore((state) => state.addCube);

  return (
    <mesh
      ref={ref as any}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = e.point.toArray().map((coord) => Math.ceil(coord));
        addCube(x, y, z);
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
