import { useLoaderData } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { padZero } from "../common/helper";

export default function Game() {
  const anime = useLoaderData();
  console.log(anime);
  return <div>game</div>;
}

export async function todayLoader() {
  const today = new Date();
  const anime = await axiosConfig.get(
    `/daily/${today.getUTCFullYear()}-${padZero(
      today.getUTCMonth() + 1
    )}-${padZero(today.getUTCDate())}`
  );
  return anime.data;
}
