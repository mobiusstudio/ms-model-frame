import { snakeCase } from 'lodash'
import { sq } from './sq'


export class Table {
  constructor (state, columns) {
    this.state = state
    this.columns = columns
  }

  // sample: where(e`genre = ${'Fantasy'}`)
  where = (strings, ...values) => {
    const state = this.state.where(strings, ...values)
    return new Table(state, this.columns)
  }

  join = (dt) => {
    const ons = {}
    this.columns.forEach((column) => {
      if (column.foreign === dt.tableName) {
        ons[column.sqlize()] = sq.raw(dt.sqlizePkey())
      }
    })
    const state = this.state.join(`"${snakeCase(dt.schemaName)}".${snakeCase(dt.tableName)}`)
      .on(ons)
    const columns = this.columns.concat(dt.columns)
    return new Table(state, columns)
  }

  groupBy = (columns, aggrColumns) => {
    const newColumns = columns.concat(aggrColumns)
    const state = this.state.groupBy(columns.map(column => column.sqlize()))
      .return(newColumns.objlize())

    return new Table(state, newColumns)
  }

  select = (columns = null) => {
    const newColumns = columns ? columns : this.columns
    const state = this.state.return(newColumns.objlize())
    return new Table(state, newColumns)
  }

  do = () => {
    const query = this.state.query
    console.log(query)
    return query
  }
}