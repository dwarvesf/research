async function sh(cmd) {
   const { promisify } = require('util');
   const exec = promisify(require('child_process').exec);
   const result = await exec(cmd);
   return {out: result.stdout.trim(), err: result.stderr.trim()};
}
module.exports = sh;
