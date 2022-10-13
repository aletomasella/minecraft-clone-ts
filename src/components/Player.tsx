import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks";

const JUMP_VELOCITY = 5;

const Player = () => {
  const { camera } = useThree();
  const { jump, foward, backward, left, rigth } = useKeyboard();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const pos = useRef([0, 0, 0]);
  const vel = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  useEffect(() => {
    api.position.subscribe((position) => (pos.current = position));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(new Vector3(...pos.current));

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2]);
    }

    if (foward) {
      api.velocity.set(vel.current[0], vel.current[1], vel.current[2] + 0.5);
    }

    if (backward) {
      api.velocity.set(vel.current[0], vel.current[1], vel.current[2] - 0.5);
    }

    if (left) {
      api.velocity.set(vel.current[0] - 0.5, vel.current[1], vel.current[2]);
    }

    if (rigth) {
      api.velocity.set(vel.current[0] + 0.5, vel.current[1], vel.current[2]);
    }
  });

  return <mesh ref={ref as any}></mesh>;
};

export default Player;
