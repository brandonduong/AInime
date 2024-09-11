import { Link, useLocation, useParams } from "react-router-dom";
import HomeButton from "./HomeButton";
import { History, HistoryItem } from "../Game/AnimeMode";
import { useHistoryState } from "../../store/store";
import { END_DATE, START_DATE } from "../../common/constants";
import Timer from "./Timer";
import { AnimeHidden, RatingHidden, TitleHidden } from "../Game/AnimeStats";
import { ChangeEvent, useEffect, useRef } from "react";
import Upload from "../Icons/Upload";
import Download from "../Icons/Download";
import { downloadBlob } from "../../common/helper";

export default function ArchiveList() {
  const { mode, date } = useParams();

  const [history, setHistory] = useHistoryState();
  const location = useLocation();
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      element?.scrollIntoView();
    }
  }, [location]);

  function getDailyDates(start: Date, end: Date) {
    const dailies = [];
    let startDate = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
    );
    let endDate = new Date(
      Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
    );
    let date = endDate;
    while (date >= startDate && date <= endDate) {
      dailies.push(date.toISOString().split("T")[0]);
      date = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate() - 1
        )
      );
    }
    return dailies;
  }

  function getLength(start: Date, end: Date) {
    let startDate = new Date(
      Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
    );
    let endDate = new Date(
      Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
    );
    let date = endDate;
    let counter = 0;
    while (date >= startDate && date <= endDate) {
      counter += 1;
      date = new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate() - 1
        )
      );
    }
    return counter;
  }

  function HistoryStats() {
    const m = mode ? mode : "anime";
    const guesses = Object.entries(JSON.parse(history)[m as keyof History]) as [
      string,
      HistoryItem & (AnimeHidden | RatingHidden | TitleHidden)
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
            ((g[1] as RatingHidden).options[g[1].guess as number] ===
            g[1].answer
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

  function exportHistory() {
    downloadBlob(
      JSON.stringify(JSON.parse(history)),
      "dailyHistory",
      "text/csv;charset=utf-8;"
    );
  }

  function importHistory(e: ChangeEvent) {
    const file = (e.target as HTMLInputElement).files![0];
    let reader = new FileReader();
    reader.onload = function () {
      const hist = JSON.parse(reader.result as string) as unknown as History;
      setHistory(hist);
      alert("Successfully imported history.");
    };
    reader.readAsText(file);
  }

  function HistoryItem({ date }: { date: string }) {
    function getHistoryItem(date: string) {
      const m = mode ? mode : "anime";
      const guesses = JSON.parse(history)[m as keyof History];
      const g = guesses[date] as HistoryItem &
        (AnimeHidden | RatingHidden | TitleHidden);
      if (g !== undefined) {
        let text = "";
        let correct = false;
        if (m === "anime" || m === "title") {
          text = g.guess ? "FAKE" : "REAL";
          correct = g.answer === g.guess;
        } else if (m === "rating" && "options" in g) {
          text = g.options[g.guess as number].toString();
          correct = g.options[g.guess as number] === g.answer;
        }
        const classname = correct
          ? "text-green-700 dark:text-green-500"
          : "text-red-700 dark:text-red-500";
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
      <h3 className="flex flex-wrap gap-x-4 justify-between text-lg font-bold px-4 py-2 border-b-4 border-pink-900 dark:border-dark-pink-900">
        <span className="flex gap-1 whitespace-nowrap">
          Next Daily In: <Timer countdownTo={new Date()} />
        </span>
        <HistoryStats />
      </h3>
      <div className="overflow-y-auto p-4 gap-4 flex flex-col">
        <div className="flex gap-4">
          <HomeButton onClick={() => fileInput.current?.click()} border>
            <div className="flex justify-center items-center gap-2">
              <Upload /> Import
            </div>
          </HomeButton>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => importHistory(e)}
            hidden
            ref={fileInput}
          />
          <HomeButton onClick={() => exportHistory()} border>
            <div className="flex justify-center items-center gap-2">
              <Download />
              Export
            </div>
          </HomeButton>
        </div>

        {getDailyDates(START_DATE, END_DATE).map((d, ind) => {
          return (
            <Link
              to={`/ainime/${mode ? mode : "anime"}/${d}`}
              key={d}
              id={d}
              className="scroll-m-24"
            >
              <HomeButton border>
                <div className="flex justify-between items-center gap-4">
                  <div className="text-nowrap">
                    <h5 className="text-start">
                      #{getLength(START_DATE, END_DATE) - ind}
                    </h5>
                    <p className="text-black text-xs italic dark:text-gray-300">
                      {d}
                    </p>
                  </div>
                  <HistoryItem date={d} />
                </div>
              </HomeButton>
            </Link>
          );
        })}
      </div>
    </>
  );
}
