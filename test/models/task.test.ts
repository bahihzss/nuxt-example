import { Task } from '~/domain/Task'

describe('Taskモデル', () => {
  test('コンストラクタ', () => {
    const task = new Task('test-id', 'サンプルタスク')
    expect(task.name).toBe('サンプルタスク')
    expect(task.id).toBe('test-id')
  })

  test('Task.create', () => {
    const task = Task.create({ name: 'サンプルタスク' })
    expect(task.name).toEqual('サンプルタスク')
    // noinspection SuspiciousTypeOfGuard
    expect(typeof task.id === 'string').toBeTruthy()
    expect(task.id.length === 20).toBeTruthy()
  })

  test('Task.done', () => {
    const task = new Task('test-id', 'サンプルタスク')
    expect(task.isDone).toBe(false)
    task.done()
    expect(task.isDone).toBe(true)
  })
})