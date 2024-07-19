export type Anime = {
  date: String;
  oneLiner: String;
  summary: String;
  type: String;
  year: number;
  members: number;
  genres: String[];
  episodes: number;
};

export default function AnimeInfo({ anime }: { anime: Anime }) {
  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between w-full text-xl font-bold">
          <h3>{anime.type}</h3>
          <h3>{anime.episodes} Episodes</h3>
          <h3>{anime.members} Members</h3>
          <h3>{anime.year}</h3>
        </div>
        <h4>{anime.genres.join(", ")}</h4>
      </div>

      <div>
        <h2>{anime.oneLiner}</h2>
        <h5>{anime.summary}</h5>
      </div>
    </div>
  );
}
