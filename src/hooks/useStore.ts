import create from "zustand";
import { Cube } from "../models";
import { nanoid } from "nanoid";

interface Store {
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  texture: string;
  setTexture: (texture: string) => void;
  removeCube: (x: number, y: number, z: number) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}

export const useStore = create<Store>((set) => ({
  texture: "dirt",
  cubes: [],
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          position: [x, y, z],
          texture: state.texture,
          key: nanoid(),
        },
      ],
    }));
  },
  setTexture: () => {},
  removeCube: (x, y, z) => {
    console.log("remove cube", x, y, z);
    set((state) => ({
      cubes: state.cubes.filter(
        (cube) =>
          cube.position[0] !== x ||
          cube.position[1] !== y ||
          cube.position[2] !== z
      ),
    }));
  },
  saveWorld: () => {},
  resetWorld: () => {},
}));
