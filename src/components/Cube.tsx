import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import React from "react";
import { Texture, Vector3 } from "three";
import { useStore } from "../hooks";
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

  const [removeCube, addCube] = useStore((state) => [
    state.removeCube,
    state.addCube,
  ]);

  const activeTexture: [string, Texture] = Object.entries(textures).find(
    ([key]) => key.startsWith(texture)
  ) as [string, Texture];

  const handleCubeCreation = (e: any) => {
    e.stopPropagation();
    const cubeFace = Math.floor((e.faceIndex as number) / 2);
    const { x, y, z } = ref.current?.position as Vector3;
    if (e.altKey) return removeCube(x, y, z);

    if (cubeFace === 0) return addCube(x + 1, y, z);
    if (cubeFace === 1) return addCube(x - 1, y, z);
    if (cubeFace === 2) return addCube(x, y + 1, z);
    if (cubeFace === 3) return addCube(x, y - 1, z);
    if (cubeFace === 4) return addCube(x, y, z + 1);
    if (cubeFace === 5) return addCube(x, y, z - 1);
  };

  return (
    <>
      <mesh ref={ref as any} onClick={handleCubeCreation}>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial attach="material" map={activeTexture[1]} />
      </mesh>
    </>
  );
};

export default Cube;
