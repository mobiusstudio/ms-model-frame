import { snakeCase } from 'lodash'
import { ColumnBase } from '../libs/schema/base'
import { ColumnAggr } from './column-aggr'

export class Column extends ColumnBase {
  constructor({
    schemaName,
    tableName,
    type,
    name,
    alias = null,
    foreign = null,
    required = false,
    default: def = null,
  }) {
    super({
      schemaName,
      tableName,
      type,
      name,
      alias,
      foreign,
      required,
      default: def,
    })
  }

  sqlize = () => `"${snakeCase(this.schemaName)}"${snakeCase(this.tableName)}.${snakeCase(this.name)}`

  aggr = (aggrType, alias) => {
    const res = new ColumnAggr(aggrType, alias, this)
    return res
  }
}
