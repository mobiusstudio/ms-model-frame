import log4js from 'log4js'
import options from '../src/config/config.json'
import { configure } from '../src'

const log = log4js.getLogger()

async function update() {
  const dbManager = await configure(options)
  const version = await dbManager.getCurrentVersion()
  console.info(`Before update db version: ${version}`)
  await dbManager.update()
  console.info(`After update db version: ${dbManager.version}`)
}

update().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err.stack)
})
