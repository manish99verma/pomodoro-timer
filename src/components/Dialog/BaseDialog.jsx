import { useSelector } from "react-redux";
import { MdClear } from "react-icons/md";

const BaseDialog = ({ children, onDismiss }) => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 flex items-center justify-center bg-black/85"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`relative w-[85%] max-w-96 px-4 py-6 shadow-2xl rounded-2xl border-1 border-gray-400 ${
          darkMode ? "bg-gray-950 text-white" : "bg-white text-black"
        }`}
      >
        {children}
        <button
          type="button"
          className="absolute top-4 right-4 p-2 hover:opacity-70 cursor-pointer"
          onClick={onDismiss}
        >
          <MdClear className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BaseDialog;
