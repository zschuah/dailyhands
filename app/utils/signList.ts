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
  "ABLYM", // Able - Can
  "ACTBL", // Actress - Actor
  "BUSSC", // Business - Busy
  "CLOSQ", // Cloudy - Cloud
  "CONBQ", // Condominium - Condo
  "COUXY", // Cough Mixture - Cough Syrup
  "CYCXS", // Cycle (Verb) - Bicycle
  "DEAGY", // Death - Die
  "ENDZF", // Endurance - Endure
  "EXPTD", // Explosion - Explode
  "FASQU", // Fast (Verb) - Fasting
  "FEEXA", // Feet - Foot
  "FREQS", // Freezing (Adj) - Freeze
  "FRORO", // Frozen - Freeze
  "IMMWK", // Immediately (Adv) - Immediate
  "INVHX", // Investment - Invest
  "INTGC", // IWDP
  "INTLW", // IWD
  "LAUHK", // Laughter - Laugh
  "LIGNT", // Light (Colour) - Clear (Adj)
  "LONOZ", // Long ago - Ancient
  "LONCI", // Long time ago - Ancient
  "LOSKW", // Loss (Noun) - Lose (Verb)
  "LOSQW", // Lost - Lose (Verb)
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
