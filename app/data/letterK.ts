import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterK: SignProps[] = [
  {
    id: generateId("Kallang (Place)"),
    name: "Kallang (Place)",
    images: getImages("kallang", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Kallang%20(Place)",
    tags: ["place"],
  },
  {
    id: generateId("Kallang River (Place)"),
    name: "Kallang River (Place)",
    images: getImages("kallang_river", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Kallang%20river%20(place)",
    tags: ["place"],
  },
  {
    id: generateId("Kangaroo (Animal)"),
    name: "Kangaroo (Animal)",
    images: getImages("kangaroo", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Kangaroo%20(Animal)",
    tags: ["animal"],
  },
  {
    id: generateId("Karaoke"),
    name: "Karaoke",
    images: getImages("karaoke", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Karaoke",
  },
  {
    id: generateId("Key (Noun)"),
    name: "Key (Noun)",
    images: getImages("key", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Key%20(Noun)",
  },
  {
    id: generateId("Key (Verb)"),
    name: "Key (Verb)",
    images: getImages("key", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Key%20(Verb)",
  },
];
