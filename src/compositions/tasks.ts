import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'
import { getCurrentInstance, onUnmounted, ref } from '@nuxtjs/composition-api'
import { Task } from '~/domain/Task'

type TaskDto = {
  readonly id: string
  readonly title: string
  readonly isDone: boolean
}

export const useTasks = () => {
  const tasksRepository = new TaskRepositoryWithMemory()
  const tasks = ref<TaskDto[]>([])

  const clean = tasksRepository.observe((_tasks) => {
    tasks.value = _tasks.map(({ id, title, isDone }) => Object.freeze({ id, title, isDone }))
  })

  const create = async (title: string) => {
    const task = Task.create({ title })
    await tasksRepository.add(task)
  }

  const done = async (id: string) => {
    const task = await tasksRepository.find(id)
    if (task) {
      task.done()
      tasksRepository.update(task)
      return
    }
    throw new Error(`Failed to done: '${id}' does not exist.`)
  }

  if (getCurrentInstance() !== null) {
    onUnmounted(clean)
  }

  return {
    tasks,
    create,
    done,
    clean,
  }
}