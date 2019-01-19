/* eslint-disable quotes */
import joi from 'joi'
import { Sql, Joi, Swg, Rul } from './base'

export const string = {
  default: {
    sql: ({ req, def }) => new Sql('varchar').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'string'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.string()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.string()).torule({ req, def }),
  },

  // maxmin: {
  //   sql: ({ req, def, max }) => new Sql(`varchar(${max})`).tostring({ req, def }),
  //   swg: ({ req, def, max, min }) => new Swg(`type: 'string',\nmaxLength: ${max},\nminLength: ${min}`).tostring({ req, def }),
  //   joi: ({ req, def, max, min }) => new Joi(`joi.string().max(${max}).min(${min})`).tostring({ req, def }),
  //   rul: ({ req, def, max, min }) => new Rul(joi.string().max(max).min(min)).torule({ req, def }),
  // },

  // pattern: {
  //   sql: ({ req, def }) => new Sql('varchar').tostring({ req, def }),
  //   swg: ({ req, def, pattern }) => new Swg(`type: 'string',\npattern: '${pattern}'`).tostring({ req, def }),
  //   joi: ({ req, def, pattern }) => new Joi(`joi.string().regex(/${pattern}/)`).tostring({ req, def }),
  //   rul: ({ req, def, pattern }) => new Rul(joi.string().regex(pattern)).torule({ req, def }),
  // },

  password: {
    sql: ({ req, def }) => new Sql('varchar').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'string',\nminLength: 6`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.string().min(6)').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.string().min(6)).torule({ req, def }),
  },

  email: {
    sql: ({ req, def }) => new Sql('varchar').tostring({ req, def }),
    swg: ({ req, def }) => new Swg(`type: 'string',\nformat: 'email'`).tostring({ req, def }),
    joi: ({ req, def }) => new Joi('joi.string().email()').tostring({ req, def }),
    rul: ({ req, def }) => new Rul(joi.string().email()).torule({ req, def }),
  },
}
