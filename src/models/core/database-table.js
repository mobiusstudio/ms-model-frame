import { snakeCase, mapKeys } from 'lodash'
import { Table } from './table'
import { ColumnArray } from './column-array'
import { sq } from './sq'

export class DatabaseTable {
  constructor(schemaName, tableName) {
    this.schemaName = schemaName
    this.tableName = tableName
    this.columns = new ColumnArray([])
    this.pkey = 'id'
    this.state = sq.from(`"${snakeCase(this.schemaName)}".${snakeCase(this.tableName)}`)
  }

  sqlizePkey = () => `${snakeCase(this.tableName)}.${snakeCase(this.pkey)}`

  from = () => new Table(this.state, this.columns)

  add = async (data) => {
    try {
      const newData = mapKeys(data, (value, key) => snakeCase(key))
      delete newData.id
      const sql = this.state.insert(newData).return('id').query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return res.rows[0].id
      return null
    } catch (error) {
      throw error
    }
  }

  update = async (data, id) => {
    try {
      const newData = mapKeys(data, (value, key) => snakeCase(key))
      delete newData.id
      const sql = this.state.where`id = ${id}`.set(newData).query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return 200
      return null
    } catch (error) {
      throw error
    }
  }

  delete = async (id) => {
    try {
      const sql = this.state.where`id = ${id}`.delete.query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return 200
      return null
    } catch (error) {
      throw error
    }
  }
}
