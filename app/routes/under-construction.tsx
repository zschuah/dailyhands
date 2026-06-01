import axios from "axios";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/under-construction";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const userKonami = formData.get("konami");

  try {
    const response = await axios.post<{ isKonamiValid: boolean }>(
      "/api/verify-konami",
      { userKonami },
    );

    if (response.data.isKonamiValid) {
      localStorage.setItem("konami", JSON.stringify(userKonami));
      return redirect("/");
    }
  } catch (error) {
    console.error("Network or server error occurred:", error);
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
