// Yargs
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

// Ours
import { check, checkFile } from "./cli-helpers";

async function main() {
  await yargs(hideBin(process.argv))
    .command(
      "echo <file>",
      "Echo a file path of a file that exists.",
      (yargs) => {
        return yargs
          .positional("file", {
            describe: "The file path to echo",
            demandOption: true,
            type: "string",
          })
          .check(({ file }) =>
            check({
              path: checkFile(file),
            }),
          );
      },
      ({ file }) => {
        console.log("I'd read this if I wanted to", file);
      },
    )
    .demandCommand()
    .strict()
    .parse();
}

main().catch((err: unknown) => {
  console.error(err);
});
