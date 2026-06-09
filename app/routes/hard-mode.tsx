import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Card from "~/components/Card";
import NavbarIsland from "~/components/NavbarIsland";
import { useAppContext } from "~/context/AppContext";
import { getNormalised, getUniqueIntegers } from "~/utils/helpers";
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
  const { setScore } = useAppContext();
  const [currentRound, setCurrentRound] = useState(generateNewRound());
  const [inputValue, setInputValue] = useState("");

  const isCorrect =
    getNormalised(inputValue) === getNormalised(currentRound.answer);

  const [isReveal, setIsReveal] = useState(false);
  const [isScored, setIsScored] = useState(false);
  // Tracks animation between rounds
  const [isFadingOut, setIsFadingOut] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsReveal(true);

    // Scoring only if not scored yet
    if (!isScored) {
      const points = isCorrect ? 8 : -5;

      setScore((prev) => Math.max(0, prev + points));
      setIsScored(true);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    // Prevent handleReset from trigerring
    e.stopPropagation();
    setIsFadingOut(true);
    setIsReveal(false);

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
      setInputValue("");
    }, 500);
  };

  useEffect(() => {
    if (isScored && nextBtnRef.current) {
      // Focus Next button after submitting
      nextBtnRef.current.focus();
    } else if (!isScored && !isFadingOut && inputRef.current) {
      // Focus Input field for the new round
      inputRef.current.focus();
    }
  }, [isScored, isFadingOut]);

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
          isCorrect={isCorrect}
          isReveal={isReveal}
          isSelected
          handleCardClick={() => {}}
          className="w-9/10 h-full md:h-full"
        />

        <form className="join" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={twMerge(
              "input input-primary join-item",
              "disabled:opacity-50",
            )}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isScored}
            autoFocus
          />
          <button className="btn btn-primary join-item" disabled={isScored}>
            Submit
          </button>
        </form>

        <button
          ref={nextBtnRef}
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
