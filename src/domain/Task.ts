import { autoId } from '~/utils/string'

type ConstructorArgs = {
  name: string
}

export class Task {
  constructor (
    readonly id: string,
    readonly name: string,
    private _isDone = false,
  ) {}

  static create ({ name }: ConstructorArgs) {
    return new Task(autoId(), name)
  }

  public done () {
    this._isDone = true
  }

  get isDone () {
    return this._isDone
  }
}