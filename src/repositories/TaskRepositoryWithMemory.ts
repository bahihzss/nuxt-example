import { TaskRepository, TasksObserver } from '~/domain/TaskRepository'
import { Task } from '~/domain/Task'

type TaskData = {
  id: string
  name: string
  isDone: boolean
}

export class TaskRepositoryWithMemory implements TaskRepository {
  #observers: TasksObserver[] = []

  #tasks: TaskData[] = []

  get _tasks () {
    return this.#tasks.map(({ id, name, isDone }) => new Task(id, name, isDone))
  }

  async add (task: Task): Promise<boolean> {
    const { id, name, isDone } = task
    this.#tasks.push({ id, name, isDone })
    this.#observers.forEach(observer => { observer(this._tasks) })
    return true
  }

  observe (observer: TasksObserver): () => void {
    observer(this._tasks)

    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer)
    }

    return () => {
      const i = this.#observers.indexOf(observer)

      if (i >= 0) {
        this.#observers.splice(i, 1)
      }
    }
  }
}