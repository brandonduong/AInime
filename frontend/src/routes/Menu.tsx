import { Link, useNavigation } from "react-router-dom";
import { getTodayDate } from "../common/helper";
import HomeButton from "../components/Home/HomeButton";
import Heart from "../components/Icons/Heart";
import TV from "../components/Icons/TV";
import Question from "../components/Icons/Question";
import Loading from "../components/Home/Loading";

export default function Menu() {
  const { state } = useNavigation();

  return (
    <>
      <div className="flex relative mb-1 justify-between items-end">
        <div className="flex gap-1">
          <img
            src="logo.png"
            width={40}
            height={40}
            className="border-4 border-pink-900"
            alt="aiguess"
          />
          <h1 className="text-4xl font-black text-pink-900">
            AI<span className="text-pink-400">Guess</span>
          </h1>
        </div>
        <div className="flex items-end gap-1">
          <div className="font-bold italic text-lg">
            <h5 className="underline">{getTodayDate()}</h5>
          </div>
          <div className="border-4 border-pink-900 rounded-full">
            <a
              href="https://ko-fi.com/brandonduong"
              target="_blank"
              rel="noreferrer"
            >
              <HomeButton icon={true}>
                <Heart />
              </HomeButton>
            </a>
          </div>
        </div>
      </div>

      <div className="border-4 border-pink-900 grow overflow-hidden">
        <div className="flex flex-col h-full justify-between overflow-y-auto">
          {state !== "loading" ? (
            <>
              <h3 className="flex flex-wrap gap-x-4 justify-between text-lg font-bold text-pink-900 px-4 py-2 bg-pink-300 border-b-4 border-pink-900">
                <span className="flex gap-1 whitespace-nowrap">
                  Choose Theme:
                </span>
              </h3>
              <div className="p-4 gap-4 grid grow">
                <Link to={`/ainime`}>
                  <div className="border-4 border-pink-900 h-full">
                    <HomeButton>
                      <div className="flex justify-center">
                        <div className="flex-col md:flex-row flex items-center gap-2 md:basis-1/2">
                          <div className="size-10 min-w-10 min-h-10">
                            <TV />
                          </div>
                          <div className="md:text-start">
                            <h5>AInime</h5>
                            <div className="text-sm">
                              <p className="text-black text-xs italic text-pretty">
                                Real vs AI-generated anime plot and manga/light
                                novel titles
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HomeButton>
                  </div>
                </Link>

                {[1, 2, 3].map((id) => (
                  <div
                    className="border-4 border-pink-900 grow"
                    key={`theme-${id}`}
                  >
                    <HomeButton disabled>
                      <div className="flex justify-center">
                        <div className="flex-col md:flex-row flex items-center gap-2 md:basis-1/2">
                          <div className="size-10 min-w-10 min-h-10">
                            <Question />
                          </div>
                          <div className="md:text-start">
                            <h5>???</h5>
                            <div className="text-sm">
                              <p className="text-black text-xs italic">
                                New themes coming soon!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HomeButton>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
