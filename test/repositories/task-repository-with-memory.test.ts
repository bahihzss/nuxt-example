import { Task } from '~/domain/Task'
import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'

describe('TaskRepositoryWithMemory', () => {
  test('add', () => {
    const task = new Task('サンプルタスク')
    const taskRepository = new TaskRepositoryWithMemory()
    taskRepository.add(task)
    expect(taskRepository._tasks).toEqual([task])
  })
})