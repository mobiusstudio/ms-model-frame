import { DatabaseTable, Column } from './core'

export class Task extends DatabaseTable {
  constructor(data) {
    super('task', 'task')
    const columns = []
    if (data) {
      if (data.id || data.id === 0) {
        columns.push(new Column({ name: 'id', type: Column.Type.Id, alias: 'taskId', table: this.tableName }))
      }
      if (data.isCompleted || data.isCompleted === false) {
        columns.push(new Column({ name: 'isCompleted', type: Column.Type.Boolean, table: this.tableName }))
      }
      if (data.title || data.id === '') {
        columns.push(new Column({ name: 'title', type: Column.Type.String, table: this.tableName }))
      }
      if (data.content || data.id === '') {
        columns.push(new Column({ name: 'content', type: Column.Type.String, table: this.tableName }))
      }
      if (data.deadline || data.id === 0) {
        columns.push(new Column({ name: 'deadline', type: Column.Type.Utc, table: this.tableName }))
      }
    }
  }
}
