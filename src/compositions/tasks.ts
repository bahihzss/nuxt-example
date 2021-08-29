import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'
import { getCurrentInstance, onUnmounted, ref } from '@nuxtjs/composition-api'
import { Task } from '~/domain/Task'

export const useTasks = () => {
  const tasksRepository = new TaskRepositoryWithMemory()
  const tasks = ref<Task[]>([])

  const clean = tasksRepository.observe((_tasks) => {
    tasks.value = _tasks
  })

  const create = async (name: string) => {
    const task = Task.create({ name })
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