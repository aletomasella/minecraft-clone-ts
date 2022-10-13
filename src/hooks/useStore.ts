import create from "zustand";
import { Cube } from "../models";
import { nanoid } from "nanoid";

const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};
const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const cleanLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

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
  cubes: getLocalStorage("cubes") || [],
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
  setTexture: (texture) => {
    set((state) => ({
      texture,
    }));
  },
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
  saveWorld: () => {
    set((state) => {
      setLocalStorage("cubes", state.cubes);
      return state;
    });
  },
  resetWorld: () => {
    set((state) => ({
      cubes: [],
    }));
    cleanLocalStorage("cubes");
  },
}));
