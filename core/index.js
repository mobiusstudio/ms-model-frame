import * as coreModels from './model'
import errors from './errors'
import db from './database'

global.db = db

export const configure = async (options) => {
  global.hashSalt = options.secret.hash
  const res = await db.configure(options.database)
  return res
}

export { errors, db, coreModels }
