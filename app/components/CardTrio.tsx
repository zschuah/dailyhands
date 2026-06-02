import { useState } from "react";
import type { CardProps } from "~/utils/types";
import Card from "./Card";

const CARD_LIST: CardProps[] = [
  { id: crypto.randomUUID(), title: "King" },
  { id: crypto.randomUUID(), title: "Queen" },
  { id: crypto.randomUUID(), title: "Jack" },
];

const CardTrio = () => {
  const answer = "King";
  const [isReveal, setIsReveal] = useState(false);
  const [selected, setSelected] = useState(CARD_LIST[0]);

  const handleCardClick = (card: CardProps) => {
    if (selected?.id === card.id) {
      // If clicking selected card, toggle reveal
      setIsReveal(!isReveal);
    } else {
      // If clicking new card, expand it
      setSelected(card);
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
            isSelected={card.id === selected.id}
            handleCardClick={handleCardClick}
          />
        );
      })}
    </section>
  );
};

export default CardTrio;
