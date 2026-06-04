import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterG: SignProps[] = [
  {
    id: generateId("Gamble"),
    name: "Gamble",
    images: getImages("gamble", "png"),
  },
  {
    id: generateId("Game"),
    name: "Game",
    images: getImages("game", "png"),
  },
  {
    id: generateId("Generation"),
    name: "Generation",
    images: getImages("generation", "png"),
  },
  {
    id: generateId("Germany (Place)"),
    name: "Germany (Place)",
    images: getImages("germany", "jpg"),
    tags: ["place"],
  },
  {
    id: generateId("Ghost"),
    name: "Ghost",
    images: getImages("ghost", "png"),
  },
  {
    id: generateId("Giddy"),
    name: "Giddy",
    images: getImages("giddy", "png"),
  },
  {
    id: generateId("Girl"),
    name: "Girl",
    images: getImages("girl", "jpg"),
  },
  {
    id: generateId("Girlfriend"),
    name: "Girlfriend",
    images: getImages("girlfriend", "png"),
  },
];
