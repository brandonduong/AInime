import axiosConfig from "../api/axiosConfig";
import { History } from "../components/Game/AnimeMode";
import { AnimeAnswer, RatingAnswer } from "../routes/Game";

export function padZero(number: number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}

export async function vote(
  date: string | undefined,
  mode: string | undefined,
  value: boolean | number,
  history: History,
  setHistory: (history: History) => void
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
  const newHistory: History = { ...history };
  if (m === "anime" || m === "title") {
    let temp = { ...newHistory[m] };
    const d = data as AnimeAnswer;
    temp[voteDate] = {
      guess: value as boolean,
      answer: d.fake,
      malId: d.malId,
      name: d.name,
      imgUrl: d.imgUrl,
    };
    newHistory[m] = temp;
  } else if (m === "rating") {
    let temp = { ...newHistory[m] };
    const d = data as RatingAnswer;
    temp[voteDate] = {
      guess: value as number,
      answer: d.score,
      malId: d.malId,
      name: d.name,
      imgUrl: d.imgUrl,
    };
    newHistory[m] = temp;
  }

  setHistory(newHistory);
  return data;
}
