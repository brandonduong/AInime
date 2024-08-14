import { Link, useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { History, HistoryItem } from "../Game/AnimeMode";
import { useHistoryState } from "../../store/store";
import { END_DATE, START_DATE } from "../../common/constants";
import { isCorrectRatingAnswer } from "../../common/helper";
import Timer from "./Timer";

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

  function HistoryStats() {
    const m = mode ? mode : "anime";
    const guesses = Object.entries(JSON.parse(history)[m as keyof History]) as [
      string,
      HistoryItem
    ][];
    let correct;
    if (guesses) {
      if (m === "anime" || m === "title") {
        correct = guesses.reduce(
          (prev, g) =>
            prev +
            ((g[1].answer as boolean) === (g[1].guess as boolean) ? 1 : 0),
          0
        );
      } else if (m === "rating") {
        correct = guesses.reduce(
          (prev, g) =>
            prev +
            (isCorrectRatingAnswer(g[1].guess as number, g[1].answer as number)
              ? 1
              : 0),
          0
        );
      }
    }

    return (
      <div>
        {guesses && (
          <div>
            <h3 className="whitespace-nowrap">
              {correct} / {guesses.length} Correct{" "}
              <span className="text-xs italic">
                ({(((correct || 0) / (guesses.length || 1)) * 100).toFixed(2)}{" "}
                %)
              </span>
            </h3>
          </div>
        )}
      </div>
    );
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
          classname = isCorrectRatingAnswer(
            g.guess as number,
            g.answer as number
          )
            ? "text-green-700"
            : "text-red-700";
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
      <h3 className="flex flex-wrap gap-x-4 justify-between text-lg font-bold text-pink-900 px-4 py-2 bg-pink-300 border-b-4 border-pink-900">
        <span className="flex gap-1 whitespace-nowrap">
          Next Daily In: <Timer countdownTo={new Date()} />
        </span>
        <HistoryStats />
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
