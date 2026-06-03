import { Outlet, redirect } from "react-router";
import { apiRequest } from "~/utils/apiRequest";
import { STORAGE_URL } from "~/utils/constants";
import { safeJsonParse, safeJsonStringify } from "~/utils/helpers";
import type { Route } from "./+types/ProtectedRoute";

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

  // Checks for Konami code
  if (!authResult.data?.isKonamiValid || authResult.error) {
    return redirect("/under-construction");
  }

  // Checks for rate limit in Supabase
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
