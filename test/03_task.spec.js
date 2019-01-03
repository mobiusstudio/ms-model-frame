import { checkObject } from './utils'

const { Task } = global.models

const taskDataAdd = { isCompleted: true, title: 'test title', content: 'test content', deadline: 2147483656 }
const taskDataUpdate = { isCompleted: false, title: 'test title', content: 'test content', deadline: 2147483656 }


describe('========== TASK ==========', () => {
  const task = new Task()
  let taskId = null

  it('add', async () => {
    try {
      const res = await task.add(taskDataAdd)
      taskId = res
    } catch (error) {
      throw error
    }
  })

  it('list', async () => {
    try {
      const res = await task.from().select().do()
      res.length.should.equal(7)
    } catch (error) {
      throw error
    }
  })

  it('get', async () => {
    try {
      const res = await task.from().where`id = ${taskId}`.select().do()
      checkObject(res[0], taskDataAdd)
    } catch (error) {
      throw error
    }
  })

  it('update', async () => {
    try {
      const res = await task.update(taskDataUpdate, taskId)
      res.should.equal(200)
    } catch (error) {
      throw (error)
    }
  })

  it('delete', async () => {
    try {
      const res = await task.delete(taskId)
      res.should.equal(200)
    } catch (error) {
      throw (error)
    }
  })
})
