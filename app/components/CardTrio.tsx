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

  const [isReveal, setIsReveal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  // Track if we are currently animating between rounds
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (selectedId === cardId) {
      setIsReveal(!isReveal);
    } else {
      setSelectedId(cardId);
    }
  };

  const handleReset = () => {
    setSelectedId("");
    setIsReveal(false);
  };

  // Handle the Next button click with animations
  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent handleReset from the parent container from firing immediately

    setIsFadingOut(true); // 1. Start fade out

    // 2. Wait for the CSS duration (500ms) to finish
    setTimeout(() => {
      handleReset(); // Close any open cards
      handleNextRound(); // Tell parent to give us new signs
      setIsFadingOut(false); // Fade back in with new signs
    }, 500);
  };

  useEffect(() => {
    if (!entry?.isIntersecting) {
      handleReset();
    }
  }, [entry?.isIntersecting]);

  // The section is visible if it's intersecting AND we aren't actively fading out
  const isVisible = entry?.isIntersecting && !isFadingOut;

  return (
    <div
      ref={ref}
      className={twMerge(
        "h-screen w-full flex flex-col justify-center items-center gap-5 transition-opacity duration-500",
        isVisible ? "opacity-100 delay-200" : "opacity-0 delay-0",
      )}
      onClick={() => handleReset()}
    >
      <div className="text-center">
        <h2 className="text-5xl text-shadow-lg mb-2">{answer}</h2>
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

      {/* Attach the new click handler here */}
      <button
        className="btn btn-primary"
        onClick={handleNextClick}
        disabled={isFadingOut} // Optional: Prevent spam clicking during animation
      >
        Next
      </button>
    </div>
  );
};

export default CardTrio;
