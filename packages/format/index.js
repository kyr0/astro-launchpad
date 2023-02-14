const execSync = require('child_process').execSync
const resolve = require('path').resolve
const projectRootDir = resolve(`${__dirname}/../..`)
module.exports = () => {
  execSync(
    `${projectRootDir}/node_modules/.bin/prettier --config ${projectRootDir}/.prettierrc -w --ignore-path ${projectRootDir}/.prettierignore . --cache --plugin-search-dir=${projectRootDir}`,
    {
      stdio: 'inherit',
    }
  )
}
