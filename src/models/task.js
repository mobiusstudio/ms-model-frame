import { DatabaseTable, Column, ColumnArray } from './core'

export class Task extends DatabaseTable {
  constructor() {
    super('task', 'task')
    this.columns = new ColumnArray([
      new Column({
        name: 'id',
        alias: 'taskId',
        type: 'id',
        required: true,
      }),
      new Column({
        name: 'isCompleted',
        type: 'boolean',
        def: false,
      }),
      new Column({
        name: 'title',
        type: 'string',
      }),
      new Column({
        name: 'content',
        alias: 'taskContent',
        type: 'string',
      }),
      new Column({
        name: 'deadline',
        type: 'timestamp',
      }),
    ], this.tableName)
  }
}
