import axiosConfig from "../api/axiosConfig";
import { History } from "../components/Game/AnimeMode";
import { AnimeAnswer, RatingAnswer } from "../routes/Game";

export function padZero(number: number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}

export function getHistory() {
  const history = localStorage.getItem("history");
  return history
    ? JSON.parse(history)
    : ({ anime: {}, rating: {}, title: {} } as History);
}

export async function vote(
  date: string | undefined,
  mode: string | undefined,
  value: boolean | number
) {
  const today = new Date();
  const voteDate =
    date ||
    `${today.getUTCFullYear()}-${padZero(today.getUTCMonth() + 1)}-${padZero(
      today.getUTCDate()
    )}`;
  const m = mode || "anime";
  const endpoint = `/${m}/${voteDate}`;
  const payload =
    m === "anime" || m === "title" ? { fake: value } : { score: value };

  const res = await axiosConfig.patch(endpoint, payload);

  const data: AnimeAnswer | RatingAnswer = res.data;
  // Save guess and answer to local storage
  const newHistory: History = getHistory();
  if (m === "anime" || m === "title") {
    let temp = { ...newHistory[m] };
    temp[voteDate] = {
      guess: value as boolean,
      answer: (data as AnimeAnswer).fake,
    };
    newHistory[m] = temp;
  } else if (m === "rating") {
    let temp = { ...newHistory[m] };
    temp[voteDate] = {
      guess: value as number,
      answer: (data as RatingAnswer).score,
    };
    newHistory[m] = temp;
  }

  localStorage.setItem("history", JSON.stringify(newHistory));
  return data;
}
