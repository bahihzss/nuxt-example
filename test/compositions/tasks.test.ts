import { useTasks } from '~/compositions/tasks'
import { watch } from '@nuxtjs/composition-api'

describe('useTasks', () => {
  test('空のtasks', () => {
    const { tasks } = useTasks()
    expect(tasks.value).toEqual([])
  })

  test('タスクを新規追加', async () => {
    const { tasks, create, clean } = useTasks()

    let resolve = (_: any) => {}
    const promise = new Promise(_resolve => { resolve = _resolve })

    const unwatch = watch(tasks, (tasks) => {
      resolve(tasks[0].name)
    })

    await create('サンプルタスク')
    await expect(promise).resolves.toBe('サンプルタスク')
    unwatch()
    clean()
  })
})