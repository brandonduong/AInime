import { Link, useParams } from "react-router-dom";
import HomeButton from "./HomeButton";

export default function Archive() {
  const START_DATE = new Date("2024-07-22");
  const { mode, date } = useParams();

  function getDailyDates(start: Date, end: Date) {
    const dailies = [];
    let startDate = new Date(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate()
    );
    let endDate = new Date(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    );
    let date = endDate;
    while (date >= startDate && date <= endDate) {
      dailies.push(date.toISOString().split("T")[0]);
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    return dailies;
  }

  return (
    <div>
      <h3>Archive</h3>
      <div className="overflow-y-auto max-h-96">
        {getDailyDates(START_DATE, new Date()).map((d) => {
          return (
            <Link to={`/${mode ? mode : "anime"}/${d}`} key={d}>
              <HomeButton active={date === d}>{d}</HomeButton>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
