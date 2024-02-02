import { RoemCount, RoemKeys, type JassRow } from "./PlayJass";
import { LAST_HIT_POINTS, MAX_POINTS, RootRoem } from "./PlayJass.constants";

export const cumulativeSum = (numbers: number[]): number[] => {
  return numbers.reduce<number[]>((acc, x) => {
    if (acc.length > 0) {
      acc.push(acc[acc.length - 1] + x);
    } else {
      acc.push(x);
    }
    return acc;
  }, []);
};

export const getTotalLastHits = (game: JassRow[], isFirstTeam: boolean) => {
  return game
    .filter((_, idx) => idx % 2 === 1 - +isFirstTeam)
    .map((row) => +row.lastHit)
    .reduce((acc, a) => acc + a, 0);
};

export const getTeamNames = (game?: JassRow[]) => {
  const teamNameA = game !== undefined ? game[0].teamName : "Team A";
  const teamNameB = game !== undefined ? game[1].teamName : "Team B";
  return [teamNameA, teamNameB] as const;
};
export const calculateRoem = (roemCounter: RoemCount): number => {
  const roem = (
    Object.keys(roemCounter) as (keyof typeof roemCounter)[]
  ).reduce((acc, type) => {
    const count = roemCounter[type];
    const value = RootRoem[type].value;
    return acc + count * value;
  }, 0);
  return roem;
};

export const getPoints = (game: JassRow[], isFirstTeam: boolean) => {
  return game
    .filter((_, idx) => idx % 2 === 1 - +isFirstTeam)
    .map(calculatePoints);
};

export const getRoem = (game: JassRow[], isFirstTeam: boolean) => {
  return game
    .filter((_, idx) => idx % 2 === 1 - +isFirstTeam)
    .map(({ roemCounter }) => calculateRoem(roemCounter));
};

export const calculateTotalRoem = (game: JassRow[], isFirstTeam: boolean) => {
  return getRoem(game, isFirstTeam).reduce((acc, a) => acc + a, 0);
};
export const calculateTotalPoints = (game: JassRow[], isFirstTeam: boolean) => {
  return getPoints(game, isFirstTeam).reduce((acc, a) => acc + a, 0);
};

export const calculatePoints = ({
  roemCounter,
  lastHit,
  points,
}: JassRow): number => {
  const roem = calculateRoem(roemCounter);
  return roem + (lastHit ? LAST_HIT_POINTS : 0) + (points ?? 0);
};

/**
 *
 * @param from The team we transfer the points from
 * @param to The team we transfer the points to
 * @returns Essentially from + to, in the place of to and a "pointless" from
 */
export const transferPoints = (
  from: JassRow,
  to: JassRow
): [JassRow, JassRow] => {
  const shallowFrom = { ...from };
  const shallowTo = { ...to };
  // Fix the last hit
  shallowFrom.lastHit = false;
  shallowTo.lastHit = true;

  // Fix the points
  shallowTo.points = MAX_POINTS;
  shallowFrom.points = 0;

  // Fix the roem
  for (const key in shallowTo.roemCounter) {
    const assertedKey = key as RoemKeys;
    shallowTo.roemCounter[assertedKey] += shallowFrom.roemCounter[assertedKey];
    shallowFrom.roemCounter[assertedKey] = 0;
  }

  return [shallowFrom, shallowTo];
};
