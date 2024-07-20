import { Anime } from "../../routes/Game";

export default function AnswerInfo({ answer }: { answer: Anime }) {
  return (
    <div>
      {answer.fake ? (
        <div>fake</div>
      ) : (
        <div>
          real
          <h5>
            <a
              href={`https://myanimelist.net/anime/${answer.malId}`}
              target="_blank"
              rel="noreferrer"
            >
              MyAnimeList
            </a>
          </h5>
          <h5>{answer.score}</h5>
          <img src={answer.imgUrl.toString()} alt={answer.imgUrl.toString()} />
        </div>
      )}
      <div>
        <h5>{answer.name}</h5>
        <h5>fake votes: {answer.aiVotes}</h5>
        <h5>real votes: {answer.realVotes}</h5>
        <h5>{answer.scores}</h5>
      </div>
    </div>
  );
}
