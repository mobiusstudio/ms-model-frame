import { DatabaseTable } from '../../core/model'

export class Task extends DatabaseTable {
  constructor() {
    super({
      schemaName: 'task',
      tableName: 'task',
      pkeyIndex: 0,
      columns: [
        {
          name: 'id',
          alias: 'taskId',
          type: 'id',
          required: true,
        },
        {
          name: 'isCompleted',
          type: 'boolean',
          default: false,
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'content',
          alias: 'taskContent',
          type: 'string',
        },
        {
          name: 'deadline',
          type: 'timestamp',
        },
      ],
    })
  }
}
