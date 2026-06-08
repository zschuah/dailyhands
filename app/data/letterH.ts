import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterH: SignProps[] = [
  {
    id: generateId("Hailstone"),
    name: "Hailstone",
    images: getImages("hailstone", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Hailstone",
  },
  {
    id: generateId("Hair"),
    name: "Hair",
    images: getImages("hair", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Hair",
  },
  {
    id: generateId("Hakka"),
    name: "Hakka",
    images: getImages("hakka", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Hakka",
  },
  {
    id: generateId("Halloween"),
    name: "Halloween",
    images: getImages("halloween", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Halloween",
  },
  {
    id: generateId("Hand"),
    name: "Hand",
    images: getImages("hand", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Hand",
  },
  {
    id: generateId("Hang"),
    name: "Hang",
    images: getImages("hang", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Hang",
  },
  {
    id: generateId("Happen"),
    name: "Happen",
    images: getImages("happen", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Happen",
  },
  {
    id: generateId("Happy"),
    name: "Happy",
    images: getImages("happy", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Happy",
  },
];
