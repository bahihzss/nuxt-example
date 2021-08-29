import { Task } from '~/domain/Task'

export type TasksObserver = (tasks: Task[]) => void

export interface TaskRepository {
  add (task: Task): Promise<boolean>

  observe (observer: TasksObserver): () => void
}