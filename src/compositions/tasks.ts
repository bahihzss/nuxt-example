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

  if (getCurrentInstance() !== null) {
    onUnmounted(clean)
  }

  return {
    tasks,
    create,
    clean,
  }
}