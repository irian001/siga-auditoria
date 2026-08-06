import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) {
    if (specifier.startsWith(".") && !path.extname(specifier)) {
      const parentPath = fileURLToPath(context.parentURL);
      const candidate = path.resolve(path.dirname(parentPath), specifier);
      for (const extension of [".ts", ".tsx", ".js", ".mjs"]) {
        if (existsSync(`${candidate}${extension}`)) {
          return nextResolve(pathToFileURL(`${candidate}${extension}`).href, context);
        }
      }
    }
    return nextResolve(specifier, context);
  }

  const projectRoot = path.dirname(fileURLToPath(import.meta.url));
  const sourcePath = path.resolve(projectRoot, "..", "src", specifier.slice(2));
  return nextResolve(pathToFileURL(`${sourcePath}.ts`).href, context);
}
