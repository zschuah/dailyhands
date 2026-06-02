import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AVAILABLE_TAGS, SIGN_LIST } from "~/utils/signList";

export default function Bank() {
  const CURRENT_SIGNS = SIGN_LIST.length;
  const TOTAL_SIGNS = 1559;

  const [visibleGif, setVisibleGif] = useState("");
  const [isGifLoading, setIsGifLoading] = useState(false);

  const handleVisibleGif = (id: string) => {
    if (visibleGif !== id) {
      setVisibleGif(id);
      setIsGifLoading(true);
    } else {
      setVisibleGif("");
    }
  };

  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center gap-4 p-8">
      <h2 className="text-5xl">Bank</h2>

      <p>TAGS: {AVAILABLE_TAGS.join(", ").toString()}</p>

      <div className="text-center">
        <p>
          {CURRENT_SIGNS} out of {TOTAL_SIGNS} signs
        </p>
        <progress
          className="progress progress-primary w-80"
          value={CURRENT_SIGNS}
          max={TOTAL_SIGNS}
        ></progress>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        <button className="btn"></button>

        {SIGN_LIST.map((sign) => {
          return (
            <div className="flex flex-col">
              <button
                onClick={() => handleVisibleGif(sign.id)}
                key={sign.id}
                className={twMerge(
                  "btn relative",
                  visibleGif === sign.id && "btn-active",
                )}
              >
                {visibleGif === sign.id && (
                  <div className="absolute top-0 w-[120%] translate-y-[-110%] aspect-video rounded-lg shadow-lg overflow-hidden">
                    {isGifLoading && (
                      <div className="skeleton w-full h-full"></div>
                    )}

                    <img
                      className="h-full w-full object-cover"
                      src={sign.images.imageAnimated}
                      alt={sign.name}
                      onLoad={() => setIsGifLoading(false)}
                    />
                  </div>
                )}

                <div>
                  <span>{sign.name}</span>
                  {sign.tags && <span>*</span>}
                </div>
              </button>

              <p className="text-center">{sign.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
