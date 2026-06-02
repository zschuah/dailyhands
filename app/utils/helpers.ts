import { hash } from "hash-it";
import { STORAGE_URL } from "./constants";
import type { SignProps } from "./types";

/**
 * Gives a hashed sequence of alpha characters based on rootWord.
 * alphaLength is the number of characters to be generated.
 */
const getAlphaFromHash = (rootWord: string, alphaLength: number) => {
  const hashString = hash(rootWord).toString();
  const segmentLength = hashString.length / alphaLength;

  const alphaResult = [...Array(alphaLength)]
    .map((_, i) => {
      const startIndex = i * segmentLength;
      const endIndex = startIndex + segmentLength;
      const segment = hashString.substring(startIndex, endIndex);
      const segmentValue = parseInt(segment);

      // Keep the result within the range 0-25 for the letters 'a' to 'z'
      const charCode = 97 + (segmentValue % 26);

      // console.log({ segmentValue, charCode });
      return String.fromCharCode(charCode);
    })
    .join("");

  return alphaResult;
};

export const generateId = (rootWord?: string) => {
  if (!rootWord) return "";
  const ID_LENGTH = 5;

  const firstBlock = rootWord?.substring(0, 3).trim();
  const secondBlock = getAlphaFromHash(rootWord, ID_LENGTH - firstBlock.length);

  return [firstBlock, secondBlock].join("").toUpperCase();
};

export const getImages = (
  name: string,
  format: "jpg" | "png",
): SignProps["images"] => {
  return {
    imageAnimated: `${STORAGE_URL}/${name}.gif`,
    imageStatic: `${STORAGE_URL}/${name}_1.${format}`,
  };
};

export function safeJsonParse(value: string): string {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function safeJsonStringify(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}
