import fs from "fs";

export function check(checkResults: Record<string, string | null>) {
  for (const [name, reason] of Object.entries(checkResults)) {
    if (reason) {
      return `Invalid value for ${name}: ${reason}`;
    }
  }

  return true;
}

export function checkDir(value: string): string | null {
  if (!fs.existsSync(value)) {
    return "Expected existing directory, but it does not exist.";
  }

  const stat = fs.lstatSync(value);
  if (!stat.isDirectory()) {
    return "Path does not lead to a directory.";
  }

  return null;
}

export function checkFile(value: string): string | null {
  if (!fs.existsSync(value)) {
    return `Expected existing file, but it does not exist. Got: ${value}`;
  }

  const stat = fs.lstatSync(value);
  if (!stat.isFile()) {
    return `Path does not lead to a file. Got: ${value}`;
  }

  return null;
}
