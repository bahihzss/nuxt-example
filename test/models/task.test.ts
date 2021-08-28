import { Task } from '~/domain/Task'

describe('Taskモデル', () => {
  let task: Task
  beforeEach(() => {
    task = new Task('サンプルタスク')
  })

  test('コンストラクタ', () => {
    expect(task.name).toBe('サンプルタスク')
  })

  test('Task.create', () => {
    const createdTask = Task.create({ name: 'サンプルタスク' })
    expect(createdTask).toEqual(task)
  })

  test('Task.done', () => {
    expect(task.isDone).toBe(false)
    task.done()
    expect(task.isDone).toBe(true)
  })
})