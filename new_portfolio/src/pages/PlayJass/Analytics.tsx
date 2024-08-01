import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { JassRow, RoemKeys } from "./PlayJass";
import { NO_GAMES, RootRoem } from "./PlayJass.constants";
import {
  calculatePoints,
  calculateTotalPoints,
  cumulativeSum,
  getPoints,
  getRoem,
  getTeamNames,
  getTotalLastHits,
} from "./PlayJass.helpers";

const colorTrans = {
  winning: {
    borderColor: "#4BC0C0",
    backgroundColor: "#4BC0C080", // RGBA with alpha value 0.5 in hexadecimal
  },
  losing: {
    borderColor: "#FF6384",
    backgroundColor: "#ff638480", // RGBA with alpha value 0.5 in hexadecimal
  },
};

export const Analytics = (props: {}) => {
  const { id } = useParams();

  const game = parseImport(id ?? "");

  function parseImport(game: string) {
    try {
      return JSON.parse(atob(game)) as JassRow[];
    } catch {
      return undefined;
    }
  }
  if (!game) return <>No game found</>;
  const teamNames = getTeamNames(game);

  const teamAwon =
    calculateTotalPoints(game, true) > calculateTotalPoints(game, false);
  const colorsA = teamAwon ? colorTrans.winning : colorTrans.losing;
  const colorsB = !teamAwon ? colorTrans.winning : colorTrans.losing;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const getOptions = (title: string, stepSize: number = 25) => {
    const scales =
      stepSize === -1
        ? {}
        : {
            y: {
              ticks: {
                color: "white",
                stepSize: stepSize,
              },
            },
            x: {
              ticks: {
                color: "white",
                stepSize: stepSize,
              },
            },
          };
    const commonOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
          fullSize: true,
          color: "white",
        },
      },
      color: "white",
      animations: {},

      scales,
      maintainAspectRatio: false,
    };

    return commonOptions;
  };

  const optionsPoints = getOptions(
    "Cumulatieve punten"
  ) satisfies ChartOptions<"line">;

  const optionsRoem = getOptions(
    "Cumulatieve roem"
  ) satisfies ChartOptions<"line">;

  const pieOptions = getOptions(
    "Verdeling laatste slagen",
    -1
  ) satisfies ChartOptions<"pie">;

  const barOptions = getOptions(
    "Hoeveelheid roem per soort",
    1
  ) satisfies ChartOptions<"bar">;

  const labels = Array.from({ length: NO_GAMES / 2 }, (_, i) =>
    (i + 1).toString()
  );
  const getChartData = (teamIndex: number): ChartDataset<"line"> => {
    const team = teamNames[teamIndex];
    const isFirstTeam = !teamIndex;

    const points = cumulativeSum(getPoints(game, isFirstTeam));
    const colors =
      isFirstTeam === teamAwon ? colorTrans.winning : colorTrans.losing;

    return {
      fill: true,
      label: team,
      data: points,
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundColor,
      tension: 0.3,
    };
  };

  const getChartData2 = (teamIndex: number): ChartDataset<"line"> => {
    const team = teamNames[teamIndex];
    const isFirstTeam = !teamIndex;
    const points = cumulativeSum(getRoem(game, isFirstTeam));
    const colors =
      isFirstTeam === teamAwon ? colorTrans.winning : colorTrans.losing;

    return {
      fill: true,
      label: team,
      data: points,
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundColor,
      tension: 0.3,
    };
  };

  const getPieData = () => {
    return {
      data: [getTotalLastHits(game, true), getTotalLastHits(game, false)],
      backgroundColor: [colorsA.backgroundColor, colorsB.backgroundColor],
      borderColor: [colorsA.borderColor, colorsB.borderColor],

      borderWidth: 1,
    };
  };
  const getRoemCountData = (teamIndex: number) => {
    const team = teamNames[teamIndex];
    const isFirstTeam = !teamIndex;

    const test = {
      THREE_IN_ROW: 0,
      FOUR_THE_SAME: 0,
      FOUR_IN_ROW: 0,
      KING_QUEEN: 0,
      ALL_HITS: 0,
    };
    game
      .filter((_, idx) => idx % 2 === 1 - +isFirstTeam)
      .forEach((item) =>
        Object.keys(item.roemCounter).forEach((key) => {
          const assertedKey = key as RoemKeys;
          test[assertedKey] += item.roemCounter[assertedKey];
        })
      );
    const colors =
      isFirstTeam === teamAwon ? colorTrans.winning : colorTrans.losing;

    return {
      fill: true,
      label: team,
      data: Object.values(test),
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundColor,
      tension: 0.3,
    };
  };

  const totalPointsData: ChartData<"line"> = {
    labels,
    datasets: [getChartData(0), getChartData(1)],
  };

  const totalRoemData: ChartData<"line"> = {
    labels,
    datasets: [getChartData2(0), getChartData2(1)],
  };
  const lasthitData: ChartData<"pie"> = {
    labels: teamNames as unknown as string[],
    datasets: [getPieData()],
  };

  const roemCounterData: ChartData<"bar"> = {
    labels: Object.keys(RootRoem).map(
      (item) => RootRoem[item as RoemKeys].trans
    ),
    datasets: [getRoemCountData(0), getRoemCountData(1)],
  };

  return (
    <div className="container mx-auto flex flex-col justify-center p-5 text-white">
      <div className="mb-10">
        <h1 className="text-center text-5xl">Analyse</h1>
        <span className="mx-5 flex justify-around">
          <p style={{ color: colorsA.borderColor }} className="">
            {teamNames[0]}
          </p>
          <p>vs</p>
          <p style={{ color: colorsB.borderColor }}>{teamNames[1]}</p>
        </span>
      </div>
      {/* Chart container */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="h-[40vh] p-2 sm:h-screen">
          <Line options={optionsPoints} data={totalPointsData} />
        </div>
        <div className="h-[40vh] p-2 sm:h-screen">
          <Line options={optionsRoem} data={totalRoemData} />
        </div>

        <div className="flex h-[40vh] justify-center sm:h-screen">
          <Pie options={pieOptions} data={lasthitData} />
        </div>
        <div className="flex h-[40vh] justify-center sm:h-screen">
          <Bar options={barOptions} data={roemCounterData} />
        </div>
      </div>
    </div>
  );
};
