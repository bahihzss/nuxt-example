import { TaskRepository } from '~/domain/TaskRepository'
import { Task } from '~/domain/Task'

export class TaskRepositoryWithMemory implements TaskRepository {
  #tasks: Task[] = []

  get _tasks () {
    return this.#tasks
  }

  add (task: Task): boolean {
    this.#tasks.push(task)
    return true
  }
}