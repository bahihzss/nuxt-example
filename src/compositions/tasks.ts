import { TaskRepositoryWithMemory } from '~/repositories/TaskRepositoryWithMemory'
import { ref } from '@nuxtjs/composition-api'
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

  return {
    tasks,
    clean,
    create,
  }
}