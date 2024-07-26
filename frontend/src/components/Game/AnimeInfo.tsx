export type AnimeHidden = {
  oneLiner: String;
  summary: String;
  type: String;
  year: number;
  members: number;
  genres: String[];
  episodes: number;
  score: number;
};

export type RatingHidden = {
  oneLiner: String;
  summary: String;
  type: String;
  year: number;
  members: number;
  genres: String[];
  episodes: number;
};

export type TitleHidden = {
  type: String;
  published: String;
  score: number;
  members: number;
  genres: String[];
  title: String;
  chapters: number;
  volumes: number;
};

export default function AnimeInfo({
  anime,
}: {
  anime: AnimeHidden | RatingHidden | TitleHidden;
}) {
  function AnimeHiddenInfo({ anime }: { anime: AnimeHidden | RatingHidden }) {
    return (
      <div>
        <div className="border-b-4 border-pink-900 px-4 py-2">
          <div className="md:flex justify-between w-full text-lg font-bold hidden gap-x-8 flex-wrap">
            <h3>{anime.type}</h3>
            <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
            {"score" in anime && <h3>{anime.score} / 10</h3>}
            <h3>{anime.members} Members</h3>
            <h3>{anime.year}</h3>
          </div>
          <div className="grid grid-cols-2 w-full text-lg font-bold md:hidden">
            <div className="text-start">
              <h3>{anime.type}</h3>
              <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
            </div>
            <div className="text-end">
              <h3>{anime.year}</h3>
              <h3>{anime.members} Members</h3>
            </div>
          </div>
          <h4 className="text-lg font-bold">
            {anime.genres.length > 0
              ? anime.genres.join(", ")
              : "Unknown Genres"}
          </h4>
        </div>

        <div className="p-4">
          <h2 className="uppercase font-bold">{anime.oneLiner}</h2>
          <h5>{anime.summary}</h5>
        </div>
      </div>
    );
  }

  function MangaHiddenInfo({ anime }: { anime: TitleHidden }) {
    function parseYearFromPublished(published: String) {
      const sep = published.split("to");
      const first = new Date(sep[0]).getFullYear();
      const sec = new Date(sep[1]).getFullYear();
      if (first && sec) {
        return `${first} - ${sec}`;
      } else if (first) {
        return first;
      } else if (sec) {
        return sec;
      } else {
        return "Unknown Year";
      }
    }

    return (
      <div>
        <div className="border-b-4 border-pink-900 px-4 py-2">
          <div className="md:flex justify-between w-full text-lg font-bold hidden gap-x-8 flex-wrap">
            <h3>{anime.type}</h3>
            <h3>{anime.volumes !== null ? anime.volumes : "?"} Volumes</h3>
            <h3>{anime.chapters !== null ? anime.chapters : "?"} Chapters</h3>
            <h3>{anime.members} Members</h3>
            <h3>{parseYearFromPublished(anime.published)}</h3>
            {"score" in anime && <h3>{anime.score} / 10</h3>}
          </div>
          <div className="grid grid-cols-2 w-full text-lg font-bold md:hidden">
            <div className="text-start">
              <h3>{anime.type}</h3>
              <h3>{anime.volumes !== null ? anime.volumes : "?"} Volumes</h3>
              <h3>{anime.chapters !== null ? anime.chapters : "?"} Chapters</h3>
            </div>
            <div className="text-end">
              <h3>{parseYearFromPublished(anime.published)}</h3>
              <h3>{anime.members} Members</h3>
              {"score" in anime && <h3>{anime.score} / 10</h3>}
            </div>
          </div>
          <h4 className="text-lg font-bold">
            {anime.genres.length > 0
              ? anime.genres.join(", ")
              : "Unknown Genre"}
          </h4>
        </div>
        <div className="p-4">
          <h2 className="text-4xl font-bold">{anime.title}</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-pretty border-4 border-pink-900">
        {"published" in anime ? (
          <MangaHiddenInfo anime={anime} />
        ) : (
          <AnimeHiddenInfo anime={anime} />
        )}
      </div>
    </div>
  );
}
