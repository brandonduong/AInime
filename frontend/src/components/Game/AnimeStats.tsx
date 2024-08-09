export type AnimeHidden = RatingHidden & {
  score: number;
};

export type RatingHidden = CommonStats & {
  oneLiner: string;
  summary: string;
  year: number;
  episodes: number;
};

export type TitleHidden = CommonStats & {
  published: string;
  score: number;
  title: string;
  chapters: number;
  volumes: number;
};

export type CommonStats = {
  members: number;
  genres: string[];
  type: string;
};

export default function AnimeStats({
  anime,
}: {
  anime: AnimeHidden | RatingHidden | TitleHidden;
}) {
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

  function YearStat() {
    return (
      <>
        {"oneLiner" in anime ? (
          <h3>{anime.year}</h3>
        ) : (
          <h3 className="text-nowrap">
            {parseYearFromPublished(anime.published)}
          </h3>
        )}
      </>
    );
  }

  function ScoreStat() {
    return (
      <>
        {"score" in anime && (
          <h3 className="text-nowrap">
            {anime.score ? anime.score : "?"} / 10
          </h3>
        )}
      </>
    );
  }

  function AmountStat() {
    return (
      <>
        {"oneLiner" in anime ? (
          <h3>{anime.episodes !== null ? anime.episodes : "?"} Episodes</h3>
        ) : (
          <>
            <h3>{anime.volumes !== null ? anime.volumes : "?"} Volumes</h3>
            <h3>{anime.chapters !== null ? anime.chapters : "?"} Chapters</h3>
          </>
        )}
      </>
    );
  }

  return (
    <div className="border-b-4 border-pink-900 px-4 py-2 bg-pink-300">
      <div className="md:flex justify-between w-full text-lg font-bold hidden gap-x-8 items-center">
        <h3>{anime.type}</h3>
        <AmountStat />
        <h3>{anime.members.toLocaleString()} Members</h3>
        <ScoreStat />
        <YearStat />
      </div>
      <div className="grid grid-cols-2 w-full text-lg font-bold md:hidden">
        <div className="text-start">
          <h3>{anime.type}</h3>
          <AmountStat />
        </div>
        <div className="text-end">
          <YearStat />
          <h3>{anime.members.toLocaleString()} Members</h3>
          <ScoreStat />
        </div>
      </div>
    </div>
  );
}
