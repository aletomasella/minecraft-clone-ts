import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { setSunPosition } from "./utilities";
import { Physics } from "@react-three/cannon";
import { Ground, Player } from "./components";

const App = () => {
  const sunPosition = setSunPosition(120, 120, 40);
  return (
    <>
      <Canvas>
        <Sky sunPosition={sunPosition} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Ground />
          <Player />
        </Physics>
      </Canvas>
    </>
  );
};

export default App;
