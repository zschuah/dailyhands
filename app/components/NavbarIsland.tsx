import { useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "~/context/AppContext";

type Props = {
  isScrolled: boolean;
  isHidden?: boolean;
};

const NavbarIsland = ({ isScrolled, isHidden }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { score } = useAppContext();

  const handleClickLogo = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <nav
      className={twMerge(
        "fixed top-5 h-16 w-9/10 max-w-3xl bg-zinc-300 rounded-full z-10 transition duration-700",
        "transition duration-700",
        isScrolled && "bg-zinc-200 shadow-2xl",
        isHidden && "-translate-y-32",
      )}
    >
      <h1
        className={twMerge(
          "absolute whitespace-nowrap text-7xl cursor-pointer transition-all duration-700",
          isScrolled
            ? "top-1/2 left-6 -translate-y-1/2 text-xl md:text-3xl"
            : "top-[50vh] left-1/2 -translate-x-1/2 translate-y-[-450%] md:translate-y-[-330%] text-5xl md:text-7xl",
        )}
        onClick={handleClickLogo}
      >
        Daily Hands
      </h1>

      <div
        className={twMerge(
          "h-full flex items-center justify-between mx-6",
          "opacity-0 pointer-events-none transition duration-700",
          isScrolled && "opacity-100 pointer-events-auto",
        )}
      >
        <span></span>

        <p>{score}</p>

        <label htmlFor="my-drawer-1" className="btn btn-sm">
          MENU
        </label>
      </div>
    </nav>
  );
};

export default NavbarIsland;
