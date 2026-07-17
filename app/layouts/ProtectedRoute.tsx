import { Outlet, redirect } from "react-router";
import { apiRequest } from "~/utils/apiRequest";
import { STORAGE_URL, SUPABASE_URL } from "~/utils/constants";
import { safeJsonParse, safeJsonStringify } from "~/utils/helpers";
import type { Route } from "./+types/ProtectedRoute";
import { RAW_LIST } from "~/utils/signList";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const konamiString = localStorage.getItem("konami");
  if (!konamiString) return redirect("/under-construction");

  const userKonami = safeJsonParse(konamiString);

  const [authResult, canaryResult] = await Promise.all([
    apiRequest<{ isKonamiValid: boolean }>({
      url: "/api/verify-konami",
      method: "POST",
      data: { userKonami },
    }),
    apiRequest({
      url: `${STORAGE_URL}/aa_small.jpg`,
      method: "HEAD",
    }),
  ]);

  // ===== Keep SUPABASE free tier alive (7 days) =====
  const SUPABASE_IMG_NAME = RAW_LIST[
    Math.floor(Math.random() * 500)
  ].images.imageStatic
    .split("/")
    .pop();

  apiRequest({
    url: `${SUPABASE_URL}/storage/v1/object/public/sign-images/${SUPABASE_IMG_NAME}`,
    method: "GET",
  }).catch((err) => console.error(err));
  // ===== Keep SUPABASE free tier alive (7 days) =====

  // Checks for Konami code
  if (!authResult.data?.isKonamiValid || authResult.error) {
    return redirect("/under-construction");
  }

  // Checks for bandwidth limit in ImageKit (20 GB)
  if (canaryResult.error) {
    const errorMessage = safeJsonStringify(canaryResult.error);
    localStorage.setItem("last_error_debug", errorMessage);
    return redirect("/error");
  } else {
    localStorage.removeItem("last_error_debug");
  }

  return null;
}

export default function ProtectedRoute() {
  return <Outlet />;
}
