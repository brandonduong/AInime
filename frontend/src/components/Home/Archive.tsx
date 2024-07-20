import { Link } from "react-router-dom";
import HomeButton from "./HomeButton";

export default function Archive() {
  const START_DATE = new Date("2024-07-17");

  function getDailyDates(start: Date, end: Date) {
    const dailies = [];
    let date = new Date(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    );
    while (date >= start && date <= end) {
      dailies.push(date.toISOString().split("T")[0]);
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    return dailies;
  }

  return (
    <div>
      <h3>Archive</h3>
      {getDailyDates(START_DATE, new Date()).map((d) => {
        return (
          <Link to={`/play/${d}`}>
            <HomeButton>{d}</HomeButton>
          </Link>
        );
      })}
    </div>
  );
}
