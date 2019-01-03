const { Task } = global.models

describe('========== TASK ==========', () => {
  it('getList', async () => {
    const task = new Task()
    const getList = async () => {
      try {
        const res = await task.from().select().do()
        console.log(res)
      } catch (error) {
        throw error
      }
    }
    getList()
  })

  //   it('SELECT EQUAL(=)', () => {
  //     const question = new Question()
  //     const key = '资料'
  //     const table = question.from().where({ content: key }).select()
  //     const { query } = table.state
  //     query.text.should.equal('select question.id question_id, question.content content, question.answer_id answer_id from "library".question where (content = $1)')
  //     query.args[0].should.equal('资料')
  //   })

  //   it('SELECT LIKE', () => {
  //     const question = new Question()
  //     const key = '%资料%'
  //     const table = question.from().where`content LIKE ${key}`.select()
  //     const { query } = table.state
  //     query.text.should.equal('select question.id question_id, question.content content, question.answer_id answer_id from "library".question where (content LIKE $1)')
  //     query.args[0].should.equal('%资料%')
  //   })

  //   it('JOIN', () => {
  //     const question = new Question()
  //     const answer = new Answer()
  //     const key = '%资料%'
  //     const table = question.from().where`content LIKE ${key}`.join(answer)
  //     const selected = table.columns.filter(['question.id', 'content', 'answer.id', 'description'])
  //     const { query } = table.select(selected).state
  //     query.text.should.equal('select question.id question_id, question.content content, answer.id answer_id, answer.description description from "library".question join "library".answer on (question.answer_id = answer.id) where (content LIKE $1)')
  //     query.args[0].should.equal('%资料%')
  //   })

  //   it('GROUP BY', () => {
  //     const question = new Question()
  //     const answer = new Answer()
  //     const key = '%资料%'
  //     const table = question.from().where`content LIKE ${key}`.join(answer)
  //     const aggrs = new ColumnArray([
  //       table.columns.first('id').aggr('array', 'aggr_id'),
  //       table.columns.first('content').aggr('array', 'aggr_content'),
  //     ])
  //     const { query } = table.groupBy(table.columns.filter(['answerId']), aggrs).state
  //     query.text.should.equal('select question.answer_id answer_id, array_agg(question.id) aggr_id, array_agg(question.content) aggr_content from "library".question join "library".answer on (question.answer_id = answer.id) where (content LIKE $1) group by (question.answer_id)')
  //     query.args[0].should.equal('%资料%')
  //   })
})
