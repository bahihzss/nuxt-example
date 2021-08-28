import { Task } from '~/models/Task'

describe('Taskモデル', () => {
  test('コンストラクタ', () => {
    const task = new Task('サンプルタスク')
    expect(task.name).toEqual('サンプルタスク')
  })
})