import { snakeCase } from 'lodash'
import { BaseColumn } from './column-base'
import { AggrColumn } from './column-aggr'

export class Column extends BaseColumn {
  constructor({ name, type, alias, foreign, table }) {
    super({ name, type, alias, foreign, table })
  }

  sqlize = () => `${snakeCase(this.table)}.${snakeCase(this.name)}`

  aggr = (aggrType, alias) => {
    const res = new AggrColumn(aggrType, alias, this)
    return res
  }

  static Type = { Id: 1, String: 2, Number: 3, Boolean: 4, Utc: 5 }
}
