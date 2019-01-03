import { checkObject } from './utils'

const { Task } = global.models

const taskDataAdd = { isCompleted: true, title: 'test title', content: 'test content', deadline: 2147483656 }
const taskDataUpdate = { isCompleted: false, title: 'test title', content: 'test content', deadline: 2147483656 }


describe('========== TASK ==========', () => {
  const task = new Task()
  let taskId = null

  it('addTask', async () => {
    try {
      const res = await task.add(taskDataAdd)
      taskId = res
    } catch (error) {
      throw error
    }
  })

  it('getTaskList', async () => {
    try {
      const res = await task.from().select().do()
      res.length.should.equal(7)
    } catch (error) {
      throw error
    }
  })

  it('getTask', async () => {
    try {
      const res = await task.from().where`id = ${taskId}`.select().do()
      checkObject(res[0], taskDataAdd)
    } catch (error) {
      throw error
    }
  })

  it('updateTask', async () => {
    try {
      const res = await task.update(taskDataUpdate, taskId)
      res.should.equal(200)
    } catch (error) {
      throw (error)
    }
  })
})
