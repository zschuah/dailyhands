import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import CardTrio from "~/components/CardTrio";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DailyHands" },
    { name: "description", content: "Welcome to DailyHands!" },
  ];
}

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto snap-y scroll-smooth">
      {/* Welcome Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center relative bg-zinc-300 snap-start",
        )}
      >
        <div className="absolute top-5 right-10">
          <Link to="/bank" className="btn btn-primary">
            Bank
          </Link>
        </div>

        <div
          className={twMerge(
            "text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl animate-[fadeIn_0.5s_ease-in]",
          )}
        >
          <h2 className="text-5xl">Daily Hands</h2>
          <p>Welcome! Welcome!</p>
          <img
            className="w-60"
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
            alt="👋"
          />
        </div>

        <div className="absolute bottom-4 flex flex-col items-center animate-bounce">
          <p>Scroll down for more!</p>
          <span className="text-5xl">&#8609;</span>
        </div>
      </section>

      {/* Game Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center bg-linear-to-b from-zinc-300 to-orange-300 snap-start",
        )}
      >
        <CardTrio />
      </section>
    </div>
  );
}
