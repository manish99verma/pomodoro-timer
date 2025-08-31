import { MdWbSunny, MdDarkMode, MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleSound, toggleTheme } from "../store/actions";
import Button from "./Button";

const Preferences = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const soundEnabled = useSelector((state) => state.soundEnabled);

  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => dispatch(toggleTheme())}
      >
        {darkMode ? (
          <MdWbSunny className="w-6 h-6" />
        ) : (
          <MdDarkMode className="w-6 h-6" />
        )}
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => dispatch(toggleSound())}
      >
        {soundEnabled ? (
          <MdVolumeUp className="w-6 h-6" />
        ) : (
          <MdVolumeOff className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default Preferences;
