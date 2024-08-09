import { Link, useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { History, HistoryItem } from "../Game/AnimeMode";
import { useHistoryState } from "../../store/store";
import { END_DATE, START_DATE } from "../../common/constants";

export default function ArchiveList() {
  const { mode, date } = useParams();

  const [history, setHistory] = useHistoryState();

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

  function HistoryItem({ date }: { date: string }) {
    function getHistoryItem(date: string) {
      const m = mode ? mode : "anime";
      const guesses = JSON.parse(history)[m as keyof History];
      const g = guesses[date] as HistoryItem;
      if (g !== undefined) {
        let text = "";
        let classname = "";
        if (m === "anime" || m === "title") {
          text = g.guess ? "FAKE" : "REAL";
          classname = g.answer === g.guess ? "text-green-700" : "text-red-700";
        } else if (m === "rating") {
          text = g.guess.toString();
          classname = g.answer === g.guess ? "text-green-700" : "text-red-700";
        }
        return [text, classname, g.name];
      }
      return ["", "", ""];
    }
    const [text, cssClass, preview] = getHistoryItem(date);

    return (
      <>
        <div className="text-sm line-clamp-3 min-w-0 grow">{preview}</div>
        <div>
          <h4 className={cssClass}>{text}</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="text-lg font-bold uppercase text-pink-900 p-2 bg-pink-300 border-b-4 border-pink-900">
        Archive
      </h3>
      <div className="overflow-y-auto p-4 gap-4 flex flex-col">
        {getDailyDates(START_DATE, END_DATE).map((d, ind) => {
          return (
            <Link to={`/${mode ? mode : "anime"}/${d}`} key={d}>
              <div className="border-4 border-pink-900">
                <HomeButton>
                  <div className="flex justify-between items-center gap-4">
                    <div className="text-nowrap">
                      <h5 className="text-start">
                        #{getLength(START_DATE, END_DATE) - ind}
                      </h5>
                      <p className="text-black text-xs italic">{d}</p>
                    </div>
                    <HistoryItem date={d} />
                  </div>
                </HomeButton>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
