import { snakeCase } from 'lodash'
import { Table } from './table'
import { ColumnArray } from './column-array'
import { sq } from '../../global'

export class DatabaseTable {
  constructor (schemaName, tableName) {
    this.schemaName = schemaName
    this.tableName = tableName
    this.columns = new ColumnArray([])
    this.pkey = 'id'
  }

  sqlizePkey = () => `${snakeCase(this.tableName)}.${snakeCase(this.pkey)}`

  from = () => {
    const state = sq.from(`"${snakeCase(this.schemaName)}".${snakeCase(this.tableName)}`)
    return new Table(state, this.columns)
  }
}