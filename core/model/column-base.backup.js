export class ColumnBase {
  constructor({ table, type, name, alias, foreign, default: def = null, required = false }) {
    this.table = table
    this.type = type
    this.name = name
    this.alias = alias
    this.foreign = foreign
    this.default = def
    this.required = required
  }
}
