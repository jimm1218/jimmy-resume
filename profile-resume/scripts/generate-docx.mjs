import fs from "node:fs";
import path from "node:path";
import { buildReportDocx, renderToDocx } from "@paperjsx/json-to-docx";

const root = path.resolve(import.meta.dirname, "..");
const specPath = path.join(root, "resume.paperjsx.json");
const outputPath = path.join(root, "jimmy-chin-resume.docx");

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const doc = buildReportDocx(spec);
const result = await renderToDocx(doc);

fs.writeFileSync(outputPath, result.buffer);

const stats = fs.statSync(outputPath);
if (stats.size === 0) {
  throw new Error("Generated DOCX is empty");
}

console.log(`Generated ${outputPath} (${stats.size} bytes)`);
