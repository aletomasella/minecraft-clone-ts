import create from "zustand";
import { Cube } from "../models";
import { nanoid } from "nanoid";

interface Store {
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  texture: string;
  setTexture: (texture: string) => void;
  removeCube: (key: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}

export const useStore = create<Store>((set) => ({
  texture: "dirt",
  cubes: [{ position: [10, 5, 10], texture: "dirt", key: nanoid() }],
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
  removeCube: () => {},
  saveWorld: () => {},
  resetWorld: () => {},
}));
