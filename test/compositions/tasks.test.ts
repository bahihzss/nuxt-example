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
      resolve(tasks[0].title)
    })

    await create('サンプルタスク')
    await expect(promise).resolves.toBe('サンプルタスク')
    unwatch()
    clean()
  })

  test('タスクを完了', async () => {
    const { tasks, create, done, clean } = useTasks()

    await create('サンプルタスク')

    let resolve = (_: any) => {}
    const promise = new Promise(_resolve => { resolve = _resolve })

    const unwatch = watch(tasks, (tasks) => {
      resolve(tasks[0].isDone)
    })

    await done(tasks.value[0].id)
    await expect(promise).resolves.toBeTruthy()
    unwatch()
    clean()
  })
})