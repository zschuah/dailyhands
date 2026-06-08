import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { IS_DEV } from "~/utils/constants";
import type { SignProps } from "~/utils/types";

type Props = {
  sign: SignProps;
  isOpen: boolean;
  handleToggleVisible: (id: string) => void;
};

const BankButton = ({ sign, isOpen, handleToggleVisible }: Props) => {
  const navigate = useNavigate();

  const [isGifLoading, setIsGifLoading] = useState(true);
  const [isStaticLoading, setIsStaticLoading] = useState(true);

  const ref = useClickAway<HTMLDivElement>(() => {
    if (isOpen) {
      handleToggleVisible(sign.id);
    }
  });

  const handleButtonClick = () => {
    // Vercel tracking of page views
    navigate(`/bank/${encodeURIComponent(sign.name)}`, {
      replace: true,
      preventScrollReset: true,
    });

    handleToggleVisible(sign.id);
  };

  return (
    <div
      ref={ref}
      onClick={handleButtonClick}
      className={twMerge("btn relative", isOpen && "btn-active z-10")}
    >
      {isOpen && (
        <div
          className={twMerge(
            "absolute top-0 translate-y-[-105%] w-[80vw] md:w-[140%]",
            "aspect-video rounded-lg shadow-lg overflow-hidden",
          )}
        >
          {isGifLoading && <div className="skeleton w-full h-full"></div>}

          <a
            href={sign.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="h-full w-full object-cover"
              src={sign.images.imageAnimated}
              alt={sign.name}
              onLoad={() => setIsGifLoading(false)}
            />
          </a>
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
    </div>
  );
};

export default BankButton;
