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
          <div className="md:flex justify-between w-full text-lg font-bold hidden gap-x-8 items-center">
            <h3>{anime.type}</h3>
            <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
            <h3>{anime.members} Members</h3>
            {"score" in anime && (
              <h3 className="text-nowrap">{anime.score} / 10</h3>
            )}
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
              {"score" in anime && (
                <h3 className="text-nowrap">{anime.score} / 10</h3>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="uppercase font-bold">{anime.oneLiner}</h2>
          <h5>{anime.summary}</h5>
          <p className="text-xs font-bold italic">
            {anime.genres.length > 0
              ? anime.genres.join(", ")
              : "Unknown Genres"}
          </p>
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
          <div className="xl:flex justify-between items-center w-full text-lg font-bold hidden gap-x-8">
            <h3>{anime.type}</h3>
            <h3>{anime.volumes !== null ? anime.volumes : "?"} Volumes</h3>
            <h3>{anime.chapters !== null ? anime.chapters : "?"} Chapters</h3>
            <h3>{anime.members} Members</h3>
            {"score" in anime && (
              <h3 className="text-nowrap">{anime.score} / 10</h3>
            )}
            <h3 className="text-nowrap">
              {parseYearFromPublished(anime.published)}
            </h3>
          </div>
          <div className="grid grid-cols-2 w-full text-lg font-bold xl:hidden">
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
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{anime.title}</h2>
          <p className="text-xs font-bold italic">
            {anime.genres.length > 0
              ? anime.genres.join(", ")
              : "Unknown Genres"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-pretty">
        {"published" in anime ? (
          <MangaHiddenInfo anime={anime} />
        ) : (
          <AnimeHiddenInfo anime={anime} />
        )}
      </div>
    </div>
  );
}
