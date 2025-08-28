import Dropdown from "./Dropdown";

const LabelSelector = ({
  selectedValue,
  selectorsList = ["Option 1", "Option 2", "Option 3"],
  onSelect,
  requestNewItem,
}) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="">Label</div>
      <Dropdown
        selectedValue={selectedValue}
        selectorsList={selectorsList}
        onSelect={onSelect}
        requestNewItem={requestNewItem}
      />
    </div>
  );
};

export default LabelSelector;
