import { Form, redirect } from "react-router";
import type { Route } from "./+types/under-construction";

export async function action({ request }: Route.ActionArgs) {
  if (request.method.toUpperCase() === "POST") {
    const formData = await request.formData();
    const userKonami = formData.get("konami");

    if (userKonami === process.env.KONAMI) {
      return redirect("/");
    }
  }
}

export default function UnderConstruction() {
  return (
    <div className="bg-zinc-300 min-h-screen">
      <h2 className="text-5xl">UnderConstruction</h2>

      <Form method="POST">
        <input className="input" type="text" name="konami" />
        <button className="btn" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
