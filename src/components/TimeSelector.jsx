import { useRef } from "react";

const TimeSelector = ({
  title,
  unitName,
  selectedValue,
  selectorsList = [1, 2, 3],
  onSelect,
}) => {
  const scrollRef = useRef(null);

  // Handle mouse drag
  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    const slider = scrollRef.current;
    slider.isDown = false;
  };

  const handleMouseUp = () => {
    const slider = scrollRef.current;
    slider.isDown = false;
  };

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider.isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.startX) * 1; // speed multiplier
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="">{title}</div>

      {/* scrolling wrapper */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <ul className="flex items-center px-2">
          {selectorsList.map((item) => (
            <li
              onClick={() => {
                onSelect(item);
              }}
              key={item}
              className={`shrink-0 text-sm px-2 ${
                selectedValue === item
                  ? "text-xl text-orange-600 font-medium"
                  : "opacity-90 text-sm"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm font-light">{unitName}</div>
    </div>
  );
};

export default TimeSelector;
