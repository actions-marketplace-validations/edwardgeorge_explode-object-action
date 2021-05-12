const core = require('@actions/core');

function parseBool(val) {
  if (!val) return null;
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
  const raw_strings = parseBool(core.getInput('raw-strings', {required: false})) || true;
  const key = core.getInput('key', {required: false});
  const silent = parseBool(core.getInput('silent', {required: false})) || false;

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
