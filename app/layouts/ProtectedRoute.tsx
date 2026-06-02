import axios from "axios";
import { Outlet, redirect } from "react-router";
import { safeJsonParse } from "~/utils/helpers";
import type { Route } from "./+types/ProtectedRoute";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const konamiString = localStorage.getItem("konami");
  if (!konamiString) return redirect("/under-construction");

  const userKonami = safeJsonParse(konamiString);

  try {
    const response = await axios.post<{ isKonamiValid: boolean }>(
      "/api/verify-konami",
      { userKonami },
    );

    if (!response.data.isKonamiValid) {
      return redirect("/under-construction");
    }
  } catch (error) {
    console.error("Network or server error occurred:", error);
    return redirect("/under-construction");
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
