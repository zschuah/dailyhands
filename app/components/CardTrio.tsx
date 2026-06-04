import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getUniqueIntegers } from "~/utils/helpers";
import { SIGN_LIST } from "~/utils/signList";
import Card from "./Card";

const generateNewRound = () => {
  const randomSigns = getUniqueIntegers({ size: SIGN_LIST.length }).map(
    (integer) => SIGN_LIST[integer],
  );
  const answerIndex = Math.floor(Math.random() * randomSigns.length);

  return {
    signs: randomSigns,
    answer: randomSigns[answerIndex].name,
  };
};

const CardTrio = () => {
  const [currentRound, setCurrentRound] = useState(generateNewRound());
  const CARD_LIST = currentRound.signs;
  const answer = currentRound.answer;

  const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
  const isIntersecting = entry?.isIntersecting;

  const [isReveal, setIsReveal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // Track if we are currently animating between rounds
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (selectedId === cardId) {
      setIsReveal(true);
    } else {
      setSelectedId(cardId);
    }
  };

  const handleReset = () => {
    setSelectedId("");
    setIsReveal(false);
  };

  const handleNextClick = (e: React.MouseEvent) => {
    // Prevent handleReset from trigerring
    e.stopPropagation();
    setIsFadingOut(true);

    // Wait for the CSS duration (500ms) to finish
    setTimeout(() => {
      handleReset();
      setCurrentRound(generateNewRound());
      setIsFadingOut(false);
    }, 500);
  };

  useEffect(() => {
    if (!isIntersecting) {
      handleReset();
    }
  }, [isIntersecting]);

  // Visible if intersecting AND not actively fading out
  const isVisible = isIntersecting && !isFadingOut;

  return (
    <div
      ref={ref}
      className={twMerge(
        "h-full w-full flex flex-col justify-center items-center gap-5",
        "transition duration-500 pt-20 md:pt-0",
        isVisible ? "opacity-100 delay-200" : "opacity-0 delay-0",
      )}
      onClick={() => handleReset()}
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl text-shadow-lg mb-2">{answer}</h2>
        <p>Which is correct?</p>
      </div>

      <section
        className="flex flex-col gap-4 w-9/10 md:flex-row md:h-2/5 md:w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {CARD_LIST.map((card) => (
          <Card
            key={card.id}
            data={card}
            answer={answer}
            isReveal={isReveal}
            isSelected={card.id === selectedId}
            handleCardClick={handleCardClick}
          />
        ))}
      </section>

      <button
        className="btn btn-primary"
        onClick={handleNextClick}
        disabled={isFadingOut || !isReveal}
      >
        Next
      </button>
    </div>
  );
};

export default CardTrio;
