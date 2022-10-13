import { useBox } from "@react-three/cannon";
import React from "react";
import { Texture } from "three";
import * as textures from "../utilities/textures.config";

interface CubeProps {
  position: [number, number, number];
  texture: string;
}

const Cube = ({ position, texture }: CubeProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture: [string, Texture] = Object.entries(textures).find(
    ([key]) => key.startsWith(texture)
  ) as [string, Texture];

  return (
    <>
      <mesh ref={ref as any}>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial attach="material" map={activeTexture[1]} />
      </mesh>
    </>
  );
};

export default Cube;
