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
    expect(foundTask?.name).toBe(task.name)
  })

  test('update', async () => {
    await taskRepository.add(task)

    task.done()
    const beforeUpdate = await taskRepository.find('test-id')
    expect(beforeUpdate?.isDone).toBeFalsy()

    await taskRepository.update(task)
    const afterUpdate = await taskRepository.find('test-id')
    expect(afterUpdate?.isDone).toBeTruthy()
  })

  test('update:does-not-exists', async () => {
    const promise = taskRepository.update(task)
    await expect(promise).rejects.toThrowError(`Failed to update: 'test-id' does not exist.`)
  })

  test('observe', async () => {
    let count = 0
    let resolve: (value: unknown) => void
    const promise = new Promise(_resolve => { resolve = _resolve })
    const unsubscribe = taskRepository.observe((tasks) => {
      count++
      if (count === 2) {
        resolve(tasks)
      }
    })

    await taskRepository.add(task)
    await expect(promise).resolves.toEqual([task])
    unsubscribe()
    expect(count).toBe(2)
  })
})