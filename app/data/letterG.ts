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
];
