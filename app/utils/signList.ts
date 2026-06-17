import * as letters from "~/data";

/**
 * `import * as letters` creates an object of key-value pairs
 * (e.g., `letterA: [...]`, `letterB: [...]`)
 *
 * This line combines all the arrays from that object into an array of signs.
 */
export const SIGN_LIST = Object.values(letters).flat();

export const AVAILABLE_LETTERS = Array.from(
  new Set(
    SIGN_LIST.map((sign) => sign.id[0].toLowerCase()).filter((char) =>
      /^[a-z]$/.test(char),
    ),
  ),
).sort();

export const AVAILABLE_TAGS = Array.from(
  new Set(SIGN_LIST.flatMap((sign) => sign.tags).filter(Boolean)),
).sort();

const EXCLUDED_IDS = new Set(["INTGC", "INTLW"]);

export const HARD_MODE_LIST = SIGN_LIST.filter(
  (sign) => !EXCLUDED_IDS.has(sign.id),
);
