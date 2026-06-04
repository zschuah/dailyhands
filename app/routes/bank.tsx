import { useState } from "react";
import { useFetcher } from "react-router";
import { twMerge } from "tailwind-merge";
import supabase from "~/api/supabase";
import BankButton from "~/components/BankButton";
import { AVAILABLE_TAGS, SIGN_LIST } from "~/utils/signList";
import type { Route } from "./+types/bank";
import NavbarIsland from "~/components/NavbarIsland";
import { usePrevious, useWindowScroll } from "@uidotdev/usehooks";

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

  const CURRENT_SIGNS = SIGN_LIST.length;
  const TOTAL_SIGNS = 1559;
  const PERCENT_TEXT = `(${Math.round((CURRENT_SIGNS / TOTAL_SIGNS) * 100)}%)`;

  const fetcher = useFetcher<{ isSuccess: boolean }>();
  const isUpdating = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.isSuccess;

  const [visibleImages, setVisibleImages] = useState("");

  const handleToggleVisible = (id: string) => {
    if (visibleImages !== id) {
      setVisibleImages(id);
    } else {
      setVisibleImages("");
    }
  };

  const handleUpdateSigns = () => {
    fetcher.submit(SIGN_LIST, {
      method: "POST",
      encType: "application/json",
    });
  };

  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center gap-4 p-8 pb-40">
      <NavbarIsland isScrolled isHidden={isNavHidden} />

      <h2 className="text-5xl pt-20">Bank</h2>

      <p>TAGS: {AVAILABLE_TAGS.join(", ").toString()}</p>

      <div className="text-center">
        <p>
          {CURRENT_SIGNS} out of {TOTAL_SIGNS} signs {PERCENT_TEXT}
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

      <div
        className={twMerge(
          "inline-flex items-center gap-2 text-sm font-bold text-success-content",
          !isSuccess && "invisible",
        )}
      >
        <div className="status status-success"></div>
        <span>Success!</span>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
        <button className="btn"></button>

        {SIGN_LIST.map((sign) => {
          return (
            <div key={sign.id} className="flex flex-col">
              <BankButton
                sign={sign}
                isOpen={visibleImages === sign.id}
                handleToggleVisible={() => handleToggleVisible(sign.id)}
              />

              <p className="text-center">{sign.id}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
