import BaseDialog from "./BaseDialog";
import Button from "../Button";

function TimerFinishedDialog({ onDismiss }) {
  return (
    <BaseDialog onDismiss={onDismiss}>
      <div className="flex flex-col">
        <h3 className="text-center font-semibold text-lg pb-6">
          Congratulations 🎉
        </h3>

        <p className="pb-8">
          <strong>Good job!</strong> Your timer has been finished!
        </p>

        <Button onClick={onDismiss} type="button">
          Okay
        </Button>
      </div>
    </BaseDialog>
  );
}

export default TimerFinishedDialog;
