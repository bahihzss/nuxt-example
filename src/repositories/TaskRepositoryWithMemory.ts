import { TaskRepository } from '~/domain/TaskRepository'
import { Task } from '~/domain/Task'

export class TaskRepositoryWithMemory implements TaskRepository {
  #tasks: Task[] = []

  get _tasks () {
    return this.#tasks
  }

  async add (task: Task): Promise<boolean> {
    this.#tasks.push(task)
    return true
  }
}