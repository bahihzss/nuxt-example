import { autoId } from '~/utils/string'

type ConstructorArgs = {
  title: string
}

export class Task {
  constructor (
    readonly id: string,
    readonly title: string,
    private _isDone = false,
  ) {}

  static create ({ title }: ConstructorArgs) {
    return new Task(autoId(), title)
  }

  public done () {
    this._isDone = true
  }

  get isDone () {
    return this._isDone
  }
}