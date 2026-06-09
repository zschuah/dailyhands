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

export const getUniqueIntegers = ({
  size,
  count = 3,
}: {
  size: number;
  count?: number;
}): number[] => {
  const randomSet = new Set<number>();

  // Guard against lists smaller than the requested count
  const targetSize = Math.min(size, count);
  while (randomSet.size < targetSize) {
    const randomIndex = Math.floor(Math.random() * size);
    randomSet.add(randomIndex);
  }

  return Array.from(randomSet);
};

export function safeJsonParse<T>(value: string): T | string {
  try {
    return JSON.parse(value) as T;
  } catch {
    return value;
  }
}

export function safeJsonStringify(value: unknown): string {
  if (value === undefined) {
    return "";
  }

  try {
    return JSON.stringify(value);
  } catch (error) {
    return "";
  }
}

export const getNormalised = (text: string): string => {
  return (
    text
      // Remove text inside parentheses, e.g., "Floor (Level of building)" -> "Floor "
      .replace(/\s*\([^)]*\)/g, "")
      // Convert hyphens and underscores to spaces so words stay separated
      .replace(/[-_]/g, " ")
      // Remove punctuation (removed - and _ from this list)
      .replace(/['’.,\/#!$%\^&\*;:{}=`~()]/g, "")
      // Collapse multiple spaces into one and trim edges
      .replace(/\s+/g, " ")
      .trim()
      // Convert to lower case
      .toLowerCase()
  );
};
