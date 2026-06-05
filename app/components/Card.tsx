import { twMerge } from "tailwind-merge";
import type { SignProps } from "~/utils/types";

type Props = {
  data: SignProps;
  answerName: string;
  isReveal: boolean;
  isSelected: boolean;
  handleCardClick: (cardId: string) => void;
};

const Card = ({
  data,
  answerName,
  isReveal,
  isSelected,
  handleCardClick,
}: Props) => {
  const { name, images } = data;
  const { imageAnimated, imageStatic } = images;

  return (
    <div
      className={twMerge(
        "relative overflow-hidden flex justify-center items-end",
        "h-14 md:w-20 md:h-auto",
        "bg-zinc-800 rounded-2xl md:rounded-3xl shadow-lg cursor-pointer",
        "transition-all duration-700",
        isSelected && "h-60 md:w-150",
      )}
      onClick={() => handleCardClick(data.id)}
    >
      <img
        className="w-full h-full object-cover"
        src={isSelected ? imageAnimated : imageStatic}
        alt={name}
      />

      <div className="absolute bottom-0 left-0 right-0 min-h-10">
        <div
          className={twMerge(
            "absolute inset-0 transition duration-500 opacity-0",
            "blur-xl scale-150",
            isReveal && "opacity-100",
            name === answerName ? "bg-green-500/50" : "bg-red-500/50",
          )}
        ></div>

        <h3
          className={twMerge(
            "p-4 text-center text-xl md:text-3xl font-bold text-slate-100 drop-shadow truncate",
            "opacity-0 translate-y-2 transition duration-500",
            // Mobile condition: Reveals whenever isReveal is true
            isReveal && "opacity-100 translate-y-0",
            // Desktop override: If isReveal is true but NOT selected, hide it again on desktop
            isReveal && !isSelected && "md:opacity-0 md:translate-y-2",
          )}
        >
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Card;
