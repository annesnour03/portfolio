import { Fragment } from "react";

import { JassRow, RoemCount } from "pages/PlayJass/PlayJass";
import { calculatePoints } from "pages/PlayJass/PlayJass.helpers";
import { twMerge } from "tailwind-merge";

interface GameRowProps {
  hitInfo: JassRow;
  idx: number;
  readonly: boolean;
  adjustTeamNames: (newName: string | null, teamIdx: number) => void;
  setRoemModalState: React.Dispatch<
    React.SetStateAction<{ open: boolean; selectedId: number | null }>
  >;
  updateScore: (value: number, id: number) => void;
  updateLastHit: (value: boolean, id: number) => void;
  setConfirmWetModalState: React.Dispatch<
    React.SetStateAction<{ open: boolean; selectedId: number | null }>
  >;
  getRoemCountFormatted: (roemCounter: RoemCount) => string;
}

export const GameRow: React.FC<GameRowProps> = ({
  hitInfo,
  idx,
  readonly,
  adjustTeamNames,
  setRoemModalState,
  updateScore,
  updateLastHit,
  setConfirmWetModalState,
  getRoemCountFormatted,
}) => {
  const isEven = idx % 2 == 0;
  return (
    <Fragment key={idx}>
      <tr className="border-b text-center odd:border-gray-700 odd:bg-gray-800 even:mb-10 even:border-gray-700 even:bg-gray-900 max-sm:block">
        {isEven && (
          <td
            className="whitespace-nowrap bg-gray-700 px-6 py-4 font-medium  text-white max-sm:block"
            rowSpan={2}
          >
            {(idx + 2) / 2}
          </td>
        )}
        <th
          data-label="Teams"
          scope="row"
          className="whitespace-nowrap px-6 py-4 text-left font-medium text-white max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
        >
          {idx <= 1 && (
            <input
              title="teamName"
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
              disabled={readonly}
              style={{
                width: `calc(${hitInfo.teamName.length}ex + 1rem)`,
              }} // Use 'ch' instead of 'em'
              className={twMerge(
                "max-w-sm select-none border-none bg-transparent font-medium text-white outline-none max-sm:text-right",
                !readonly ? "underline underline-offset-2" : null
              )}
            />
          )}
          {idx > 1 && (
            <p className="max-w-sm overflow-hidden">{hitInfo.teamName}</p>
          )}
        </th>
        <td
          data-label="Roem"
          className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
        >
          {getRoemCountFormatted(hitInfo.roemCounter)}
        </td>
        <td className="max-sm:flex max-sm:px-6 max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]">
          <div
            className="relative cursor-pointer"
            onClick={() => {
              if (readonly) return;
              setRoemModalState({
                selectedId: idx,
                open: true,
              });
            }}
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
        <td
          data-label="Punten"
          className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
        >
          <input
            type="number"
            title="Value"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateScore(parseInt(event.target.value), idx);
            }}
            disabled={readonly}
            value={hitInfo?.points ?? ""}
            className={`${
              isEven
                ? "border-gray-700 bg-gray-900"
                : "border-gray-700 bg-gray-800"
            } box w-fit max-w-[3rem] select-none rounded border-none p-1 text-center outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          ></input>
        </td>
        <td
          data-label="Laatste slag/nat"
          className="flex items-center justify-center gap-4 px-6 py-4 max-sm:gap-8 max-sm:before:mr-auto max-sm:before:content-[attr(data-label)]"
        >
          <div className="flex items-center justify-center">
            <input
              title="lastHit"
              id="default-checkbox"
              type="checkbox"
              disabled={readonly}
              onChange={(event) => updateLastHit(event.target.checked, idx)}
              checked={hitInfo.lastHit}
              className="h-4 w-4 cursor-pointer select-none rounded border-none border-gray-600 bg-gray-700 text-blue-600 outline-none ring-offset-gray-800 focus:ring-0 focus:ring-blue-600"
            ></input>
          </div>
          <p
            className="cursor-pointer text-lg"
            onClick={() => {
              if (readonly) return;
              setConfirmWetModalState({
                open: true,
                selectedId: idx,
              });
            }}
          >
            💧
          </p>
        </td>
        <td
          data-label="Totaal"
          className="px-6 py-4 max-sm:flex max-sm:before:mr-auto max-sm:before:font-bold max-sm:before:content-[attr(data-label)]"
        >
          <p className="text-right font-bold">{calculatePoints(hitInfo)}</p>
        </td>
      </tr>
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
};
