import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

type Props = {
  isScrolled: boolean;
};

const NavbarIsland = ({ isScrolled }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          "h-full flex items-center justify-end",
          "opacity-0 pointer-events-none transition duration-700",
          isScrolled && "opacity-100 pointer-events-auto",
        )}
      >
        <NavLink to="/bank" className="mr-8">
          {({ isActive }) => (
            <div className={twMerge("btn btn-sm", isActive && "btn-active")}>
              Bank
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarIsland;
