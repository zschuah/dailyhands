import { twMerge } from "tailwind-merge";
import type { SignProps } from "~/utils/types";

type Props = {
  data: SignProps;
  answer: string;
  isReveal: boolean;
  isSelected: boolean;
  handleCardClick: (cardId: string) => void;
};

const Card = ({
  data,
  answer,
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
        "h-20 md:w-20 md:h-auto",
        "bg-zinc-800 rounded-3xl shadow-2xl cursor-pointer",
        "transition-all duration-700",
        isSelected && "h-80 md:w-150",
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
            name === answer ? "bg-green-500/50" : "bg-red-500/50",
          )}
        ></div>

        <h2
          className={twMerge(
            "p-4 text-center text-5xl font-bold text-slate-100 drop-shadow",
            "opacity-0 translate-y-2 transition duration-500",
            isReveal && isSelected && "opacity-100 translate-0",
          )}
        >
          {name}
        </h2>
      </div>
    </div>
  );
};

export default Card;
