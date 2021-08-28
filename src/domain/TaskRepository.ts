import { Task } from '~/domain/Task'

export interface TaskRepository {
  add (task: Task): boolean
}