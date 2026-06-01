import { Form, redirect } from "react-router";
import type { Route } from "./+types/under-construction";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userKonami = formData.get("konami");

  if (userKonami === process.env.KONAMI) {
    return { isSuccess: true, userKonami };
  }
  return { isSuccess: false, userKonami };
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  const { isSuccess, userKonami } = await serverAction();

  if (isSuccess) {
    localStorage.setItem("konami", JSON.stringify(userKonami));
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
