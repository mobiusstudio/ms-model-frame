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
  }

  getState = () => sq.from(`"${snakeCase(this.schemaName)}".${snakeCase(this.tableName)}`)

  sqlizePkey = () => `${snakeCase(this.tableName)}.${snakeCase(this.pkey)}`

  from = () => new Table(this.getState(), this.columns)

  add = async (data) => {
    try {
      this.columns.validate(data)
      const newData = mapKeys(data, (value, key) => snakeCase(key))
      delete newData[this.pkey]
      const sql = this.getState().insert(newData).return(this.pkey).query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return res.rows[0].id
      return 400
    } catch (error) {
      throw error
    }
  }

  update = async (data, pkeyValue) => {
    try {
      this.columns.validate(data)
      const newData = mapKeys(data, (value, key) => snakeCase(key))
      delete newData[this.pkey]
      const sql = this.getState().where`${sq.raw(`${this.pkey}`)} = ${pkeyValue}`.set(newData).query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return 200 // TODO: errorhandler
      return 400
    } catch (error) {
      throw error
    }
  }

  delete = async (pkeyValue) => {
    try {
      const data = {
        [`${this.pkey}`]: pkeyValue,
      }
      this.columns.validate(data)
      const sql = this.getState().where`${sq.raw(`${this.pkey}`)} = ${pkeyValue}`.delete.query
      const res = await db.query(sql.text, sql.args)
      if (res.rowCount > 0) return 200 // TODO: errorhandler
      return 400
    } catch (error) {
      throw error
    }
  }

  // TODO: batchAdd
  // TODO: batchDelete
}
