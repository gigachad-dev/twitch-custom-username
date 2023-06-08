class ReactInstanceReader {
  private reactInstanceKey: string | null = null

  private getReactInstance(element: any) {
    if (!this.reactInstanceKey) {
      const elementKeys = Object.keys(element)
      if (!elementKeys.length) {
        throw new Error('ReactInstance is not defined')
      }
      this.reactInstanceKey = elementKeys[0]!
    }

    return element[this.reactInstanceKey]
  }

  getUserId(element: Element): string | null {
    const reactInstance = this.getReactInstance(element)
    const reactKey = reactInstance.return.key
    if (!reactKey) return null
    return reactInstance.return.key.split('-').at(0)
  }
}

export const reactInstanceReader = new ReactInstanceReader()
