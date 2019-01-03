
export class BaseColumn {
  constructor({ name, alias, foreign, table, rule }) {
    this.name = name
    this.foreign = foreign
    this.alias = alias
    this.table = table
    this.rule = rule
  }

  static Type = {
    Boolean: 1,
    Number: 2,
    String: 3,
    Id: 4,
    Utc: 5,
  }
}
