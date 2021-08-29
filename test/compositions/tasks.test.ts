import { useTasks } from '~/compositions/tasks'
import { watch } from '@nuxtjs/composition-api'

describe('useTasks', () => {
  test('空のtasks', () => {
    const { tasks } = useTasks()
    expect(tasks.value).toEqual([])
  })

  test('タスクを新規追加', async () => {
    const { tasks, create } = useTasks()

    let resolve = (_: any) => {}
    const promise = new Promise(_resolve => { resolve = _resolve })

    const unwatch = watch(tasks, (tasks) => {
      expect(tasks[0].name).toBe('サンプルタスク')
      resolve(null)
    })

    await create('サンプルタスク')
    await promise
    unwatch()
  })
})