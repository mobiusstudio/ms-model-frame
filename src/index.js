import * as models from './models'
import * as coreModels from '../core/model'
import errors from '../core/errors'
import db from '../core/database'

global.db = db

export const configure = async (options) => {
  global.hashSalt = options.secret.hash
  const res = await db.configure(options.database)
  return res
}

export { errors }
export default { ...models, ...coreModels }
