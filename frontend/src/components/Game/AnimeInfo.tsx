export type AnimeHidden = {
  date: String;
  oneLiner: String;
  summary: String;
  type: String;
  year: number;
  members: number;
  genres: String[];
  episodes: number;
};

export default function AnimeInfo({ anime }: { anime: AnimeHidden }) {
  return (
    <div>
      <div className="mb-4">
        <div className="md:flex justify-between w-full text-xl font-bold hidden">
          <h3>{anime.type}</h3>
          <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
          <h3>{anime.members} Members</h3>
          <h3>{anime.year}</h3>
        </div>
        <div className="grid grid-cols-2 w-full text-xl font-bold md:hidden">
          <div className="text-start">
            <h3>{anime.type}</h3>
            <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
          </div>
          <div className="text-end">
            <h3>{anime.year}</h3>
            <h3>{anime.members} Members</h3>
          </div>
        </div>
        <h4 className="text-xl font-bold">{anime.genres.join(", ")}</h4>
      </div>

      <div className="text-pretty border-4 border-pink-900 p-4">
        <h2>{anime.oneLiner}</h2>
        <hr className="w-1/2 m-auto border-2 border-pink-900" />
        <h5>{anime.summary}</h5>
      </div>
    </div>
  );
}
