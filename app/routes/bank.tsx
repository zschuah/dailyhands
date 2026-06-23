import { usePrevious, useWindowScroll } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { useFetcher } from "react-router";
import { twMerge } from "tailwind-merge";
import supabase from "~/api/supabase";
import BankButton from "~/components/BankButton";
import NavbarIsland from "~/components/NavbarIsland";
import { useSSRLocalStorage } from "~/hooks/useSSRLocalStorage";
import { IS_DEV } from "~/utils/constants";
import { createMeta } from "~/utils/meta";
import { AVAILABLE_TAGS, RAW_LIST } from "~/utils/signList";
import type { Route } from "./+types/bank";

export function meta({}: Route.MetaArgs) {
  return createMeta({
    title: "SgSL Sign Bank",
    description:
      "Browse and look up hundreds of words from the Singapore Sign Language. Your quick access guide to finding the right sign.",
  });
}

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
  const [{ y }] = useWindowScroll();
  const currentY = y ?? 0;
  const prevY = usePrevious(currentY) ?? 0;
  const isScrollingUp = prevY > currentY;
  const isNavHidden = currentY > 500 && !isScrollingUp;

  const BANK_LIST = RAW_LIST;
  const CURRENT_SIGNS = BANK_LIST.length;
  const TOTAL_SIGNS = 1327;
  const PERCENT_TEXT = `(${Math.round((CURRENT_SIGNS / TOTAL_SIGNS) * 100)}%)`;

  const [inputValue, setInputValue] = useState("");

  const filteredSigns = useMemo(() => {
    const normalizedInput = inputValue.trim().toLowerCase();
    return BANK_LIST.filter(
      (sign) =>
        sign.name.toLowerCase().includes(normalizedInput) ||
        sign.id.toLowerCase().startsWith(normalizedInput),
    );
  }, [inputValue]);

  const fetcher = useFetcher<{ isSuccess: boolean }>();
  const isUpdating = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.isSuccess;

  const [visibleImages, setVisibleImages] = useState("");
  const [hasClickedGif, setHasClickedGif] = useSSRLocalStorage(
    "hasClickedGif",
    false,
  );

  const handleToggleVisible = (id: string) => {
    if (visibleImages !== id) {
      setVisibleImages(id);
    } else {
      setVisibleImages("");
    }
  };

  const handleUpdateSigns = () => {
    fetcher.submit(BANK_LIST, {
      method: "POST",
      encType: "application/json",
    });
  };

  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center gap-8 p-8 pb-40">
      <NavbarIsland isScrolled isHidden={isNavHidden} />

      <h2 className="text-5xl pt-20">Bank</h2>

      <div className="flex flex-col items-center gap-2">
        <p>
          {CURRENT_SIGNS} out of {TOTAL_SIGNS} words {PERCENT_TEXT}
        </p>
        <progress
          className="progress progress-primary w-60"
          value={CURRENT_SIGNS}
          max={TOTAL_SIGNS}
        ></progress>

        <input
          className="input input-primary"
          placeholder="Search for sign"
          type="text"
          id="user-search"
          value={inputValue}
          onChange={(prev) => setInputValue(prev.target.value)}
        />
        <button className="btn btn-secondary" onClick={() => setInputValue("")}>
          Clear
        </button>
      </div>

      {/* DEV only section */}
      {IS_DEV && (
        <section className="flex flex-col items-center gap-2">
          <p>TAGS: {AVAILABLE_TAGS.join(", ").toString()}</p>

          <button
            className="btn btn-secondary"
            onClick={handleUpdateSigns}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Signs"}
          </button>

          <div
            className={twMerge(
              "inline-flex items-center gap-2 text-sm font-bold text-success-content",
              !isSuccess && "invisible",
            )}
          >
            <div className="status status-success"></div>
            <span>Success!</span>
          </div>
        </section>
      )}

      {filteredSigns.length === 0 && (
        <p className="text-center text-lg">No signs found.</p>
      )}

      <section
        className={twMerge(
          "grid grid-cols-1 md:grid-cols-6",
          "gap-2 min-h-[50vh] auto-rows-min min-w-3/5",
        )}
      >
        {/* Replicate extra slot from SgSL site */}
        {IS_DEV && <button className="btn"></button>}

        {filteredSigns.map((sign) => {
          return (
            <div key={sign.id} className="flex flex-col">
              <BankButton
                sign={sign}
                isOpen={visibleImages === sign.id}
                handleToggleVisible={() => handleToggleVisible(sign.id)}
                hasClickedGif={hasClickedGif}
                setHasClickedGif={setHasClickedGif}
              />

              {IS_DEV && <p className="text-center">{sign.id}</p>}
            </div>
          );
        })}
      </section>

      <button
        className={twMerge(
          "fixed bottom-20 right-0 bg-zinc-800/50 rounded-l p-2 cursor-pointer",
          "translate-x-0 transition duration-500",
          isNavHidden && "translate-x-full",
        )}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <PiArrowFatLinesUpFill className="text-5xl text-white" />
      </button>
    </div>
  );
}
