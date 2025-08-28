import { useState } from "react";
import Button from "./Button";
import { MdCalendarMonth } from "react-icons/md";
import StatDialog from "./Dialog/StatDialog";

const StatsButton = () => {
  const [statsOpened, setStatsOpened] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setStatsOpened((b) => !b)}>
        <MdCalendarMonth />
        <span>Stats</span>
      </Button>
      {statsOpened && <StatDialog onDismiss={() => setStatsOpened(false)} />}
    </>
  );
};

export default StatsButton;
