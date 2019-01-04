const { DatabaseTable, ColumnArray, Column } = global.models

class Question extends DatabaseTable {
  constructor() {
    super('library', 'question')
    this.columns = new ColumnArray([
      new Column({
        name: 'id',
        alias: 'questionId',
        type: 'id',
      }),
      new Column({
        name: 'content',
        table: 'question',
        type: 'string',
      }),
      new Column({
        name: 'answerId',
        foreign: 'answer',
        type: 'id',
      }),
    ], this.tableName)
  }
}

class Answer extends DatabaseTable {
  constructor() {
    super('library', 'answer')
    this.columns = new ColumnArray([
      new Column({
        name: 'id',
        alias: 'answerId',
        type: 'id',
      }),
      new Column({
        name: 'description',
        type: 'id',
      }),
    ], this.tableName)
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

  it('paging', () => {
    const question = new Question()
    const pkey = 'id'
    const params = {
      page: 10,
      pagesize: 20,
      next: 15,
      filters: [
        { key: 'id', symbol: '>', value: 1000 },
        { key: 'content', symbol: 'LIKE', value: '%资料%' },
        { key: 'tag', symbol: '@>', value: ['a', 'b', 'c'] },
      ],
      orderBy: [
        { by: 'key1', sort: 'desc' },
        { by: 'key2', sort: 'asc' },
        { by: 'key3' },
      ],
    }
    const query = question.from().paging(pkey, params).sql
    query.text.should.equal('select * from "library".question where (id > $1) and (content LIKE $2) and (tag @> $3) order by key1 desc, key2 asc, key3 limit $4 offset $5')
    query.args[0].should.equal(1000)
    query.args[1].should.equal('%资料%')
    query.args[2][0].should.equal('a')
    query.args[2][1].should.equal('b')
    query.args[2][2].should.equal('c')
    query.args[3].should.equal(20)
    query.args[4].should.equal(200)
  })
})
