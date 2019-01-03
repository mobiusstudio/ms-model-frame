const { DatabaseTable, ColumnArray, Column } = global.models

class Question extends DatabaseTable {
  constructor() {
    super('library', 'question')
    this.columns = new ColumnArray([
      new Column({ name: 'id', type: Column.Type.Id, alias: 'questionId', table: 'question' }),
      new Column({ name: 'content', type: Column.Type.String, table: 'question' }),
      new Column({ name: 'answerId', type: Column.Type.Id, table: 'question', foreign: 'answer' }),
    ])
  }
}

class Answer extends DatabaseTable {
  constructor() {
    super('library', 'answer')
    this.columns = new ColumnArray([
      new Column({ name: 'id', type: Column.Type.Id, alias: 'answerId', table: 'answer' }),
      new Column({ name: 'description', type: Column.Type.String, table: 'answer' }),
    ])
  }
}

describe('========== SELECT / JOIN / GROUP BY  ==========', () => {
  it('select all', () => {
    const question = new Question()
    const table = question.from().select()
    const { query } = table.state
    query.text.should.equal('select question.id question_id, question.content content, question.answer_id answer_id from "library".question')
    query.args.length.should.equal(0)
  })

  it('select equal(=)', () => {
    const question = new Question()
    const key = '资料'
    const table = question.from().where({ content: key }).select()
    const { query } = table.state
    query.text.should.equal('select question.id question_id, question.content content, question.answer_id answer_id from "library".question where (content = $1)')
    query.args[0].should.equal('资料')
  })

  it('select like', () => {
    const question = new Question()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.select()
    const { query } = table.state
    query.text.should.equal('select question.id question_id, question.content content, question.answer_id answer_id from "library".question where (content LIKE $1)')
    query.args[0].should.equal('%资料%')
  })

  it('join', () => {
    const question = new Question()
    const answer = new Answer()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.join(answer)
    const selected = table.columns.filter(['question.id', 'content', 'answer.id', 'description'])
    const { query } = table.select(selected).state
    query.text.should.equal('select question.id question_id, question.content content, answer.id answer_id, answer.description description from "library".question join "library".answer on (question.answer_id = answer.id) where (content LIKE $1)')
    query.args[0].should.equal('%资料%')
  })

  it('group by', () => {
    const question = new Question()
    const answer = new Answer()
    const key = '%资料%'
    const table = question.from().where`content LIKE ${key}`.join(answer)
    const aggrs = new ColumnArray([
      table.columns.first('id').aggr('array', 'aggr_id'),
      table.columns.first('content').aggr('array', 'aggr_content'),
    ])
    const { query } = table.groupBy(table.columns.filter(['answerId']), aggrs).state
    query.text.should.equal('select question.answer_id answer_id, array_agg(question.id) aggr_id, array_agg(question.content) aggr_content from "library".question join "library".answer on (question.answer_id = answer.id) where (content LIKE $1) group by (question.answer_id)')
    query.args[0].should.equal('%资料%')
  })
})
