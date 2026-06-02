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
    <div className="bg-zinc-300 min-h-screen">
      <h2 className="text-5xl">UnderConstruction</h2>

      <Form method="POST">
        <input className="input" type="text" name="konami" />
        <button className="btn">Submit</button>
      </Form>
    </div>
  );
}
