import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterH: SignProps[] = [
  {
    id: generateId("Hailstone"),
    name: "Hailstone",
    images: getImages("hailstone", "jpg"),
  },
  {
    id: generateId("Hair"),
    name: "Hair",
    images: getImages("hair", "jpg"),
  },
  {
    id: generateId("Hakka"),
    name: "Hakka",
    images: getImages("hakka", "png"),
  },
  {
    id: generateId("Halloween"),
    name: "Halloween",
    images: getImages("halloween", "png"),
  },
  {
    id: generateId("Hand"),
    name: "Hand",
    images: getImages("hand", "jpg"),
  },
  {
    id: generateId("Hang"),
    name: "Hang",
    images: getImages("hang", "png"),
  },
  {
    id: generateId("Happen"),
    name: "Happen",
    images: getImages("happen", "png"),
  },
  {
    id: generateId("Happy"),
    name: "Happy",
    images: getImages("happy", "jpg"),
  },
];
