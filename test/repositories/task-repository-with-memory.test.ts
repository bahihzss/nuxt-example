import { Task } from '~/domain/Task'
import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'

describe('TaskRepositoryWithMemory', () => {
  let task: Task
  let taskRepository: TaskRepositoryWithMemory

  beforeEach(() => {
    task = new Task('test-id', 'サンプルタスク')
    taskRepository = new TaskRepositoryWithMemory()
  })

  test('add', async () => {
    await taskRepository.add(task)
    expect(taskRepository._tasks).toEqual([task])
  })

  test('find', async () => {
    await taskRepository.add(task)
    const foundTask = await taskRepository.find('test-id')
    expect(foundTask).not.toBeNull()
    expect(foundTask!.name).toBe(task.name)
  })

  test('observe', async () => {
    let count = 0
    let resolve = (_: any) => {}
    const promise = new Promise(_resolve => { resolve = _resolve })
    const unsubscribe = taskRepository.observe((tasks) => {
      count++
      if (count === 2) {
        expect(tasks).toEqual([task])
        resolve(null)
      }
    })

    await taskRepository.add(task)
    await promise
    unsubscribe()
    expect(count).toBe(2)
  })
})