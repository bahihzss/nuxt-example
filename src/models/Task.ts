type ConstructorArgs = {
  name: string
}

export class Task {
  constructor (
    readonly name: string,
  ) {}

  static create({ name }: ConstructorArgs) {
    return new Task(name)
  }
}