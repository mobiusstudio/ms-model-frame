import { snakeCase } from 'lodash'
// import { AggrColumn } from './aggr-column'

export class Column {
  constructor ({ name, type, alias, foreign, table }) {
    this.name = name
    this.type = type
    this.foreign = foreign
    this.alias = alias
    this.table = table
  }

  sqlize = () => `${snakeCase(this.table)}.${snakeCase(this.name)}`

  aggr = (aggrType, alias) => {
    const res = new AggrColumn(aggrType, alias, this)
    return res
  }

  static Type = { Id: 1, String: 2, Number: 3, Boolean: 4, Utc: 5 }
}

export class AggrColumn extends Column {
  constructor (aggrType, alias, column) {
    const { name, type, foreign, table } = column
    super({ name, type, alias, foreign, table })
    this.aggrType = aggrType
  }

  sqlize = () => {
    switch (this.aggrType) {
      case 'array': return `array_agg(${snakeCase(this.table)}.${snakeCase(this.name)})`
      case 'min': return `min(${snakeCase(this.table)}.${snakeCase(this.name)})`
      case 'max':
      case 'avg':
      case 'sum':
      case 'count':			// TODO: different design
      default: return `${snakeCase(this.table)}.${snakeCase(this.name)}`
    }
  }
}