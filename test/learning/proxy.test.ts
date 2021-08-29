describe('Proxyオブジェクトのテスト', () => {
  test('オブジェクトを監視', () => {
    const targetObj = {
      name: 'Taro',
    }

    let isCalled = false

    const proxy = new Proxy(targetObj, {
      set (target: any, p: string | symbol, value: any, receiver: any): boolean {
        expect(value).toBe('Jiro')
        isCalled = true
        return Reflect.set(target, p, value, receiver)
      },
    })

    proxy.name = 'Jiro'
    expect(isCalled).toBeTruthy()
  })

  test('クラスオブジェクトを監視', () => {
    class Target {
      constructor (public name: string) {}
    }

    const targetObj = new Target('Taro')

    let isCalled = false

    const proxy = new Proxy(targetObj, {
      set (target: any, p: string | symbol, value: any, receiver: any): boolean {
        expect(value).toBe('Jiro')
        isCalled = true
        return Reflect.set(target, p, value, receiver)
      },
    })

    proxy.name = 'Jiro'
    expect(isCalled).toBeTruthy()
  })

  test('プライベートメソッドの変更を監視', () => {
    class Target {
      private _name: string

      constructor (name: string) {
        this._name = name
      }

      set name (name: string) {
        this._name = name
      }
    }

    const targetObj = new Target('Taro')

    let isCalled = false

    const proxy = new Proxy(targetObj, {
      set (target: any, p: string | symbol, value: any, receiver: any): boolean {
        expect(value).toBe('Jiro')
        isCalled = true
        return Reflect.set(target, p, value, receiver)
      },
    })

    proxy.name = 'Jiro'
    expect(isCalled).toBeTruthy()
  })
})
