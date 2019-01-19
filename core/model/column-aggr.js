import { ColumnBase } from '../libs/schema/base'

export class ColumnAggr extends ColumnBase {
  constructor(aggrType, alias, column) {
    const { schemaName, tableName, type, name, foreign, default: def, required } = column
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
    this.aggrType = aggrType
  }

  sqlize = () => {
    switch (this.aggrType) {
      case 'array': return `array_agg(${super.sqlize()})`
      case 'min': return `min(${super.sqlize()})`
      case 'max':
      case 'avg':
      case 'sum':
      case 'count':			// TODO: different design
      default: return `${super.sqlize()}`
    }
  }
}
