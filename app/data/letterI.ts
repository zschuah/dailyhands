import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterI: SignProps[] = [
  {
    id: generateId("Ice"),
    name: "Ice",
    images: getImages("ice", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Ice",
  },
  {
    id: generateId("Ice cream"),
    name: "Ice cream",
    images: getImages("ice_cream", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Ice%20cream",
  },
  {
    id: generateId("Idea"),
    name: "Idea",
    images: getImages("idea", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Idea",
  },
  {
    id: generateId("If"),
    name: "If",
    images: getImages("if", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=If",
  },
];
