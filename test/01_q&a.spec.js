import { DatabaseTable, ColumnArray, Column } from '../src/models/core'

class Question extends DatabaseTable {
  constructor () {
    super('library', 'question')
    this.columns = new ColumnArray([
      new Column({ name: 'id', type: Column.Type.Id, alias: 'questionId', table: 'question' }),
      new Column({ name: 'content', type: Column.Type.String, table: 'question' }),
      new Column({ name: 'answerId', type: Column.Type.Id, table: 'question', foreign: 'answer' }),
    ])
  }
}

class Answer extends DatabaseTable {
  constructor () {
    super('library', 'answer')
    this.columns = new ColumnArray([
      new Column({ name: 'id', type: Column.Type.Id, alias: 'answerId', table: 'answer' }),
      new Column({ name: 'description', type: Column.Type.String, table: 'answer' }),
    ])
  }
}

  // ATTENTION: where usage: https://sqorn.org/docs/operations.html

describe('========== SELECT / JOIN / GROUP BY  ==========', () => {
  it('SELECT ALL', () => {
    const question = new Question()
    const table = question.from().select()
    table.do()
  })

  it('SELECT EQUAL(=)', () => {
    const question = new Question()
    const key = '资料'
    const table = question.from().where({content: key}).select()
    table.do()
  })

  it('SELECT LIKE', () => {
    const question = new Question()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.select()
    table.do()
  })

  it('JOIN', () => {
    const question = new Question()
    const answer = new Answer()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.join(answer)
    const selected = table.columns.filter(['question.id', 'content', 'answer.id', 'description'])
    table.select(selected).do()
  })

  it('GROUP BY', () => {
    const question = new Question()
    const answer = new Answer()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.join(answer)
    const aggrs = new ColumnArray([
      table.columns.first('id').aggr('array', 'aggr_id'),
      table.columns.first('content').aggr('array', 'aggr_content')
    ])
    table.groupBy(table.columns.filter(['answerId']), aggrs).do()
  })
})