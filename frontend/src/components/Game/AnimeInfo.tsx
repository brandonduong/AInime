import { ReactNode } from "react";

export default function AnimeInfo({
  genres,
  children,
}: {
  genres: string[];
  children: ReactNode;
}) {
  return (
    <div>
      {children}
      <p className="text-xs font-bold italic">
        {genres.length > 0 ? genres.join(", ") : "Unknown Genres"}
      </p>
    </div>
  );
}
