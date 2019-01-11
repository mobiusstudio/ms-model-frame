import * as models from './models'
import { db, errors, coreModels } from '../core'

global.db = db

export const configure = async (options) => {
  global.hashSalt = options.secret.hash
  const res = await db.configure(options.database)
  return res
}

export { errors }
export default { ...models, ...coreModels }
