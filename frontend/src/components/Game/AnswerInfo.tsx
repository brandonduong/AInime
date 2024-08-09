import { useParams } from "react-router-dom";
import { AnimeAnswer, RatingAnswer } from "../../routes/Game";
import HomeButton from "../Home/HomeButton";
import { ReactNode } from "react";

export default function AnswerInfo({
  answer,
}: {
  answer: AnimeAnswer | RatingAnswer;
}) {
  const { mode } = useParams();

  function AnimeVotes({
    fake,
    real,
    fakeLabel,
    realLabel,
  }: {
    fake: String;
    real: String;
    fakeLabel: String;
    realLabel: String;
  }) {
    return (
      <div className="flex justify-between gap-4">
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{fake}</h2>
          <p className="text-xs font-bold italic">{fakeLabel}</p>
        </div>
        <div className="border-4 border-pink-900 p-4 w-full">
          <h2 className="text-4xl font-bold italic">{real}</h2>
          <p className="text-xs font-bold italic">{realLabel}</p>
        </div>
      </div>
    );
  }

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <div>
        <AnimeVotes
          fake={answer.aiVotes.toString()}
          real={answer.realVotes.toString()}
          fakeLabel="Voted Fake"
          realLabel="Voted Real"
        />
      </div>
    );
  }

  function RatingAnswer({ answer }: { answer: RatingAnswer }) {
    function calculateAverageScore(scores: number[]) {
      const sum = scores.reduce(
        (part, next, ind) => part + next * (ind / 2 + 0.5),
        0
      );
      const numVotes = scores.reduce((part, next) => part + next, 0);
      return sum / numVotes;
    }

    return (
      <AnimeVotes
        fake={answer.score.toString()}
        real={calculateAverageScore(answer.scores).toFixed(2).toString()}
        fakeLabel="Actual Score"
        realLabel="Average Guess"
      />
    );
  }

  return (
    <div className="w-full">
      {"fake" in answer ? (
        <AnimeAnswer answer={answer} />
      ) : (
        <RatingAnswer answer={answer} />
      )}
    </div>
  );
}
