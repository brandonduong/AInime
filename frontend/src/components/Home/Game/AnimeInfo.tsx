export type Anime = {
  date: String;
  oneLiner: String;
  summary: String;
  type: String;
  year: number;
  score: number;
  members: number;
  genres: String[];
};

export default function AnimeInfo({ anime }: { anime: Anime }) {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3>{anime.score}</h3>
          <h3>{anime.members}</h3>
        </div>
        <div>
          <h3>{anime.year}</h3>
          <h3>{anime.type}</h3>
        </div>
      </div>
      <h4>{anime.genres}</h4>
      <h2>{anime.oneLiner}</h2>
      <h5>{anime.summary}</h5>
    </div>
  );
}
