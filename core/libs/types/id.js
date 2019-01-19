/* eslint-disable quotes */
import joi from 'joi'
import { Sql, Joi, Swg, Rul } from './base'

export const id = {
  default: {
    sql: ({ req, def }) => new Sql('bigint').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int64'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().integer().greater(100000000000000)').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().integer().greater(100000000000000)).torule({ req, def }),
  },

  'id-auto': {
    sql: schemaName => Sql.autoId(schemaName),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int64'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().integer().greater(100000000000000)').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().integer().greater(100000000000000)).torule({ req, def }),
  },

  'id-seq': {
    sql: () => Sql.seqId(),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int32'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().integer()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().integer()).torule({ req, def }),
  },
}
