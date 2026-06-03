import { useState } from "react";
import { useFetcher } from "react-router";
import { twMerge } from "tailwind-merge";
import supabase from "~/api/supabase";
import { AVAILABLE_TAGS, SIGN_LIST } from "~/utils/signList";
import type { Route } from "./+types/bank";

export async function action({ request }: Route.ActionArgs) {
  const signData = await request.json();

  const { error: deleteError } = await supabase
    .from("signs")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    return { error: deleteError };
  }

  const { error: insertError } = await supabase.from("signs").insert(signData);

  if (insertError) {
    return { error: insertError };
  }

  return { isSuccess: true };
}

export default function Bank() {
  const CURRENT_SIGNS = SIGN_LIST.length;
  const TOTAL_SIGNS = 1559;

  const fetcher = useFetcher();
  const isUpdating = fetcher.state !== "idle";

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

  const handleUpdateSigns = () => {
    fetcher.submit(SIGN_LIST, {
      method: "POST",
      encType: "application/json",
    });
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
          className="progress progress-primary w-60"
          value={CURRENT_SIGNS}
          max={TOTAL_SIGNS}
        ></progress>
      </div>

      <button
        className="btn btn-secondary"
        onClick={handleUpdateSigns}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update Signs"}
      </button>

      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        <button className="btn"></button>

        {SIGN_LIST.map((sign) => {
          return (
            <div key={sign.id} className="flex flex-col">
              <button
                onClick={() => handleVisibleGif(sign.id)}
                className={twMerge(
                  "btn relative",
                  visibleGif === sign.id && "btn-active z-10",
                )}
              >
                {visibleGif === sign.id && (
                  <div
                    className={twMerge(
                      "absolute top-0 translate-y-[-110%] w-[120%]",
                      "aspect-video rounded-lg shadow-lg overflow-hidden",
                    )}
                  >
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

                {visibleGif === sign.id && (
                  <div
                    className={twMerge(
                      "absolute bottom-0 translate-y-[110%] w-[120%]",
                      "aspect-video rounded-lg shadow-lg overflow-hidden",
                    )}
                  >
                    {isGifLoading && (
                      <div className="skeleton w-full h-full"></div>
                    )}

                    <img
                      className="h-full w-full object-cover"
                      src={sign.images.imageStatic}
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
      </section>
    </div>
  );
}
