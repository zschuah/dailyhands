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
      url: `${STORAGE_URL}/a_small.jpg`,
      method: "HEAD",
    }),
  ]);

  if (!authResult.data?.isKonamiValid || authResult.error) {
    return redirect("/under-construction");
  }

  if (canaryResult.error) {
    const errorMessage = safeJsonStringify(canaryResult.error);
    localStorage.setItem("last_error_debug", errorMessage);
    return redirect("/error");
  } else {
    localStorage.removeItem("last_error_debug");
  }

  return null;
}

// Renders on initial page refresh while the client loader makes the Axios call
// export function HydrateFallback() {
//   return (
//     <div className="bg-zinc-300 min-h-screen flex items-center justify-center">
//       <p className="text-xl font-medium text-zinc-600 animate-pulse">
//         Securing connection environment...
//       </p>
//     </div>
//   );
// }

export default function ProtectedRoute() {
  return <Outlet />;
}
