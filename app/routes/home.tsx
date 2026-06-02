import { twMerge } from "tailwind-merge";
import type { Route } from "./+types/home";
import CardTrio from "~/components/CardTrio";
import { SIGN_LIST } from "~/utils/signList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DailyHands" },
    { name: "description", content: "Welcome to DailyHands!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {}

export default function Home() {
  const randomSigns = Array.from({ length: 3 }, () => {
    const randomIndex = Math.floor(Math.random() * SIGN_LIST.length);
    return SIGN_LIST[randomIndex];
  });
  const answer = randomSigns[0].name;

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <section
        className={twMerge(
          "min-h-screen grid place-items-center",
          "bg-zinc-300 snap-start",
        )}
      >
        <div
          className={twMerge(
            "text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl",
            "animate-[fadeIn_0.5s_ease-in]",
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
      </section>

      <section
        className={twMerge(
          "h-screen flex flex-col justify-center items-center",
          "bg-linear-to-b from-zinc-300 to-orange-300 snap-start",
        )}
      >
        <h2 className="text-5xl">{answer}</h2>
        <CardTrio data={randomSigns} answer={answer} />
      </section>
    </div>
  );
}
