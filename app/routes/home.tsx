import { useWindowScroll } from "@uidotdev/usehooks";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import CardTrio from "~/components/CardTrio";

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
        <nav
          className={twMerge(
            "fixed top-5 h-16 w-9/10 max-w-3xl bg-zinc-300 transition duration-700",
            "rounded-full z-10 animate-[fadeIn_0.5s_ease-in]",
            isScrolled && "bg-zinc-200 shadow-2xl",
          )}
        >
          <h1
            className={twMerge(
              "absolute whitespace-nowrap text-7xl transition-all duration-700",
              isScrolled
                ? "top-1/2 left-6 -translate-y-1/2 text-xl md:text-3xl"
                : "top-[50vh] left-1/2 -translate-x-1/2 translate-y-[-450%] md:translate-y-[-330%] text-5xl md:text-7xl",
            )}
          >
            Daily Hands
          </h1>

          <div
            className={twMerge(
              "h-full flex items-center justify-end",
              "opacity-0 pointer-events-none transition duration-700",
              isScrolled && "opacity-100 pointer-events-auto",
            )}
          >
            <Link to="/bank" className="mr-8">
              <div className="btn btn-sm">Bank</div>
            </Link>
          </div>
        </nav>

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
