import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import fs from "fs";

function check(checkResults: Record<string, string | null>) {
  for (const [name, reason] of Object.entries(checkResults)) {
    if (reason) {
      return `Invalid value for ${name}: ${reason}`;
    }
  }

  return true;
}

function checkDir(value: string): string | null {
  if (!fs.existsSync(value)) {
    return "Expected existing directory, but it does not exist.";
  }

  const stat = fs.lstatSync(value);
  if (!stat.isDirectory()) {
    return "Path does not lead to a directory.";
  }

  return null;
}

function checkFile(value: string): string | null {
  if (!fs.existsSync(value)) {
    return `Expected existing file, but it does not exist. Got: ${value}`;
  }

  const stat = fs.lstatSync(value);
  if (!stat.isFile()) {
    return `Path does not lead to a file. Got: ${value}`;
  }

  return null;
}

yargs(hideBin(process.argv))
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
