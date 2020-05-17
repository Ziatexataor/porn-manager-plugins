import * as fs from "fs";
import * as nodepath from "path";
import Handlebars from "handlebars";
const table = require("markdown-table") as (val: any) => any;

const template = fs.readFileSync("template.md", "utf-8");

const tableHeaders = ["Name", "Type", "Required", "Description"];

const generatePluginDocs = async () => {
  const pluginFolder = nodepath.resolve("../plugins");
  const pluginNames = fs.readdirSync(pluginFolder);

  pluginNames.forEach((name) => {
    console.log(`Generating docs for ${name}...`);
    const pluginPath = nodepath.join(pluginFolder, name);

    const infoPath = nodepath.join(pluginPath, "info.json");
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"));

    const docPath = nodepath.join(pluginPath, "docs.md");
    const docs = fs.existsSync(docPath)
      ? fs.readFileSync(docPath, "utf-8")
      : null;

    const rendered = Handlebars.compile(template)({
      name,
      version: info.version,
      description: info.description,
      authors: info.authors,
      docs,
      hasArgs: info.arguments && info.arguments.length,
      argsTable: table([
        tableHeaders,
        ...(info.arguments || []).map((arg: any) => [
          arg.name,
          arg.type,
          arg.required,
          arg.description,
        ]),
      ]),
    });
    const readmePath = nodepath.join(pluginPath, "README.md");
    fs.writeFileSync(readmePath, rendered, "utf-8");
    console.log(`${name} done`);
  });
};

generatePluginDocs();
