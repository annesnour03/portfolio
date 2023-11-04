import * as Dialog from "@radix-ui/react-dialog";
import React, { Fragment, useEffect, useState } from "react";

import { clamp } from "helpers/General";
import { calculatePoints, calculateRoem } from "./helpers";

const NO_GAMES = 16;
export const RoemValues = {
  KING_QUEEN: 20,
  THREE_IN_ROW: 20,
  FOUR_IN_ROW: 50,
  FOUR_THE_SAME: 100,
  ALL_HITS: 100,
} as const;
export type RoemKeys = keyof typeof RoemValues;

const RoemTrans: { [_ in RoemKeys]: string } = {
  THREE_IN_ROW: "Drie op eenvolgend",
  FOUR_IN_ROW: "Vier op eenvolgend",
  KING_QUEEN: "De koning + koningin",
  FOUR_THE_SAME: "Vier dezelfde kaarten",
  ALL_HITS: "Alle slagen behaald",
};
export type RoemCount = { [_ in RoemKeys]: number };
export type JassRow = {
  teamName: string;
  roemCounter: RoemCount;
  points?: number;
  lastHit: boolean;
};
const FillInRoemPopOver = ({
  open,
  closePopOver,
  currentHitId,
  game,
  setCurrentHit,
}: {
  open: boolean;
  closePopOver: () => void;
  currentHitId: number | null;
  game: JassRow[];
  setCurrentHit: React.Dispatch<React.SetStateAction<JassRow[]>>;
}) => {
  if (currentHitId === null) return <></>;
  const currentHit = game[currentHitId];
  const _alterValue = (type: RoemKeys, value: number) => {
    const currentGame = { ...currentHit };
    currentGame.roemCounter[type] = clamp(
      currentGame.roemCounter[type] + value,
      0,
      5
    );
    setCurrentHit((game) => {
      const shallowGame = [...game];
      if (currentHitId) shallowGame[currentHitId] = currentGame;
      return shallowGame;
    });
  };

  const increment = (type: RoemKeys) => {
    _alterValue(type, 1);
  };
  const decrement = (type: RoemKeys) => {
    _alterValue(type, -1);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        closePopOver();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 mb-3 text-xl font-medium">
            Roem invullen voor {currentHit.teamName}
          </Dialog.Title>
          <div className="flex flex-col gap-2">
            {(Object.keys(RoemTrans) as (keyof typeof RoemTrans)[]).map(
              (name) => (
                <div className="flex" key={name}>
                  <p className="text-lg">{RoemTrans[name]}</p>
                  <div className="ml-auto flex gap-5">
                    <button
                      className="aspect-square h-8 rounded bg-red-100 shadow-2xl"
                      onClick={() => decrement(name)}
                    >
                      -
                    </button>
                    <p className="text-xl">{currentHit?.roemCounter[name]}</p>
                    <button
                      className="aspect-square h-8 rounded bg-green-100 shadow-2xl"
                      onClick={() => increment(name)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="mt-[20px] flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-400 px-[15px] font-medium leading-none text-green-900 focus:shadow-[0_0_0_2px] focus:outline-none">
                Opslaan
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
const PlayJass = (props: {}) => {
  const [game, setGame] = useState<JassRow[]>(getNewObjects());

  function getTeamNames(game?: JassRow[]) {
    const teamNameA = game !== undefined ? game[0].teamName : "Team A";
    const teamNameB = game !== undefined ? game[1].teamName : "Team B";
    return [teamNameA, teamNameB] as const;
  }

  function getNewObjects(game?: JassRow[]) {
    const [teamNameA, teamNameB] = getTeamNames(game);
    const teamA: JassRow = {
      teamName: teamNameA,
      roemCounter: {
        ALL_HITS: 0,
        FOUR_IN_ROW: 0,
        FOUR_THE_SAME: 0,
        KING_QUEEN: 0,
        THREE_IN_ROW: 0,
      },
      lastHit: false,
    };

    const teamB: JassRow = {
      teamName: teamNameB,
      roemCounter: {
        ALL_HITS: 0,
        FOUR_IN_ROW: 0,
        FOUR_THE_SAME: 0,
        KING_QUEEN: 0,
        THREE_IN_ROW: 0,
      },
      lastHit: false,
    };
    return [teamA, teamB];
  }
  const lastGameFilledIn =
    game.at(-1)?.points !== undefined || game.at(-2)?.points !== undefined;
  const [modalState, setModalState] = useState<{
    open: boolean;
    selectedId: number | null;
  }>({
    open: false,
    selectedId: null,
  });

  const totalPointsA = game
    .filter((localGame) => localGame.teamName === getTeamNames(game)[0])
    .map(calculatePoints)
    .reduce((acc, a) => acc + a, 0);
  const totalPointsB = game
    .filter((localGame) => localGame.teamName === getTeamNames(game)[1])
    .map(calculatePoints)
    .reduce((acc, a) => acc + a, 0);
  const addNewHitData = () => {
    setGame((game) => [...game, ...getNewObjects(game)]);
  };

  const getRoemCountFormatted = (roemCounter: RoemCount): string => {
    const roem = (
      Object.keys(roemCounter) as (keyof typeof roemCounter)[]
    ).reduce(
      (acc, type) => {
        const count = roemCounter[type];
        const value = RoemValues[type];
        if (count === 0) return acc;
        if (count === 1) return [...acc, value.toString()];
        else return [...acc, `${count} * ${value} `];
      },

      [] as string[]
    );
    return `${roem.join(" + ")} (${calculateRoem(roemCounter)})`;
  };

  const updateScore = (value: number, id: number) => {
    const _adjust = (value: number | undefined, id: number) => {
      // Update own game
      const shallowGame = [...game];
      const ownGame = { ...game[id] };
      ownGame.points = value;
      shallowGame[id] = ownGame;

      // Update teams game
      const counterPartId = id ^ 1; // xor to get counterpart
      const counterPartGame = { ...game[counterPartId] };

      counterPartGame.points = value !== undefined ? 152 - value : undefined;
      shallowGame[counterPartId] = counterPartGame;
      setGame(shallowGame);
    };
    // When the user removes input, it becomes NaN
    if (isNaN(value)) {
      _adjust(undefined, id);
      return;
    }
    value = Math.min(152, Math.max(0, value));
    _adjust(value, id);
  };

  const updateLastHit = (value: boolean, id: number) => {
    const shallowGame = [...game];

    const counterPartId = id ^ 1; // xor to get counterpart
    const counterPartGame = { ...game[counterPartId] };
    // Only one party can have the last hit
    if (counterPartGame.lastHit) return;

    const ownGame = { ...game[id] };
    ownGame.lastHit = value;
    shallowGame[id] = ownGame;
    setGame(shallowGame);
  };

  // Adjust the team name of a single team for all instances in the game.
  // We get the id to find out wether it is the first or second team.
  const adjustTeamNames = (newName: string | null, teamIdx: number): void => {
    const shallowGame = [...game];
    const newGame = shallowGame.map((row, idx) => {
      const isSameTeam = idx % 2 === teamIdx % 2;
      if (!isSameTeam) return row;
      row.teamName = newName ?? "";
      return row;
    });
    setGame(newGame);
  };

  useEffect(() => {
    // After we adjusted, we add a new game
    if (game.length < NO_GAMES && lastGameFilledIn) addNewHitData();
  }, [game]);

  return (
    <div>
      <div className="relative overflow-auto p-2 pb-10 shadow-md sm:rounded-xl">
        <table className="w-full text-left   text-sm  text-gray-400">
          <thead className="bg-gray-700   text-xs uppercase text-gray-300">
            <tr>
              <th scope="col" className="rounded-tl-md px-6 py-3 text-center">
                -
              </th>
              <th scope="col" className="px-6 py-3">
                Teams
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Roem
              </th>
              <th></th>
              <th scope="col" className="px-6 py-3 text-center">
                Punten
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Laatste slag
              </th>
              <th scope="col" className="rounded-tr-md px-6 py-3">
                Totaal
              </th>
            </tr>
          </thead>
          <tbody>
            {game.map((hitInfo, idx) => {
              const isEven = idx % 2 == 0;

              return (
                <Fragment key={idx}>
                  <tr className="border-b text-center odd:border-gray-700 odd:bg-gray-800 even:mb-10 even:border-gray-700 even:bg-gray-900">
                    {idx % 2 === 0 && (
                      <td
                        className="whitespace-nowrap bg-gray-700 px-6 py-4  font-medium text-white"
                        rowSpan={2}
                      >
                        {(idx + 2) / 2}
                      </td>
                    )}
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-left font-medium text-white"
                    >
                      {idx <= 1 && (
                        <input
                          title="teanName"
                          onChange={(e) => adjustTeamNames(e.target.value, idx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Prevent the default behavior of Enter (e.g., creating a new line)
                              e.currentTarget.blur(); // Blur the div to lose focus
                            }
                          }}
                          type="text"
                          value={hitInfo.teamName}
                          autoCorrect="false"
                          spellCheck="false"
                          style={{
                            width: `calc(${hitInfo.teamName.length}ex + 1rem)`,
                          }} // Use 'ch' instead of 'em'
                          className="max-w-sm select-none border-none bg-transparent font-medium text-white underline underline-offset-2 outline-none"
                        />
                      )}
                      {idx > 1 && (
                        <p className="max-w-sm overflow-hidden">
                          {hitInfo.teamName}
                        </p>
                      )}
                    </th>
                    <td className="px-6 py-4">
                      {getRoemCountFormatted(hitInfo.roemCounter)}
                    </td>
                    <td>
                      <div
                        className="relative cursor-pointer"
                        onClick={() =>
                          setModalState({
                            selectedId: idx,
                            open: true,
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* Enter points */}
                      <input
                        type="number"
                        title="Value"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          updateScore(parseInt(event.target.value), idx);
                        }}
                        value={hitInfo?.points ?? ""}
                        className={`${
                          isEven
                            ? "border-gray-700 bg-gray-900"
                            : "border-gray-700 bg-gray-800"
                        } box w-fit max-w-[3rem] select-none rounded border-none p-1 text-center outline-none
                          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      ></input>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <input
                          title="lastHit"
                          id="default-checkbox"
                          type="checkbox"
                          onChange={(event) =>
                            updateLastHit(event.target.checked, idx)
                          }
                          checked={hitInfo.lastHit}
                          className="h-4 w-4 select-none rounded border-none border-gray-600 bg-gray-700 text-blue-600 outline-none ring-offset-gray-800 focus:ring-0 focus:ring-blue-600"
                        ></input>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{calculatePoints(hitInfo)}</p>
                    </td>
                  </tr>
                  {/* Spacing without altering the even/odd */}
                  {!isEven && (
                    <>
                      <tr>
                        <td height="10px"></td>
                      </tr>
                      <tr>
                        <td height="10px"></td>
                      </tr>
                    </>
                  )}
                </Fragment>
              );
            })}
            <tr>
              <td height="30px"></td>
            </tr>
            {/* Display the total */}
            <tr className="border-b odd:border-gray-700 odd:bg-gray-800 even:mb-10 even:border-gray-700 even:bg-gray-900">
              <td
                className="whitespace-nowrap bg-gray-700 px-6 py-4 text-center  font-medium text-white"
                rowSpan={2}
              >
                Total
              </td>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                {game[0].teamName}
              </th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">{totalPointsA}</td>
            </tr>
            <tr className="border-b odd:border-gray-700 odd:bg-gray-800 even:mb-10 even:border-gray-700 even:bg-gray-900">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-white"
              >
                {game[1].teamName}
              </th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">{totalPointsB}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FillInRoemPopOver
        closePopOver={() => setModalState({ open: false, selectedId: null })}
        game={game}
        open={modalState.open}
        setCurrentHit={setGame}
        currentHitId={modalState.selectedId}
      />
    </div>
  );
};

export { PlayJass };
