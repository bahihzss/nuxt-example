import { TaskRepository, TasksObserver } from '~/domain/TaskRepository'
import { Task } from '~/domain/Task'

export class TaskRepositoryWithMemory implements TaskRepository {
  #observers: TasksObserver[] = []

  #tasks: Task[] = new Proxy([], {
    set: (tasks: Task[], key: string | symbol, value: any, tasksReceiver: any): boolean => {
      if (value instanceof Task) {
        const taskProxy = new Proxy(value, {
          set: (task: Task, key: string | symbol, value: any, taskReceiver: any): boolean => {
            Reflect.set(task, key, value, taskReceiver)
            if (key in task) {
              this.#observers.forEach(observer => observer(tasksReceiver))
            }
            return true
          },
        })
        Reflect.set(tasks, key, taskProxy, tasksReceiver)
        this.#observers.forEach(observer => observer(tasksReceiver))
        return true
      }

      return Reflect.set(tasks, key, value, tasksReceiver)
    },
  })

  get _tasks () {
    return this.#tasks
  }

  async add (task: Task): Promise<boolean> {
    this.#tasks.push(task)
    return true
  }

  observe (observer: TasksObserver): () => void {
    observer(this.#tasks)

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