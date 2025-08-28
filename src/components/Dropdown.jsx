import { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import Button from "./Button";

const Dropdown = ({
  requestNewItem,
  selectedValue = "Unlabelled",
  selectorsList = [],
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  const handleAddNew = () => {
    requestNewItem();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <Button onClick={toggleDropdown} variant="secondary">
          <span>{selectedValue}</span>
          {isOpen ? (
            <MdOutlineArrowDropUp className="w-6 h-6" />
          ) : (
            <MdOutlineArrowDropDown className="w-6 h-6" />
          )}
        </Button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } 
            rounded-md shadow-lg ring-1 ring-gray-400 ring-opacity-5
                    focus:outline-none`}
          role="menu"
        >
          <div className="py-1" role="none">
            <div
              className="block px-4 py-2 text-orange-600 font-semibold hover:opacity-70 cursor-pointer"
              role="menuitem"
              onClick={handleAddNew}
            >
              <strong>+</strong> Add New
            </div>
            <hr />
            <div className="overflow-y-scroll max-h-40">
              <ul>
                {selectorsList.map((item, id) => (
                  <li
                    onClick={() => handleSelect(item)}
                    className="block px-4 py-2 text-sm hover:opacity-70 cursor-pointer"
                    role="menuitem"
                    key={item + id}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
