import { useEffect, useRef, useState } from "react";
import BaseDialog from "./BaseDialog";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addLabel } from "../../store/actions";

function AddNewLabel({ onDismiss, onSave }) {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.labels);
  const ref = useRef();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Label Validation
    if (!value) {
      setError("Please enter label");
      return;
    }

    if (value.length > 128) {
      setError("Label should be less than 128 characters");
      return;
    }

    // Check duplicate
    if (labels.map((item) => item.label).includes(value)) {
      setError(`${value} already exists`);
      return;
    }

    dispatch(addLabel({ createdAt: Date.now(), label: value }));
    onSave(value);
  };

  return (
    <BaseDialog onDismiss={onDismiss}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h3 className="text-center font-semibold text-lg pb-6">
          Add new Label
        </h3>
        <div className="mb-8">
          <input
            placeholder="Add new label"
            className="w-full h-12 px-4 rounded-xl  border-2 border-gray-400 active:border-orange-400"
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <div className="text-red-500 px-2 text-light">{error}</div>}
        </div>

        <Button type="submit">Add</Button>
      </form>
    </BaseDialog>
  );
}

export default AddNewLabel;
