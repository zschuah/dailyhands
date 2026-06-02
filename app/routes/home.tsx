import { twMerge } from "tailwind-merge";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DailyHands" },
    { name: "description", content: "Welcome to DailyHands!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {}

export default function Home() {
  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center">
      <div
        className={twMerge(
          "text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl",
          "animate-[fadeIn_0.5s_ease-in]",
        )}
      >
        <h2 className="text-5xl">Hello there</h2>
        <p>Welcome! Welcome!</p>

        <img
          className="w-60"
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
          alt="👋"
        />

        <input className="input input-ghost pointer-events-none" type="text" />
      </div>
    </div>
  );
}
