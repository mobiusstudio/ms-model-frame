import joi from 'joi'

const schemaName = joi.string().required()
const tableName = joi.string().required()

export const schemaRules = {
  schemaName,
  tableName,
  column: {
    schemaName,
    tableName,
    type: joi.string().required(),
    name: joi.string().required(),
    alias: joi.string().allow(null),
    foreign: joi.string().allow(null),
    required: joi.boolean().allow(null),
    default: joi.alternatives().try(
      joi.number(),
      joi.string(),
      joi.boolean(),
      joi.array(),
    ).allow(null),
  },
  table: {
    schemaName,
    tableName,
    pkeyIndex: joi.number().integer().min(0),
    columns: joi.array(),
  },
  schema: {
    schemaName,
    tables: joi.array(),
  },
}
