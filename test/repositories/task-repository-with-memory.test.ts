import { Task } from '~/domain/Task'
import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'

describe('TaskRepositoryWithMemory', () => {
  test('add', async () => {
    const taskRepository = new TaskRepositoryWithMemory()
    const task = new Task('test-id', 'サンプルタスク')
    await taskRepository.add(task)
    expect(taskRepository._tasks).toEqual([task])
  })
})