import { useState } from "react";
import type { SignProps } from "~/utils/types";
import Card from "./Card";

type Props = {
  data: SignProps[];
  answer: string;
};

const CardTrio = ({ data, answer }: Props) => {
  const CARD_LIST = data;

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

  return (
    <section className="flex flex-col gap-4 w-9/10 md:flex-row md:h-2/5 md:w-auto">
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
  );
};

export default CardTrio;
