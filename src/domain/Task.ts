type ConstructorArgs = {
  name: string
}

export class Task {
  #isDone = false

  constructor (
    readonly name: string,
  ) {}

  static create ({ name }: ConstructorArgs) {
    return new Task(name)
  }

  public done () {
    this.#isDone = true
  }

  get isDone () {
    return this.#isDone
  }
}