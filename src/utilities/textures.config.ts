import { TextureLoader } from "three";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../assets";

const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const groundTexture = new TextureLoader().load(grassImg);

export {
  dirtTexture,
  grassTexture,
  glassTexture,
  logTexture,
  woodTexture,
  groundTexture,
};
