import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Card from "~/components/Card";
import NavbarIsland from "~/components/NavbarIsland";
import { useAppContext } from "~/context/AppContext";
import { getUniqueIntegers } from "~/utils/helpers";
import { createMeta } from "~/utils/meta";
import { SIGN_LIST } from "~/utils/signList";
import type { Route } from "./+types/hard-mode";

const generateNewRound = () => {
  const randomSigns = getUniqueIntegers({
    size: SIGN_LIST.length,
    count: 1,
  }).map((integer) => SIGN_LIST[integer]);

  return {
    sign: randomSigns[0],
    answer: randomSigns[0].name,
  };
};

export function meta({}: Route.MetaArgs) {
  return createMeta({ title: "Hard Mode" });
}

export default function Bank() {
  const [currentRound, setCurrentRound] = useState(generateNewRound());
  const [inputValue, setInputValue] = useState("");

  const [isReveal, setIsReveal] = useState(false);

  // Track if we are currently animating between rounds
  const [isFadingOut, setIsFadingOut] = useState(false);

  const { setScore } = useAppContext();
  const [isScored, setIsScored] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsReveal(true);
    // setInputValue("");
  };

  const handleNextClick = (e: React.MouseEvent) => {
    // Prevent handleReset from trigerring
    e.stopPropagation();
    setIsFadingOut(true);

    const upcomingRound = generateNewRound();

    // Force the browser to start downloading the new images
    const imgAnimated = new Image();
    const imgStatic = new Image();
    imgAnimated.src = upcomingRound.sign.images.imageAnimated;
    imgStatic.src = upcomingRound.sign.images.imageStatic;

    // Wait for the CSS duration (500ms) to finish
    setTimeout(() => {
      setCurrentRound(upcomingRound);

      setIsScored(false);
      setIsFadingOut(false);
    }, 500);
  };

  return (
    <div
      className={twMerge(
        "min-h-screen grid place-items-center",
        "bg-linear-to-b from-zinc-300 to-orange-500",
      )}
    >
      <NavbarIsland isScrolled />

      <section
        className={twMerge(
          "flex flex-col items-center gap-4 w-full h-3/5 outline-4 outline-green-500",
          "transition duration-500",
          isFadingOut ? "opacity-0" : "opacity-100",
        )}
      >
        <Card
          data={currentRound.sign}
          answerName={inputValue}
          isReveal={isReveal}
          isSelected
          handleCardClick={() => {}}
          className="w-9/10 h-full md:h-full"
        />

        <form className="join" onSubmit={handleSubmit}>
          <input
            className="input input-primary join-item"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-primary join-item">Submit</button>
        </form>

        <button
          onClick={handleNextClick}
          className="btn btn-secondary"
          disabled={!isScored}
        >
          Next
        </button>
      </section>
    </div>
  );
}
