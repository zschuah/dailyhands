import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return redirect("/under-construction");
}

export default function Home() {
  return (
    <div>
      <h2 className="text-5xl">Home</h2>
    </div>
  );
}
