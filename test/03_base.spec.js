import { checkObject } from './utils'

const { Task } = global.models

const taskDataAdd = { isCompleted: true, title: 'test title', content: 'test content', deadline: 2147483656 }
const taskDataUpdate = { isCompleted: false, title: 'test title 2', content: 'test content 2', deadline: 2147483656 }


describe('========== TASK ==========', () => {
  const task = new Task()
  let taskId = null
  let taskIds = []

  it('paging', async () => {
    const params = {
      page: 0,
      pagesize: 3,
      filters: [
        { key: 'id', symbol: '>', value: 203388799060001 },
        { key: 'content', symbol: 'LIKE', value: '%task%' },
      ],
      orderBy: [
        { by: 'id', sort: 'desc' },
      ],
    }
    try {
      const res = await task.from().do({
        pkey: 'id',
        params,
      })
      res.total.should.equal(5)
      res.items.length.should.equal(3)
      res.items[0].id.should.equal(203388799060006)
    } catch (error) {
      throw error
    }
  })

  it('add', async () => {
    try {
      const res = await task.add(taskDataAdd)
      taskId = res
    } catch (error) {
      throw error
    }
  })

  it('batchAdd', async () => {
    try {
      const dataArray = [taskDataAdd, taskDataAdd, taskDataAdd]
      const res = await task.batchAdd(dataArray)
      res.length.should.equal(3)
      taskIds = res
    } catch (error) {
      throw error
    }
  })

  it('get', async () => {
    try {
      const res = await task.from().where`id = ${taskId}`.select(task.columns).do()
      checkObject(res[0], taskDataAdd, task)
    } catch (error) {
      throw error
    }
  })

  it('list', async () => {
    try {
      const res = await task.from().select().do()
      res.length.should.equal(10)
    } catch (error) {
      throw error
    }
  })


  it('update', async () => {
    try {
      const res = await task.update({
        data: taskDataUpdate,
        pkeyValue: taskId,
      })
      res.should.equal(taskId)
    } catch (error) {
      throw (error)
    }
  })

  it('batchUpdate', async () => {
    try {
      const paramsArray = [
        { data: taskDataUpdate, pkeyValue: taskIds[0] },
        { data: taskDataUpdate, pkeyValue: taskIds[1] },
        { data: taskDataUpdate, pkeyValue: taskIds[2] },
      ]
      const res = await task.batchUpdate(paramsArray)
      res.length.should.equal(3)
    } catch (error) {
      throw error
    }
  })

  // it('delete', async () => {
  //   try {
  //     const res = await task.delete(taskId)
  //     res.should.equal(200)
  //   } catch (error) {
  //     throw (error)
  //   }
  // })
})
