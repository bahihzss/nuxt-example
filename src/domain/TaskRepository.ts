import { Task } from '~/domain/Task'

export type TasksObserver = (tasks: Task[]) => void

export interface TaskRepository {
  find (id: string): Promise<Task | null>

  add (task: Task): Promise<boolean>

  observe (observer: TasksObserver): () => void

  update (task: Task): Promise<boolean>

  exists (id: string): Promise<boolean>
}