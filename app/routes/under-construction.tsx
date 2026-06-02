import { Form, redirect } from "react-router";
import { apiRequest } from "~/utils/apiRequest";
import { safeJsonStringify } from "~/utils/helpers";
import type { Route } from "./+types/under-construction";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const userKonami = formData.get("konami");

  const { data } = await apiRequest<{ isKonamiValid: boolean }>({
    url: "/api/verify-konami",
    method: "POST",
    data: { userKonami },
  });

  if (data?.isKonamiValid) {
    localStorage.setItem("konami", safeJsonStringify(userKonami));
    return redirect("/");
  }
}

export default function UnderConstruction() {
  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center">
      <div className="text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl">
        <h2 className="text-5xl">Sorry!</h2>
        <p>This site is not ready yet.</p>

        <img
          className="w-60"
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f648/512.gif"
          alt="🙈"
        />

        <Form method="POST">
          <input
            className="input input-ghost"
            type="text"
            name="konami"
            autoComplete="off"
          />
        </Form>
      </div>
    </div>
  );
}
