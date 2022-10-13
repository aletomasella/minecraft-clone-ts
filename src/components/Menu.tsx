import React from "react";
import { useStore } from "../hooks";

const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  return (
    <>
      <div className="menu absolute">
        <button onClick={saveWorld} className="buttons">
          Guardar
        </button>
        <button onClick={resetWorld} className="buttons">
          Reset
        </button>
      </div>
    </>
  );
};

export default Menu;
