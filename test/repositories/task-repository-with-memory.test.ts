import { Task } from '~/domain/Task'
import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'

describe('TaskRepositoryWithMemory', () => {
  test('add', async () => {
    const taskRepository = new TaskRepositoryWithMemory()
    const task = new Task('test-id', 'サンプルタスク')
    await taskRepository.add(task)
    expect(taskRepository._tasks).toEqual([task])
  })

  test('observe', async () => {
    const taskRepository = new TaskRepositoryWithMemory()
    const task = new Task('test-id', 'サンプルタスク')

    let count = 0
    let resolve = (_: any) => {}
    const promise = new Promise(_resolve => { resolve = _resolve })

    const unsubscribe = taskRepository.observe((tasks) => {
      count++

      if (count === 2) {
        tasks[0].done()
      }

      if (count === 3) {
        expect(tasks[0].isDone).toBeTruthy()
        resolve(null)
      }
    })

    await taskRepository.add(task)
    await promise
    unsubscribe()
    expect(count).toBe(3)
  })
})