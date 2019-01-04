import fs from 'fs'
import path from 'path'
import { sqlizeListParams } from '../src/utils'

describe('========== FAKE DATA ==========', () => {
  it('create', async () => {
    const dataPath = path.join(__dirname, './mock/data')
    const files = fs.readdirSync(dataPath)
    files.sort()
    const queryArr = []
    files.forEach((f) => {
      queryArr.push(fs.readFileSync(path.join(dataPath, f.toString())))
    })
    const query = queryArr.join(';')
    await db.query(query)
  })
  it('check', async () => {
    const checkQuery = `
      SELECT * FROM "task".task
    `
    const res = await db.query(checkQuery)
    res.rowCount.should.equal(6)
    res.rows.forEach((item, index) => {
      item.id.should.equal(parseInt(`20338879906000${index + 1}`, 10))
      item.is_completed.should.equal(index % 2 === 1)
      item.title.should.equal(`task_0${index + 1}`)
      item.content.should.equal(`test task 0${index + 1}`)
      item.deadline.should.equal(parseInt(`151600827000${index + 1}`, 10))
      item.create_time.should.equal(parseInt(`151600827001${index + 1}`, 10))
      item.last_update_time.should.equal(parseInt(`151600827002${index + 1}`, 10))
    })
  })
})

describe('========== LIST PARAMS ==========', () => {
  it('filter', () => {
    const params = {
      filters: ['wow LIKE \'%TEMP%\'', 'userId >= 1', 'userName = \'Lily\'', 'users @> array[1]'],
    }
    const string = sqlizeListParams('id', params)
    string.should.equal(' WHERE wow LIKE \'%TEMP%\' AND user_id >= 1 AND user_name = \'Lily\' AND users @> array[1] ORDER BY id DESC ')
  })

  it('count', () => {
    const params = {
      next: 100,
      pagesize: 1,
      orderBy: 'id desc',
    }
    const str = sqlizeListParams('id', params, true)
    str.should.equal('   ')
  })

  it('order by', () => {
    const params = {
      pagesize: 10,
      orderBy: 'id desc',
    }
    const string = sqlizeListParams('id', params)
    string.should.equal('  ORDER BY id DESC LIMIT 10')
  })
})
