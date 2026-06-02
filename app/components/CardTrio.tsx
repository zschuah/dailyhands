import { useEffect, useState } from "react";
import type { SignProps } from "~/utils/types";
import Card from "./Card";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";

type Props = {
  data: SignProps[];
  answer: string;
};

const CardTrio = ({ data, answer }: Props) => {
  const CARD_LIST = data;

  const [ref, entry] = useIntersectionObserver();

  const [isReveal, setIsReveal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleCardClick = (cardId: string) => {
    if (selectedId === cardId) {
      // If clicking selected card, toggle reveal
      setIsReveal(!isReveal);
    } else {
      // If clicking new card, expand it
      setSelectedId(cardId);
    }
  };

  useEffect(() => {
    if (!entry?.isIntersecting) {
      setSelectedId("");
      setIsReveal(false);
    }
  }, [entry?.isIntersecting]);

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col justify-center items-center"
    >
      <h2 className="text-5xl mb-5 text-shadow-lg text-center">{answer}</h2>

      <div
        className={twMerge(
          "flex flex-col gap-4 w-9/10 md:flex-row md:h-2/5 md:w-auto",
        )}
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
      </div>
    </section>
  );
};

export default CardTrio;
