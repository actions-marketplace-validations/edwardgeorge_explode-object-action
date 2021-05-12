const core = require('@actions/core');

function parseBool(val, def) {
  if (!val) return def;
  if (["true", "True", "TRUE", "t"].includes(val)) return true;
  if (["false", "False", "FALSE", "f"].includes(val)) return false;
  throw new TypeError(`Expecting boolean string, got '${val}'`);
}

function isString(val) {
  return typeof val === 'string' || val instanceof String;
}

try {
  const jsonstr = core.getInput('json', {required: true});
  var data = JSON.parse(jsonstr);
  const raw_strings_str = core.getInput('raw-strings', {required: false});
  const raw_strings = parseBool(raw_strings_str, true);
  console.log(`raw_strings: ${raw_strings} (from: '${raw_strings_str}')`);
  const key = core.getInput('key', {required: false});
  const silent = parseBool(core.getInput('silent', {required: false}), false);

  if (key) data = data[key];
  if (data === undefined) {
    if (silent) {
      console.log("data is undefined");
      data = {};
    } else {
      throw new Error(`key '${key}' not found in object`); 
    }
  }
  for (const [key, value] of Object.entries(data)) {
    console.log(`setting output for ${key}`);
    core.setOutput(key, isString(value) && raw_strings ? value : JSON.stringify(value));
  }
} catch (error) {
  core.setFailed(error.message);
}
