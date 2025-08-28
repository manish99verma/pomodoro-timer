import { MdOutlineVisibility } from "react-icons/md";

const Timer = () => {
  return (
    <div className="flex flex-col gap-5 w-64 h-64 border-[10px] border-orange-600 rounded-full items-center justify-center">
      <MdOutlineVisibility className="w-6 h-6 opacity-80" />
      <div className="font-bold text-6xl">25:59</div>
      <div className="opacity-80 font-light">Focus</div>
    </div>
  );
};

export default Timer;
