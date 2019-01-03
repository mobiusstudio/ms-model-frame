import { DatabaseTable, Column, ColumnArray } from './core'

export class Task extends DatabaseTable {
  constructor() {
    super('task', 'task')
    this.columns = new ColumnArray([
      new Column({
        name: 'id',
        alias: 'taskId',
        rule: '',
      }),
      new Column({
        name: 'isCompleted',
        rule: '',
      }),
      new Column({
        name: 'title',
        rule: '',
      }),
      new Column({
        name: 'content',
        alias: 'task_content',
        rule: '',
      }),
      new Column({
        name: 'deadline',
        rule: '',
      }),
    ], this.tableName)
  }
}
