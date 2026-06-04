import { useWindowScroll } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";
import CardTrio from "~/components/CardTrio";
import NavbarIsland from "~/components/NavbarIsland";

export default function Home() {
  const [{ y }] = useWindowScroll();
  const isScrolled = (y ?? 0) > 100;

  return (
    <>
      {/* Welcome Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center relative bg-zinc-300",
        )}
      >
        <NavbarIsland isScrolled={isScrolled} />

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

        <div className="absolute bottom-4 flex flex-col items-center animate-bounce">
          <p>Scroll down for more!</p>
          <span className="text-5xl">&#8609;</span>
        </div>
      </section>

      {/* Game Section */}
      <section
        className={twMerge(
          "min-h-screen grid place-items-center bg-linear-to-b from-zinc-300 to-orange-300",
        )}
      >
        <CardTrio />
      </section>
    </>
  );
}
