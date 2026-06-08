import { useRef } from "react";
import {
  PiArrowCounterClockwiseBold,
  PiBankFill,
  PiHandWavingFill,
} from "react-icons/pi";
import { Link } from "react-router";
import { useAppContext } from "~/context/AppContext";

type Props = {
  children: React.ReactNode;
};

const Drawer = ({ children }: Props) => {
  const { setScore } = useAppContext();

  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleCloseDrawer = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <div className="drawer drawer-end">
      <input
        ref={checkboxRef}
        id="my-drawer-1"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>

      <section className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg">
          <li>
            <Link to="/" onClick={handleCloseDrawer}>
              <PiHandWavingFill className="text-2xl" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link to="/bank" onClick={handleCloseDrawer}>
              <PiBankFill className="text-2xl" />
              <span>Bank</span>
            </Link>
          </li>

          <div className="divider"></div>

          <li>
            <button
              onClick={() => {
                const isConfirm = confirm(
                  "Are you sure you want to reset your score?",
                );

                if (isConfirm) {
                  handleCloseDrawer();
                  setScore(0);
                }
              }}
            >
              <PiArrowCounterClockwiseBold className="text-2xl" />
              <span>Reset score</span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Drawer;
