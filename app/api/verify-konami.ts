import type { Route } from "./+types/verify-konami";

export async function action({ request }: Route.ActionArgs) {
  try {
    const { userKonami } = await request.json();
    const isKonamiValid = userKonami === process.env.KONAMI;

    return { isKonamiValid };
  } catch {
    return { isKonamiValid: false };
  }
}
