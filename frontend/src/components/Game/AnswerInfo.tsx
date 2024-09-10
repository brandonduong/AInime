import { AnimeAnswer, RatingAnswer } from "../../routes/Game";
import CustomBorder from "../Home/CustomBorder";
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
      <CustomBorder grow>
        <div
          className={`p-4 ${
            correct !== undefined
              ? correct
                ? "text-green-700"
                : "text-red-700"
              : ""
          }`}
        >
          <h2 className="text-4xl font-bold italic">
            {amount.toLocaleString()}
          </h2>
          <p className="text-xs font-bold italic">{label}</p>
        </div>
      </CustomBorder>
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
    return (
      <>
        {answer.scores.map((s, ind) => (
          <AnimeVotes
            key={`votes-${ind}`}
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
