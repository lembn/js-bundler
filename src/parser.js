const yargonaut = require("yargonaut"); // yargonaut first!
const yargs = require("yargs");
const { validate, defaults } = require("./common");

yargonaut.style("blue");
yargonaut.helpStyle("green.underline");
yargonaut.errorsStyle("red.bold");

yargs.scriptName("js-bundler");

yargs.check((args) => {
  const paths = [args.output, args.src, args.modules];
  if (args.log) paths.push(args.log);
  let valid = true;
  for (const i in paths) {
    valid = validate(paths[i]);
    if (valid !== true) break;
  }
  return valid;
});

yargs.option("i", {
  alias: "interactive",
  describe: "Run in interactive mode. Will be disabled if any other flags/options are present",
  type: "boolean",
  default: defaults.interactive,
});
yargs.option("f", {
  alias: "fast",
  describe: "Run in fast mode (disables progress tracking and reports)",
  type: "boolean",
  default: defaults.fast,
});
yargs.option("s", {
  alias: "silent",
  describe: "Run in silent mode (disables console messages, does not interfere with file logging)",
  type: "boolean",
  default: defaults.silent,
});
yargs.option("l", {
  alias: "log",
  describe: "Set path to log file",
  type: "string",
  normalize: true,
  default: defaults.log,
});
yargs.option("o", {
  alias: "output",
  describe: "Set output folder path",
  type: "string",
  normalize: true,
  default: defaults.output,
});
yargs.option("src", {
  describe: "Set source code folder path",
  type: "string",
  normalize: true,
  default: defaults.src,
});
yargs.option("m", {
  alias: "modules",
  describe: "Set node modules folder path",
  type: "string",
  normalize: true,
  default: defaults.modules,
});

yargs.example([
  ["$0", "Run with defualts"],
  ["$0 -i", "Run in interactive mode"],
  ["$0 -f -o ./somewhere/dist", "Use custom output folder and run in fast mode"],
]);

yargs.help();
yargs.alias("h", "help");
yargs.alias("v", "version");

module.exports = yargs;
