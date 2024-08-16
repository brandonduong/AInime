import axiosConfig from "../api/axiosConfig";
import { History } from "../components/Game/AnimeMode";
import {
  AnimeHidden,
  RatingHidden,
  TitleHidden,
} from "../components/Game/AnimeStats";
import { AnimeAnswer, RatingAnswer } from "../routes/Game";

export function padZero(number: number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}

export function getTodayDate() {
  const today = new Date();
  return parseDate(today);
}

export function prevDay(date: Date) {
  date.setUTCDate(date.getUTCDate() - 1);
  return parseDate(date);
}

export function nextDay(date: Date) {
  date.setUTCDate(date.getUTCDate() + 1);
  return parseDate(date);
}

export function parseDate(date: Date) {
  return `${date.getUTCFullYear()}-${padZero(date.getUTCMonth() + 1)}-${padZero(
    date.getUTCDate()
  )}`;
}

export function isArchive(mode: string | undefined, date: string | undefined) {
  return mode && !date;
}

export async function vote(
  date: string | undefined,
  mode: string | undefined,
  value: boolean | number,
  history: History,
  setHistory: (history: History) => void,
  anime: AnimeHidden | RatingHidden | TitleHidden
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
    m === "anime" || m === "title" ? { fake: value } : { ind: value };

  const res = await axiosConfig.patch(endpoint, payload);

  const data: AnimeAnswer | RatingAnswer = res.data;
  // Save guess and answer to local storage
  const newHistory: History = { ...history };
  const common = {
    malId: data.malId,
    name: data.name,
    imgUrl: data.imgUrl,
    members: anime.members,
    genres: anime.genres,
    type: anime.type,
  };
  if (m === "anime") {
    const d = data as AnimeAnswer;
    const a = anime as AnimeHidden;
    let temp = { ...newHistory[m] };
    temp[voteDate] = {
      ...common,
      guess: value as boolean,
      answer: d.fake,
      oneLiner: a.oneLiner,
      summary: a.summary,
      year: a.year,
      episodes: a.episodes,
      score: a.score,
    };
    newHistory[m] = temp;
    data["guess"] = value as boolean;
  } else if (m === "rating") {
    let temp = { ...newHistory[m] };
    const d = data as RatingAnswer;
    const a = anime as RatingHidden;
    temp[voteDate] = {
      ...common,
      guess: value as number,
      answer: d.score,
      oneLiner: a.oneLiner,
      summary: a.summary,
      year: a.year,
      episodes: a.episodes,
      options: a.options,
    };
    newHistory[m] = temp;
    data["guess"] = value as number;
  } else if (m === "title") {
    let temp = { ...newHistory[m] };
    const d = data as AnimeAnswer;
    const a = anime as TitleHidden;
    temp[voteDate] = {
      ...common,
      guess: value as boolean,
      answer: d.fake,
      score: a.score,
      published: a.published,
      title: a.title,
      chapters: a.chapters,
      volumes: a.volumes,
    };
    newHistory[m] = temp;
    data["guess"] = value as boolean;
  }

  setHistory(newHistory);
  return data;
}
