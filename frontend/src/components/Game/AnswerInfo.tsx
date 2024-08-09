import { isCorrectRatingAnswer } from "../../common/helper";
import { AnimeAnswer, RatingAnswer } from "../../routes/Game";

export default function AnswerInfo({
  answer,
}: {
  answer: AnimeAnswer | RatingAnswer;
}) {
  function AnimeVotes({
    amount,
    label,
    correct,
  }: {
    amount: string;
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
        <h2 className="text-4xl font-bold italic">{amount}</h2>
        <p className="text-xs font-bold italic">{label}</p>
      </div>
    );
  }

  function AnimeAnswer({ answer }: { answer: AnimeAnswer }) {
    return (
      <>
        <AnimeVotes
          amount={answer.aiVotes.toString()}
          label="Voted Fake"
          correct={
            answer.guess === true ? answer.fake === answer.guess : undefined
          }
        />
        <AnimeVotes
          amount={answer.realVotes.toString()}
          label="Voted Real"
          correct={
            answer.guess === false ? answer.fake === answer.guess : undefined
          }
        />
      </>
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
      <>
        <AnimeVotes amount={answer.score.toString()} label="Actual Score" />
        <AnimeVotes
          amount={answer.guess.toString()}
          label="Guessed Score"
          correct={isCorrectRatingAnswer(answer.guess, answer.score)}
        />
        <AnimeVotes
          amount={calculateAverageScore(answer.scores).toFixed(2).toString()}
          label="Average Guess"
        />
      </>
    );
  }

  return (
    <div className="flex justify-between gap-4 flex-wrap">
      {"fake" in answer ? (
        <AnimeAnswer answer={answer} />
      ) : (
        <RatingAnswer answer={answer} />
      )}
    </div>
  );
}
