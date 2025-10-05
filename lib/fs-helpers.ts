import fs from "fs";
import path from "path";

export function listDir(dir: string) {
  return fs.readdirSync(dir).filter((f) => !f.startsWith("."));
}

export function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

export function joinContent(...parts: string[]) {
  return path.join(process.cwd(), "content", ...parts);
}
