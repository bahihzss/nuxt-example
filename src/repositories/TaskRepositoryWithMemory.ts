import { TaskRepository, TasksObserver } from '~/domain/TaskRepository'
import { Task } from '~/domain/Task'

type TaskData = {
  id: string
  title: string
  isDone: boolean
}

export class TaskRepositoryWithMemory implements TaskRepository {
  #observers: TasksObserver[] = []

  #tasks: TaskData[] = []

  get _tasks () {
    return this.#tasks.map(({ id, title, isDone }) => new Task(id, title, isDone))
  }

  async find (id: string): Promise<Task | null> {
    return this._tasks.find((task) => task.id === id) ?? null
  }

  async add (task: Task): Promise<boolean> {
    if (!await this.exists(task.id)) {
      const { id, title, isDone } = task
      this.#tasks.push({ id, title, isDone })
      this.runObservers()
      return true
    }
    throw new Error(`Failed to add: '${task.id}' already exists.`)
  }

  async update (task: Task): Promise<boolean> {
    if (await this.exists(task.id)) {
      const { id, title, isDone } = task
      const index = this._tasks.map(({ id }) => id).indexOf(task.id)
      this.#tasks.splice(index, 1, { id, title, isDone })
      this.runObservers()
      return true
    }
    throw new Error(`Failed to update: '${task.id}' does not exist.`)
  }

  async exists (id: string): Promise<boolean> {
    return (await this.find(id)) !== null
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

  private runObservers () {
    this.#observers.forEach(observer => { observer(this._tasks) })
  }
}