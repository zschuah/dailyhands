import { useWindowScroll } from "@uidotdev/usehooks";
import { PiArrowFatLinesDownFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import CardTrio from "~/components/CardTrio";
import NavbarIsland from "~/components/NavbarIsland";
import { createMeta } from "~/utils/meta";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return createMeta({ title: "Home" });
}

export default function Home() {
  const [{ y }] = useWindowScroll();
  const currentY = y ?? 0;
  const isScrolled = currentY > 100;

  return (
    <>
      {/* Welcome Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center relative",
          "bg-zinc-300",
        )}
      >
        <NavbarIsland isScrolled={isScrolled} />

        <div className="-mt-20 md:mt-0">
          <div
            className={twMerge(
              "text-center flex flex-col items-center bg-zinc-200 p-8",
              "rounded-3xl animate-[fadeIn_0.5s_ease-in]",
            )}
          >
            <p>Welcome! Welcome!</p>
            <img
              className="w-60"
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
              alt="👋"
            />
          </div>
        </div>

        <div className="absolute bottom-20 md:bottom-4 flex flex-col items-center animate-bounce select-none">
          <p>Scroll down to start!</p>
          <PiArrowFatLinesDownFill className="text-3xl" />
        </div>
      </section>

      {/* Game Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center",
          "bg-linear-to-b from-zinc-300 to-orange-300",
        )}
      >
        <CardTrio />
      </section>
    </>
  );
}
