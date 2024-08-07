import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { clamp, randomItem } from "helpers/General";
import { GameRow } from "components/jass/GameRow";
import {
  AUDIO_SOURCES,
  JASS_LOCAL_STORAGE_KEYS,
  NO_GAMES,
  RootRoem,
} from "./PlayJass.constants";
import {
  calculatePoints,
  calculateTotalPoints,
  getTeamNames,
  transferPoints,
} from "./PlayJass.helpers";

export type RoemKeys = keyof typeof RootRoem;

export type RoemCount = { [_ in RoemKeys]: number };
export type JassRow = {
  teamName: string;
  roemCounter: RoemCount;
  points?: number;
  lastHit: boolean;
};

type OnlyOnceRoem = {
  [K in RoemKeys]: (typeof RootRoem)[K]["happensOnce"] extends true ? K : never;
}[RoemKeys];

const ConfirmGoingWetPopOver = ({
  open,
  game,
  selectedId,
  closePopOver,
  confirm,
}: {
  open: boolean;
  game: JassRow[];
  selectedId: number | null;
  closePopOver: () => void;
  confirm: (id: number) => void;
}) => {
  if (selectedId === null) return <></>;
  const teamName = game[selectedId].teamName;
  const couldBeMistake =
    calculatePoints(game[selectedId]) > calculatePoints(game[selectedId ^ 1]);
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
            Bevestig dat team "{teamName}" mache de schwimm schwamm
          </Dialog.Title>
          {couldBeMistake && (
            <div>
              Weet je dit zeker? Het team {teamName} heeft meer punten dan de
              tegenstanders
            </div>
          )}
          <div className="mt-[20px] flex justify-end">
            <Dialog.Close asChild>
              <button className="mr-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-slate-400 px-[15px] font-medium leading-none text-white focus:shadow-[0_0_0_2px] focus:outline-none">
                Annuleer
              </button>
            </Dialog.Close>
            <button
              onClick={() => {
                confirm(selectedId);
                closePopOver();
              }}
              className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green-400 px-[15px] font-medium leading-none text-green-900 focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Bevestig
            </button>
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
  const _addValue = (type: RoemKeys, value: number) => {
    const currentGame = { ...currentHit };
    currentGame.roemCounter[type] = clamp(
      currentGame.roemCounter[type] + value,
      0,
      5
    );
    setCurrentHit((game) => {
      const shallowGame = [...game];
      shallowGame[currentHitId] = currentGame;
      return shallowGame;
    });
  };

  const increment = (type: RoemKeys) => {
    _addValue(type, 1);
  };

  const decrement = (type: RoemKeys) => {
    _addValue(type, -1);
  };

  const toggle = (type: OnlyOnceRoem) => {
    // If we have all the hits, we also fill in the points
    if (type === "ALL_HITS") {
      const counterId = currentHitId ^ 1;
      const [newA, newB] = transferPoints(game[counterId], game[currentHitId]);
      const shallowGame = [...game];
      shallowGame[counterId] = newA;
      shallowGame[currentHitId] = newB;
      newB.roemCounter["ALL_HITS"] = +!newB.roemCounter["ALL_HITS"];
      setCurrentHit(shallowGame);
      return;
    }

    // Add or subtract one
    const value = currentHit.roemCounter[type] === 1 ? -1 : 1;
    _addValue(type, value);
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
            {(Object.keys(RootRoem) as RoemKeys[]).map((name) => {
              const kindOfRoem = RootRoem[name];
              return (
                <div className="flex" key={name}>
                  <p className="text-lg">{kindOfRoem.trans}</p>
                  {kindOfRoem.happensOnce && (
                    <div className="ml-auto flex items-center justify-center gap-5">
                      <input
                        title="lastHit"
                        type="checkbox"
                        onChange={() => toggle(name as OnlyOnceRoem)}
                        checked={currentHit.roemCounter[name] === 1}
                        className="h-4 w-4 select-none rounded border-none border-gray-600 bg-gray-700 text-blue-600 outline-none ring-offset-gray-800 focus:ring-0 focus:ring-blue-600"
                      ></input>
                      <div className="aspect-square h-8"></div>
                    </div>
                  )}
                  {!kindOfRoem.happensOnce && (
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
                  )}
                </div>
              );
            })}
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
  const { id } = useParams();
  const [importedGame, success] = parseImport(id ?? "");
  const readonly = id !== undefined && success;
  const [game, setGame] = useState<JassRow[]>(importedGame);
  const [choosingTrumpA, setChoosingTrumpA] = useState(true);
  const allAudios = useMemo(
    () => AUDIO_SOURCES.map((file) => new Audio(file)),
    []
  );
  const [roemModalState, setRoemModalState] = useState<{
    open: boolean;
    selectedId: number | null;
  }>({ open: false, selectedId: null });
  const [confirmWetModalState, setConfirmWetModalState] = useState<{
    open: boolean;
    selectedId: number | null;
  }>({
    open: false,
    selectedId: null,
  });

  useLayoutEffect(() => {
    const retrieved = localStorage.getItem(JASS_LOCAL_STORAGE_KEYS.CURRENT);
    if (retrieved && !readonly) {
      setGame(JSON.parse(retrieved));
    }
  }, []);

  useEffect(() => {
    if (readonly) return;
    // After we adjusted, we add a new game
    if (game.length < NO_GAMES && lastGameFilledIn) addNewHitData();
    // We also save to localstorage every time game is changed.
    localStorage.setItem(JASS_LOCAL_STORAGE_KEYS.CURRENT, JSON.stringify(game));
  }, [game]);

  function parseImport(game: string) {
    try {
      return [JSON.parse(atob(game)) as JassRow[], true] as const;
    } catch {
      return [getNewObjects(), false] as const;
    }
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
  const lastGame = game.at(-1);
  const secondToLastGame = game.at(-2);

  // Last points have to be filled in, and the last hit has to be filled in
  const lastGameFilledIn =
    (lastGame?.points !== undefined ||
      secondToLastGame?.points !== undefined) &&
    Boolean(lastGame?.lastHit) !== Boolean(secondToLastGame?.lastHit);

  const showFinalTotals = game.length === NO_GAMES && lastGameFilledIn;

  const totalPointsA = calculateTotalPoints(game, true);
  const totalPointsB = calculateTotalPoints(game, false);

  const addNewHitData = () => {
    setGame((game) => [...game, ...getNewObjects(game)]);
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
    const ownGame = { ...game[id] };

    const counterPartId = id ^ 1; // xor to get counterpart
    const counterPartGame = { ...game[counterPartId] };

    ownGame.lastHit = value;
    counterPartGame.lastHit = !value;

    shallowGame[id] = ownGame;
    shallowGame[counterPartId] = counterPartGame;

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

  // We reset the game, but take the players name with us
  const resetGame = () => {
    // Before resetting the game, we save it to local storage.
    const history = JSON.parse(
      localStorage.getItem(JASS_LOCAL_STORAGE_KEYS.HISTORY) ?? "[]"
    );
    localStorage.setItem(
      JASS_LOCAL_STORAGE_KEYS.HISTORY,
      JSON.stringify([...history, { game: game, date: new Date() }])
    );
    const [A, B] = getTeamNames(game);
    const freshState = getNewObjects();
    freshState[0].teamName = A;
    freshState[1].teamName = B;
    setGame(freshState);
  };

  const playRandomSound = () => {
    // Cancel all other songs that are currently playing
    allAudios.forEach((e) => e.pause());

    // Play actual sound
    randomItem(allAudios).play();
  };

  return (
    <div>
      <div className="relative overflow-auto p-2 pb-10 md:px-5 lg:px-16">
        <table className="w-full table-fixed text-left text-sm text-gray-400 sm:table-auto">
          <thead className="bg-gray-700 text-xs uppercase text-gray-300 max-sm:absolute max-sm:m-[-1px] max-sm:h-[1px] max-sm:w-[1px] max-sm:overflow-hidden">
            <tr>
              <th
                scope="col"
                className="w-2 rounded-tl-md px-6 py-3 text-center "
              >
                -
              </th>
              <th
                scope="col"
                className="w-4 px-6 py-3"
                style={{
                  width: `calc(${game[0].teamName.length}ex + 1rem)`,
                }}
              >
                Teams
              </th>
              <th scope="col" className="w-4 px-12 py-3 text-center sm:w-1/2">
                Roem
              </th>
              <th className="w-5"></th>
              <th scope="col" className="w-7 px-6 py-3 text-center sm:w-1/2">
                Punten
              </th>

              <th scope="col" className="w-4 px-6 py-3 text-center sm:w-auto">
                Laatste slag/nat
              </th>
              <th
                scope="col"
                className="w-2 rounded-tr-md text-right sm:px-6 sm:py-3"
              >
                Totaal
              </th>
            </tr>
          </thead>
          <tbody>
            {game.map((hitInfo, idx) => (
              <GameRow
                choosingTrumpA={choosingTrumpA}
                setChoosingTrumpA={setChoosingTrumpA}
                key={idx}
                hitInfo={hitInfo}
                counterpartHitInfo={game[idx ^ 1]}
                idx={idx}
                readonly={readonly}
                adjustTeamNames={adjustTeamNames}
                setRoemModalState={setRoemModalState}
                updateScore={updateScore}
                updateLastHit={updateLastHit}
                setConfirmWetModalState={setConfirmWetModalState}
              />
            ))}
            <tr>
              <td height="30px"></td>
            </tr>
            {/* Display the total */}
            <tr className="border-b odd:border-gray-700 odd:bg-gray-800 even:border-gray-700 even:bg-gray-900 max-sm:block">
              <td
                className="whitespace-nowrap bg-gray-700 p-1 text-center text-xl font-medium text-white max-sm:block  sm:px-6 sm:py-4"
                rowSpan={2}
              >
                Totaal
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
              <td className="w-full px-6 py-4 text-right">
                {showFinalTotals && totalPointsA}
                {!showFinalTotals && "???"}
              </td>
            </tr>
            <tr className="border-b odd:border-gray-700 odd:bg-gray-800 even:mb-10 even:border-gray-700 even:bg-gray-900 max-sm:block">
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
              <td className="w-full px-6 py-4 text-right">
                {showFinalTotals && totalPointsB}
                {!showFinalTotals && "???"}
              </td>
            </tr>
            <tr className="w-full max-sm:inline-flex">
              <td colSpan={1} className="flex-1 p-0 text-left max-sm:block">
                <Link to="../">
                  <div className="rounded-b-md bg-red-800 p-2 text-center font-medium text-white">
                    Terug
                  </div>
                </Link>
              </td>
              <td className="flex-1"></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2} className="flex-2 p-0 text-right max-sm:block">
                {!readonly && (
                  <button
                    type="button"
                    onClick={resetGame}
                    className="rounded-b-md bg-green-600 p-2 font-medium text-white"
                  >
                    Nieuwe ronde starten
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FillInRoemPopOver
        closePopOver={() =>
          setRoemModalState({ open: false, selectedId: null })
        }
        game={game}
        open={roemModalState.open}
        setCurrentHit={setGame}
        currentHitId={roemModalState.selectedId}
      />
      <ConfirmGoingWetPopOver
        open={confirmWetModalState.open}
        selectedId={confirmWetModalState.selectedId}
        game={game}
        closePopOver={() =>
          setConfirmWetModalState({ open: false, selectedId: null })
        }
        confirm={(id: number) => {
          const counterId = id ^ 1;
          const [newA, newB] = transferPoints(game[id], game[counterId]);

          const shallowGame = [...game];
          shallowGame[id] = newA;
          shallowGame[counterId] = newB;
          setGame(shallowGame);
          playRandomSound();
        }}
      />
    </div>
  );
};

export { PlayJass };
