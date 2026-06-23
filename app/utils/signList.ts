import * as letters from "~/data";

/**
 * `import * as letters` creates an object of key-value pairs
 * (e.g., `letterA: [...]`, `letterB: [...]`)
 *
 * This line combines all the arrays from that object into an array of signs.
 */
export const RAW_LIST = Object.values(letters).flat();

const PROBLEM_IDS = new Set([
  "LASSK", // Last
]);

const EXCLUDED_IDS = new Set([
  "ABLYM", // Able
  "ACTBL", // Actress
  "BUSSC", // Business
  "CLOSQ", // Cloudy
  "CONBQ", // Condominium
  "COUXY", // Cough Mixture
  "CYCXS", // Cycle (Verb)
  "DEAGY", // Death
  "ENDZF", // Endurance
  "EXPTD", // Explosion
  "FASQU", // Fast (Verb)
  "FEEXA", // Feet
  "FOOON", // Foot (Unit)
  "FREQS", // Freezing (Adj)
  "FRORO", // Frozen
  "IMMWK", // Immediately (Adv)
  "INVHX", // Investment
  "INTGC", // IWDP
  "INTLW", // IWD
  "LAUHK", // Laughter
]);

export const SIGN_LIST = RAW_LIST.filter((sign) => !PROBLEM_IDS.has(sign.id));

export const HARD_MODE_LIST = SIGN_LIST.filter(
  (sign) => !EXCLUDED_IDS.has(sign.id),
);

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
