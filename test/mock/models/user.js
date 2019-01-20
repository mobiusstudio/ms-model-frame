import { DatabaseTable } from './core'

export class User extends DatabaseTable {
  constructor() {
    super({
      schemaName: 'user',
      tableName: 'user',
      pkeyIndex: 0,
      columns: [
        {
          type: 'id-auto',
          name: 'id',
        },
        {
          type: 'string',
          name: 'username',
        },
        {
          type: 'password',
          name: 'passward',
        },
        {
          type: 'string',
          name: 'idToken',
        },
      ],
    })
  }
}

export class Profile extends DatabaseTable {
  constructor() {
    super({
      schemaName: 'user',
      tableName: 'profile',
      pkeyIndex: 0,
      columns: [
        {
          type: 'id',
          name: 'userId',
          foreign: 'user',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'int',
          name: 'age',
        },
        {
          type: 'id',
          name: 'loverId',
          foreign: ['user', 'user'],
          required: 'true',
        },
        {
          type: 'id',
          name: 'carId',
          foreign: ['car', 'car'],
        },
      ],
    })
  }
}
