import { RoemCount, RoemValues, type JassRow } from "./PlayJass";

export const calculateRoem = (roemCounter: RoemCount): number => {
  const roem = (
    Object.keys(roemCounter) as (keyof typeof roemCounter)[]
  ).reduce((acc, type) => {
    const count = roemCounter[type];
    const value = RoemValues[type];
    return acc + count * value;
  }, 0);
  return roem;
};

export const calculatePoints = ({
  roemCounter,
  lastHit,
  points,
}: JassRow): number => {
  const roem = calculateRoem(roemCounter);
  return roem + (lastHit ? 10 : 0) + (points ?? 0);
};
