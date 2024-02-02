import React, { useLayoutEffect, useMemo, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiInbox2Line } from "react-icons/ri";
import { SiGoogleanalytics } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

import { format, formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import Pagination from "components/Pagination";
import { JassRow } from "./PlayJass";
import { JASS_LOCAL_STORAGE_KEYS } from "./PlayJass.constants";
import { calculateTotalPoints, calculateTotalRoem } from "./PlayJass.helpers";

type HistoryInstance = {
  game: JassRow[];
  date: string;
};

export const History = () => {
  const [games, setGames] = useState<HistoryInstance[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const PageSize = 3;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return games?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, games]);

  useLayoutEffect(() => {
    const retrieved = localStorage.getItem(JASS_LOCAL_STORAGE_KEYS.HISTORY);

    if (retrieved) {
      const parsed = JSON.parse(retrieved) as HistoryInstance[];
      parsed.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setGames(parsed);
    }
  }, []);
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };
  const formatDateUntillNow = (dateString: string) => {
    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };
    const date = new Date(dateString);
    const today = new Date();
    if (isSameDay(date, today)) {
      return format(date, "HH:mm");
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: nl });
    }
  };

  const handlePlay = (game: HistoryInstance) => {
    navigate("/klaver/play/" + btoa(JSON.stringify(game.game)));
  };

  const handleAnalytics = (game: HistoryInstance) => {
    navigate("/klaver/analytics/" + btoa(JSON.stringify(game.game)));
  };

  const handleDelete = (game: HistoryInstance, index: number) => {
    const updatedGames = [...(games ?? [])];
    updatedGames.splice(index, 1);

    setGames(updatedGames);
    localStorage.setItem(
      JASS_LOCAL_STORAGE_KEYS.HISTORY,
      JSON.stringify(updatedGames)
    );
  };

  if (!games || games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <RiInbox2Line size="60vh" color="rgba(255, 255, 255, 0.5)" />
        <p className="mt-4 text-center text-lg text-white">
          No history found.{" "}
          <Link to="/klaver/play" className="text-blue-500 hover:underline">
            Start a game
          </Link>{" "}
          now!
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-auto p-2 pb-10 md:px-5 lg:px-16">
      <table className="w-full table-fixed text-left text-sm text-gray-400 sm:table-auto">
        <thead className="bg-gray-700 text-xs uppercase text-gray-300 max-sm:absolute max-sm:m-[-1px] max-sm:h-[1px] max-sm:w-[1px] max-sm:overflow-hidden">
          <tr>
            <th scope="col" className="w-2 rounded-tl-md px-6 py-3 text-center">
              Datum
            </th>
            <th scope="col" className="w-4 px-6 py-3 text-center">
              Teams
            </th>
            <th scope="col" className="w-4 px-6 py-3 text-center">
              Totaal roem
            </th>
            <th scope="col" className="w-4 px-6 py-3 text-center">
              Totaal punten
            </th>
            <th
              scope="col"
              className="w-2 rounded-tr-md text-right sm:px-6 sm:py-3"
            ></th>
          </tr>
        </thead>
        <tbody>
          {currentTableData?.map((game, index) => {
            const teamA = game.game[0];
            const teamB = game.game[1];

            const teamAwon =
              calculateTotalPoints(game.game, true) >
              calculateTotalPoints(game.game, false);

            return (
              <tr
                className="border-b text-center odd:border-gray-700 odd:bg-gray-800 even:border-gray-700 even:bg-gray-900 max-sm:block"
                key={`${game.date}${index}`}
              >
                <td
                  data-label="Datum"
                  className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
                >
                  {formatDate(game.date)} ({formatDateUntillNow(game.date)})
                </td>

                <td
                  data-label="Team"
                  className="whitespace-pre-wrap px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
                >
                  <p className={teamAwon ? "text-green-500" : "text-red-500"}>
                    {teamA.teamName}{" "}
                  </p>
                  vs
                  <p className={!teamAwon ? "text-green-500" : "text-red-500"}>
                    {" "}
                    {teamB.teamName}
                  </p>
                </td>
                <td
                  data-label="Totaal roem"
                  className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
                >
                  {calculateTotalRoem(game.game, true)} -{" "}
                  {calculateTotalRoem(game.game, false)}
                </td>

                <td
                  data-label="Totaal points"
                  className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
                >
                  {calculateTotalPoints(game.game, true)} -{" "}
                  {calculateTotalPoints(game.game, false)}
                </td>

                <td className="px-6 py-4 max-sm:flex max-sm:before:mr-auto">
                  <div className="flex  items-center justify-center gap-4">
                    <IoPlaySharp
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handlePlay(game)}
                    />
                    <SiGoogleanalytics
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleAnalytics(game)}
                    />
                    <MdDelete
                      size={20}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleDelete(game, index)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={games.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
