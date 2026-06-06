const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const STORAGE_URL =
  SUPABASE_URL + "/storage/v1/object/public/sign-images";

export const IS_DEV = import.meta.env.DEV;
// export const IS_DEV = false;

export const VERSION_NUMBER = "v0.1.3";
