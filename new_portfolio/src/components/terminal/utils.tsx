import * as bin from "./bin";

const allCommands = Object.keys(bin);
export const commandExists = (commandFullLine: string) => {
  const [command, ..._] = commandFullLine.split(" ");
  return allCommands.indexOf(command) !== -1;
};

export const scrollSmoothlyToBottom = (id: string) => {
  const element = document.getElementById(id);
  element?.animate({ scrollTop: element.scrollHeight }, 500);
};

export const runCommand = async (commandFullLine: string) => {
  const [command, ...argv] = commandFullLine.split(" ");
  // Double check that the command exists
  if (!commandExists(command)) {
    if (!command.trim()) return <></>;

    // We try to find the closest command
    const combined: { correct: string; distance: number }[] = allCommands.map(
      (instring) => {
        return { correct: instring, distance: levenshtein(instring, command) };
      }
    );
    const closest = combined.sort((a, b) => a.distance - b.distance)[0];
    if (closest.distance < 3)
      return (
        <>
          {command}: command not found. Did you mean{" "}
          <p className="inline-block text-yellow-400">'{closest.correct}'</p>?
          To show all commands, run 'help'.
        </>
      );
    return <>{command}: command not found. Try to run 'help'!</>;
  }
  const output = bin[command as keyof typeof bin];
  const res = await output(argv);
  return <div>{res}</div>;
};

const levenshtein = (a: string, b: string): number => {
  const { substitution, deletion, insertion } = {
    substitution: 1,
    deletion: 1,
    insertion: 1,
  };
  const aIsLonger = a.length > b.length;
  const longer = (aIsLonger ? a : b).split("");
  const shorter = (aIsLonger ? b : a).split("");
  if (shorter.length === 0) return longer.length;

  const currentMatrixRow = [...Array(shorter.length)].map(
    (_, index) => index + 1
  );

  longer.forEach((charA, rowIndex) => {
    let topLeft = rowIndex;

    shorter.forEach((charB, columnIndex) => {
      const top = currentMatrixRow[columnIndex];
      const left =
        columnIndex === 0 ? rowIndex + 1 : currentMatrixRow[columnIndex - 1];

      const tmp = currentMatrixRow[columnIndex];
      currentMatrixRow[columnIndex] =
        charA === charB
          ? topLeft // equality
          : Math.min(top + deletion, left + insertion, topLeft + substitution);
      topLeft = tmp;
    });
  });
  return currentMatrixRow[currentMatrixRow.length - 1];
};

export const getAutoCompletePrompt = (currentPrompt: string): string => {
  if (currentPrompt === "") return "";
  // We try to get to string that matches the closest to our prompt
  const candidates = allCommands.map(
    (command) => (command.startsWith(currentPrompt) && command) || ""
  );
  return candidates.find((candidate) => candidate !== "") ?? "";
};
