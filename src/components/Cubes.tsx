import React from "react";
import { useStore } from "../hooks";
import Cube from "./Cube";

const Cubes = () => {
  const cubes = useStore((state) => state.cubes);
  console.log(cubes);

  return (
    <>
      {cubes.map((cube) => (
        <Cube key={cube.key} position={cube.position} texture={cube.texture} />
      ))}
    </>
  );
};

export default Cubes;
