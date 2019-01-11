import Joi from 'joi'

export class BaseColumn {
  constructor({ name, alias, foreign, table, type, def = null, required = false }) {
    this.table = table
    this.name = name
    this.type = type
    this.foreign = foreign
    this.alias = alias
    this.def = def
    this.required = required
  }

  static getRule(type) {
    switch (type) {
      case 'string':
        return Joi.string().allow('', null)
      case 'number':
        return Joi.number().allow(0, null)
      case 'boolean':
        return Joi.boolean().allow(null)
      case 'id':
        return Joi.number().min(100000000000000).max(999999999999999).allow(null)
      case 'timestamp':
        return Joi.date().timestamp().allow(null)
      default:
        return null
    }
  }
}
