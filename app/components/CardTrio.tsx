import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { SignProps } from "~/utils/types";
import Card from "./Card";

type Props = {
  data: SignProps[];
  answer: string;
  handleNextRound: () => void;
};

const CardTrio = ({ data, answer, handleNextRound }: Props) => {
  const CARD_LIST = data;

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
    // Prevent handleReset from the parent container from firing immediately
    e.stopPropagation();
    setIsFadingOut(true);

    // Wait for the CSS duration (500ms) to finish
    setTimeout(() => {
      handleReset();
      handleNextRound(); // Tell parent to give new signs
      setIsFadingOut(false); // Fade back in with new signs
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
        "transition duration-500",
        isVisible ? "opacity-100 delay-200" : "opacity-0 delay-0",
      )}
      onClick={() => handleReset()}
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl text-shadow-lg mb-2">{answer}</h2>
        <p>Which is correct?</p>
      </div>

      <section
        className={twMerge(
          "flex flex-col gap-4 w-9/10 md:flex-row md:h-2/5 md:w-auto",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {CARD_LIST.map((card) => {
          return (
            <Card
              key={card.id}
              data={card}
              answer={answer}
              isReveal={isReveal}
              isSelected={card.id === selectedId}
              handleCardClick={handleCardClick}
            />
          );
        })}
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
