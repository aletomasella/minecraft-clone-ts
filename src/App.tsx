import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { setSunPosition } from "./utilities";
import { Physics } from "@react-three/cannon";
import { Cubes, FPV, Ground, Player } from "./components";

const App = () => {
  const sunPosition = setSunPosition(120, 120, 40);
  const cursorStyle = "absolute centered cursor";
  return (
    <>
      <Canvas>
        <Sky sunPosition={sunPosition} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Ground />
          <Player />
          <Cubes />
        </Physics>
      </Canvas>
      <div className={cursorStyle}>+</div>
    </>
  );
};

export default App;
