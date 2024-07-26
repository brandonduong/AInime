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
      <h3 className="text-lg font-bold uppercase text-pink-900 p-2 bg-pink-400 border-b-4 border-pink-900">
        Archive
      </h3>
      <div className="overflow-y-auto max-h-96 p-4 flex flex-col gap-4">
        {getDailyDates(START_DATE, new Date()).map((d, ind) => {
          return (
            <Link to={`/${mode ? mode : "anime"}/${d}`} key={d}>
              <div className="border-4 border-pink-900">
                <HomeButton active={date === d || (!date && ind === 0)}>
                  {d}
                </HomeButton>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
