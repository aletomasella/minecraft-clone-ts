import { useCallback, useEffect, useState } from "react";
import { Actions } from "../models";

const actionByKey = (key: string): string | undefined => {
  const actions: Actions = {
    KeyW: "foward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  return actions[key as keyof Actions];
};

export const useKeyboard = () => {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({
    foward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setKeysPressed((prev) => ({ ...prev, [action]: true }));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setKeysPressed((prev) => ({ ...prev, [action]: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keysPressed;
};
