import { autoId } from '~/utils/string'

type ConstructorArgs = {
  name: string
}

export class Task {
  #isDone = false

  constructor (
    readonly id: string,
    readonly name: string,
  ) {}

  static create ({ name }: ConstructorArgs) {
    return new Task(autoId(), name)
  }

  public done () {
    this.#isDone = true
  }

  get isDone () {
    return this.#isDone
  }
}