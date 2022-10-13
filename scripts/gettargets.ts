import "dotenv/config";
import { prisma } from "../src/server/db/client";

/**
 * must have "type": "module" in package.json
 * also see package.json script tsnode
 * ```sh
 * yarn tsnode ./scripts/gettargets.ts
 * ```
 */
async function main() {
  const targets = await prisma.target.findMany();
  console.log(targets);
}

main();
