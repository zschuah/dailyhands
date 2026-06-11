import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import monkeySeeImg from "~/assets/monkey_see.webp";
import { apiRequest } from "~/utils/apiRequest";
import { safeJsonStringify } from "~/utils/helpers";
import { createMeta } from "~/utils/meta";
import type { Route } from "./+types/under-construction";

export function meta({}: Route.MetaArgs) {
  return createMeta({ title: "Under Construction" });
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const userKonami = formData.get("konami");

  const { data } = await apiRequest<{ isKonamiValid: boolean }>({
    url: "/api/verify-konami",
    method: "POST",
    data: { userKonami },
  });

  if (data?.isKonamiValid) {
    localStorage.setItem("konami", safeJsonStringify(userKonami));
    return { isSuccess: true };
  }

  return { isSuccess: false };
}

export default function UnderConstruction() {
  const navigate = useNavigate();

  const fetcher = useFetcher<{ isSuccess: boolean }>();
  const isSuccess = fetcher.data?.isSuccess;

  useEffect(() => {
    if (isSuccess) {
      const navTimeout = setTimeout(() => {
        navigate("/");
      }, 500);
      return () => clearTimeout(navTimeout);
    }
  }, [isSuccess]);

  return (
    <div className="bg-zinc-300 min-h-screen grid place-items-center">
      <div
        className={twMerge(
          "text-center flex flex-col items-center bg-zinc-200 p-8 rounded-3xl",
          isSuccess && "opacity-0 translate-y-2 transition duration-500",
        )}
      >
        <h2 className="text-5xl">Sorry!</h2>
        <p>This site is not ready yet.</p>

        <img className="w-60 h-60" src={monkeySeeImg} alt="🙈" />

        <fetcher.Form method="POST">
          <div className="join">
            <input
              className="input input-ghost join-item"
              type="text"
              name="konami"
              autoComplete="off"
            />
            <button className="btn btn-ghost join-item text-zinc-200">
              Submit
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
