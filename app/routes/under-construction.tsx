import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { apiRequest } from "~/utils/apiRequest";
import { safeJsonStringify } from "~/utils/helpers";
import type { Route } from "./+types/under-construction";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DailyHands | Under Construction" },
    { name: "description", content: "Practice SgSL here!" },
  ];
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

        <img
          className="w-60"
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f648/512.gif"
          alt="🙈"
        />

        <fetcher.Form method="POST">
          <input
            className="input input-ghost"
            type="text"
            name="konami"
            autoComplete="off"
          />
        </fetcher.Form>
      </div>
    </div>
  );
}
