import { snakeCase } from 'lodash'

export class ColumnArray {
  constructor(items) {
    this.items = items
  }

  map = func => this.items.map(func)

  forEach = (func) => {
    this.items.forEach(func)
  }

  objlize = () => {
    const res = {}
    this.items.forEach((item) => {
      const alias = item.alias ? item.alias : item.name
      if (res[`${snakeCase(alias)}`]) {
        // eslint-disable-next-line no-console
        console.warn('duplicate column', item.alias, item.name)
      }
      res[`${snakeCase(alias)}`] = item.sqlize()
    })
    return res
  }

  filter = (names) => {
    const newItems = this.items.filter((column) => {
      let flag = false
      names.forEach((name) => {
        if (name === column.name || name === `${column.table}.${column.name}`) {
          flag = true
        }
      })
      return flag
    })
    return new ColumnArray(newItems)
  }

  remove = (names) => {
    const newItems = this.items.filter((column) => {
      let flag = true
      names.forEach((name) => {
        if (name === column.name || name === `${column.table}.${column.name}`) {
          flag = false
        }
      })
      return flag
    })
    return new ColumnArray(newItems)
  }

  concat = (columns) => {
    const newItems = this.items.concat(columns.items)
    return new ColumnArray(newItems)
  }

  first = name => this.items.find(column => name === column.name || name === `${column.table}.${column.name}`)
}
