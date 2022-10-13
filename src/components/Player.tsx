import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks";

const JUMP_VELOCITY = 4;
const SPEED = 4;

const Player = () => {
  const { camera } = useThree();
  const { jump, foward, backward, left, right } = useKeyboard();
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

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (foward ? -1 : 0) + (backward ? 1 : 0)
    );

    const sideVector = new Vector3((right ? -1 : 0) + (left ? 1 : 0), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_VELOCITY, vel.current[2]);
    }
  });

  return <mesh ref={ref as any}></mesh>;
};

export default Player;
