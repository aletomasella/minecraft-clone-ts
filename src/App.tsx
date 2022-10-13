import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { setSunPosition } from "./utilities";

const App = () => {
  const sunPosition = setSunPosition(100, 100, 20);
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
      </Canvas>
    </>
  );
};

export default App;
