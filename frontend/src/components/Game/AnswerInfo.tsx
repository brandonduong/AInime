import { AnimeAnswer, RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import Check from "../Icons/Check";
import ChevronRight from "../Icons/ChevronRight";
import { AnimeHidden, RatingHidden, TitleHidden } from "./AnimeStats";

export default function AnswerInfo({
  answer,
  anime,
}: {
  answer: AnimeAnswer | RatingAnswer;
  anime: AnimeHidden | RatingHidden | TitleHidden;
}) {
  function AnimeVotes({
    amount,
    label,
    correct,
  }: {
    amount: number;
    label: string;
    correct?: boolean | undefined;
  }) {
    return (
      <div
        className={`border-4 border-pink-900 p-4 grow ${
          correct !== undefined
            ? correct
              ? "text-green-700"
              : "text-red-700"
            : ""
        }`}
      >
        <h2 className="text-4xl font-bold italic">{amount.toLocaleString()}</h2>
        <p className="text-xs font-bold italic">{label}</p>
      </div>
    );
  }

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <>
        <AnimeVotes
          amount={answer.aiVotes}
          label="Voted Fake"
          correct={
            answer.guess === true ? answer.fake === answer.guess : undefined
          }
        />
        <AnimeVotes
          amount={answer.realVotes}
          label="Voted Real"
          correct={
            answer.guess === false ? answer.fake === answer.guess : undefined
          }
        />
      </>
    );
  }

  function RatingAnswer({
    answer,
    anime,
  }: {
    answer: RatingAnswer;
    anime: RatingHidden;
  }) {
    function borderColor(ind: number) {
      if (
        (answer.guess === ind &&
          answer.guess === anime.options.indexOf(answer.score)) ||
        anime.options.indexOf(answer.score) === ind
      ) {
        return "border-green-800";
      } else {
        return "border-pink-900";
      }
    }

    return (
      <>
        {answer.scores.map((s, ind) => (
          <AnimeVotes
            amount={s}
            label={`Voted ${anime.options[ind].toString()}`}
            correct={anime.options.indexOf(answer.score) === ind}
          />
        ))}
      </>
    );
  }

  return (
    <div className="flex justify-between gap-4 flex-wrap">
      {"fake" in answer && <AnimeAnswer answer={answer} />}
      {"score" in answer && "options" in anime && (
        <RatingAnswer answer={answer} anime={anime} />
      )}
    </div>
  );
}
