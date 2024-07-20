import { Anime } from "../../routes/Game";

export default function AnswerInfo({ answer }: { answer: Anime }) {
  return <div>{answer.malId}</div>;
}
