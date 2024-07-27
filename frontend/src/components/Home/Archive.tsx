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

  function getLength(start: Date, end: Date) {
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
    let counter = 0;
    while (date >= startDate && date <= endDate) {
      counter += 1;
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    return counter;
  }

  return (
    <div>
      <h3 className="text-lg font-bold uppercase text-pink-900 p-2 bg-pink-400 border-b-4 border-pink-900">
        Archive
      </h3>
      <div className="overflow-y-auto p-4 gap-4 flex flex-col max-h-96">
        {getDailyDates(START_DATE, new Date("2024-08-06")).map((d, ind) => {
          return (
            <Link to={`/${mode ? mode : "anime"}/${d}`} key={d}>
              <div className="border-4 border-pink-900">
                <HomeButton active={date === d || (!date && ind === 0)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-start">
                        #{getLength(START_DATE, new Date("2024-08-06")) - ind}
                      </h5>
                      <p className="text-black text-xs italic">{d}</p>
                    </div>
                    <div>---</div>
                  </div>
                </HomeButton>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
