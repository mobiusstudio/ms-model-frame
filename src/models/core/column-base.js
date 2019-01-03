export class BaseColumn {
  constructor({ name, type, alias, foreign, table }) {
    this.name = name
    this.type = type
    this.foreign = foreign
    this.alias = alias
    this.table = table
  }
}
