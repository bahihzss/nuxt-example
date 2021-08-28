import { Task } from '~/models/Task'

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
})