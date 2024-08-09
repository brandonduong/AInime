import axiosConfig from "../api/axiosConfig";
import { History } from "../components/Game/AnimeMode";
import { AnimeAnswer, RatingAnswer } from "../routes/Game";

export function padZero(number: number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}

export function getTodayDate() {
  const today = new Date();
  return `${today.getUTCFullYear()}-${padZero(
    today.getUTCMonth() + 1
  )}-${padZero(today.getUTCDate())}`;
}

function roundHalf(num: number) {
  return Math.round(num * 2) / 2;
}

export function isCorrectRatingAnswer(guess: number, answer: number) {
  return roundHalf(answer) === guess;
}

export function isArchive(mode: string | undefined, date: string | undefined) {
  return mode && !date;
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
    data["guess"] = value as boolean;
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
    data["guess"] = value as number;
  }

  setHistory(newHistory);
  return data;
}
