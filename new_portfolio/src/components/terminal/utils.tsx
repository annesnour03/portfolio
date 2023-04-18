import * as bin from "./bin";
const allCommands = Object.keys(bin);
export const commandExists = (commandFullLine: string) => {
  const [command, ..._] = commandFullLine.split(" ");
  return allCommands.indexOf(command) !== -1;
};

export const scrollSmoothlyToBottom = (id: string) => {
  const element = document.getElementById("tt");
  element?.animate({ scrollTop: element.scrollHeight }, 500);
};

export const runCommand = (commandFullLine: string): JSX.Element => {
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
          <p className="text-yellow-400 inline-block">'{closest.correct}'</p>? To show all commands, run 'help'.
        </>
      );
    return <>{command}: command not found. Try to run 'help'!</>;
  }
  const output = bin[command as keyof typeof bin];
  const res = output(argv);

  return <div>{res}</div>;
};

const levenshtein = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a[0] === b[0]) return levenshtein(a.substring(1), b.substring(1));

  return (
    1 +
    Math.min(
      levenshtein(a, b.substring(1)),
      levenshtein(a.substring(1), b),
      levenshtein(a.substring(1), b.substring(1))
    )
  );
};
