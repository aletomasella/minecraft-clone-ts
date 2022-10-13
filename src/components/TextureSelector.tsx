import React, { useEffect, useState } from "react";
import { useKeyboard, useStore } from "../hooks";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../assets";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, wood, glass, log, grass } = useKeyboard();

  const selectorStyle = "absolute centered texture-selector";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t") setVisible(!visible);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  useEffect(() => {
    if (dirt) setTexture("dirt");
    if (wood) setTexture("wood");
    if (glass) setTexture("glass");
    if (log) setTexture("log");
    if (grass) setTexture("grass");
  }, [activeTexture, setTexture, dirt, wood, glass, log, grass]);

  return (
    <>
      {visible && (
        <div className={selectorStyle}>
          {Object.entries(images).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                className={`${key === activeTexture ? "active" : ""}`}
                src={value}
                alt={key}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TextureSelector;
