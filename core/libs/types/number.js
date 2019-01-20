/* eslint-disable quotes */
import joi from 'joi'
import { Sql, Joi, Swg, Rul } from './base'

export const number = {
  default: {
    sql: ({ req, def }) => new Sql('double precision').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'number'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number()).torule({ req, def }),
  },

  int: {
    sql: ({ req, def }) => new Sql('integer').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int32'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().integer()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().integer()).torule({ req, def }),
  },

  bigint: {
    sql: ({ req, def }) => new Sql('bigint').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int64'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().integer()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().integer()).torule({ req, def }),
  },

  float: {
    sql: ({ req, def }) => new Sql('real').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'number',\nformat: 'float'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().precision()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().precision()).torule({ req, def }),
  },

  double: {
    sql: ({ req, def }) => new Sql('double precision').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'number',\nformat: 'double'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().precision()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().precision()).torule({ req, def }),
  },

  // numeric: {
  //   sql: ({ req, def }) => new Sql('numeric#numericParameters#').tostring({ req, def }),
  //   swg: ({ req, def }) => new Swg(`type: 'number',\nformat: 'double'`).tostring({ req, def }),
  //   joi: ({ req, def, scaleValue }) => new Joi(`joi.number().precision(${scaleValue})`).tostring({ req, def }),
  //   rul: ({ req, def, scaleValue }) => new Rul(joi.number().precision(scaleValue)).torule({ req, def }),
  // },

  money: {
    sql: ({ req, def }) => new Sql('money').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'number',\nformat: 'double'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.number().precision(2)').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.number().precision(2)).torule({ req, def }),
  },

  timestamp: {
    sql: ({ req, def }) => new Sql('bigint').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'integer',\nformat: 'int64'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.date().timestamp()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.date().timestamp()).torule({ req, def }),
  },
}
