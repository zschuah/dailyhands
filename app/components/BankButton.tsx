import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IS_DEV } from "~/utils/constants";
import type { SignProps } from "~/utils/types";

type Props = {
  sign: SignProps;
  isOpen: boolean;
  handleToggleVisible: (id: string) => void;
};

const BankButton = ({ sign, isOpen, handleToggleVisible }: Props) => {
  const [isGifLoading, setIsGifLoading] = useState(true);
  const [isStaticLoading, setIsStaticLoading] = useState(true);

  const ref = useClickAway<HTMLButtonElement>(() => {
    if (isOpen) {
      handleToggleVisible(sign.id);
    }
  });

  return (
    <button
      ref={ref}
      onClick={() => handleToggleVisible(sign.id)}
      className={twMerge("btn relative", isOpen && "btn-active z-10")}
    >
      {isOpen && (
        <div
          className={twMerge(
            "absolute top-0 translate-y-[-105%] w-[150%]",
            "aspect-video rounded-lg shadow-lg overflow-hidden",
          )}
        >
          {isGifLoading && <div className="skeleton w-full h-full"></div>}

          <img
            className="h-full w-full object-cover"
            src={sign.images.imageAnimated}
            alt={sign.name}
            onLoad={() => setIsGifLoading(false)}
          />
        </div>
      )}

      {isOpen && IS_DEV && (
        <div
          className={twMerge(
            "absolute bottom-0 translate-y-[105%] w-[120%]",
            "aspect-video rounded-lg shadow-lg overflow-hidden",
          )}
        >
          {isStaticLoading && <div className="skeleton w-full h-full"></div>}

          <img
            className="h-full w-full object-cover"
            src={sign.images.imageStatic}
            alt={sign.name}
            onLoad={() => setIsStaticLoading(false)}
          />
        </div>
      )}

      <div>
        <span>{sign.name}</span>
        {sign.tags && <span>*</span>}
      </div>
    </button>
  );
};

export default BankButton;
