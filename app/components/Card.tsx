import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { SignProps } from "~/utils/types";

type Props = {
  data: SignProps;
  isCorrect: boolean;
  isReveal: boolean;
  isSelected: boolean;
  handleCardClick: (cardId: string) => void;
  className?: string;
  variant?: "simple" | "spinner";
};

const Card = ({
  data,
  isCorrect,
  isReveal,
  isSelected,
  handleCardClick,
  className,
  variant = "simple",
}: Props) => {
  const { name, images } = data;
  const { imageAnimated, imageStatic } = images;

  // Hooks still run for both variants, but the overhead is minimal
  const [isLoading, setIsLoading] = useState(true);
  const currentSrc = isSelected ? imageAnimated : imageStatic;
  const currentSrcRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Bail out early if we are using the simple variant
    if (variant === "simple") return;

    // If the image is already preloaded, .complete will be true instantly
    if (currentSrcRef.current?.complete) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentSrc, variant]);

  return (
    <div
      className={twMerge(
        "relative overflow-hidden flex justify-center items-end",
        "h-14 md:w-20 md:h-auto",
        "bg-zinc-800 rounded-2xl md:rounded-3xl shadow-lg cursor-pointer",
        "transition-all duration-700",
        isSelected && "h-60 md:w-150",
        className,
      )}
      onClick={() => handleCardClick(data.id)}
    >
      {/* RENDER LOGIC: Switch between variants */}
      {variant === "simple" ? (
        <img
          className="w-full h-full object-cover"
          src={currentSrc}
          alt={name}
        />
      ) : (
        <>
          {isLoading && (
            <>
              <img
                className="absolute w-full h-full object-cover"
                src={imageStatic}
                alt={name}
              />
              <div className="absolute inset-0 bg-zinc-800/50 grid place-items-center">
                <span className="loading loading-spinner loading-xl text-secondary"></span>
              </div>
            </>
          )}

          <img
            ref={currentSrcRef}
            key={currentSrc}
            className={twMerge(
              "absolute w-full h-full object-cover",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            src={currentSrc}
            alt={name}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 min-h-10">
        <div
          className={twMerge(
            "absolute inset-0 transition duration-500 opacity-0",
            "blur-xl scale-150",
            isReveal && "opacity-100",
            isCorrect ? "bg-green-500/50" : "bg-red-500/50",
          )}
        ></div>

        <h3
          className={twMerge(
            "p-4 text-center text-xl md:text-3xl font-bold text-slate-100 drop-shadow",
            "truncate select-none",
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
