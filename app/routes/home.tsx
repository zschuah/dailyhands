import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import CardTrio from "~/components/CardTrio";
import { getUniqueIntegers } from "~/utils/helpers";
import { SIGN_LIST } from "~/utils/signList";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DailyHands" },
    { name: "description", content: "Welcome to DailyHands!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {}

export default function Home() {
  // 1. Create a function to generate a fresh set of signs
  const generateNewRound = () => {
    const randomSigns = getUniqueIntegers({ size: SIGN_LIST.length }).map(
      (integer) => SIGN_LIST[integer],
    );
    return {
      signs: randomSigns,
      answer: randomSigns[0].name,
    };
  };

  // 2. Store the current signs in state, initializing it on the first render
  const [currentRound, setCurrentRound] = useState(generateNewRound);

  // 3. Create a callback to trigger the next round
  const handleNextRound = useCallback(() => {
    setCurrentRound(generateNewRound());
  }, []);

  return (
    <div className="h-screen overflow-y-auto snap-y scroll-smooth">
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
          "min-h-screen grid place-items-center",
          "bg-linear-to-b from-zinc-300 to-orange-300 snap-start",
        )}
      >
        <CardTrio
          data={currentRound.signs}
          answer={currentRound.answer}
          handleNextRound={handleNextRound}
        />
      </section>
    </div>
  );
}
