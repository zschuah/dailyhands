import { useEffect } from "react";
import catCryImg from "~/assets/cat_cry.webp";
import { safeJsonParse } from "~/utils/helpers";
import { createMeta } from "~/utils/meta";
import type { Route } from "./+types/error";

export function meta({}: Route.MetaArgs) {
  return createMeta({ title: "Error" });
}

export default function Error() {
  useEffect(() => {
    const savedError = localStorage.getItem("last_error_debug");

    if (savedError) {
      console.error("Production Error Debug Info:", safeJsonParse(savedError));
    }
  }, []);

  return (
    <div className="bg-zinc-300 min-h-dvh grid place-items-center">
      <div className="text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl">
        <h2 className="text-5xl">Error</h2>

        <p className="max-w-2xs">
          The server is down at the moment. Please wait while we fix this.
        </p>

        <img className="w-60 h-60" src={catCryImg} alt="😿" />
      </div>
    </div>
  );
}
