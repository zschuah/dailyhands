import { generateId, getImages } from "~/utils/helpers";
import type { SignProps } from "~/utils/types";

export const letterL: SignProps[] = [
  {
    id: generateId("Labour Day"),
    name: "Labour Day",
    images: getImages("labour_day", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Labour%20Day",
  },
  {
    id: generateId("Lakeside (Place)"),
    name: "Lakeside (Place)",
    images: getImages("lakeside", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Lakeside%20(Place)",
    tags: ["place"],
  },
  {
    id: generateId("Lamb (Animal)"),
    name: "Lamb (Animal)",
    images: getImages("lamb", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Lamb",
    tags: ["animal"],
  },
  {
    id: generateId("Lamp"),
    name: "Lamp",
    images: getImages("lamp", "png"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Lamp",
  },
  {
    id: generateId("Landslide"),
    name: "Landslide",
    images: getImages("landslide", "jpg"),
    link: "https://blogs.ntu.edu.sg/sgslsignbank/word/?frm-word=Landslide",
  },
];
