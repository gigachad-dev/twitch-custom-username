import { REACT_INSTANCE_PREFIX } from './constants.js'

class ReactInstanceReader {
  private reactInternalInstanceKey: string | null = null

  private getReactInstance(element: any): any {
    if (!this.reactInternalInstanceKey) {
      const reactInternalInstanceKey = Object.keys(element).find((key) =>
        key.startsWith(REACT_INSTANCE_PREFIX)
      )

      if (!reactInternalInstanceKey) {
        throw new Error(`${REACT_INSTANCE_PREFIX} is not defined`)
      }

      this.reactInternalInstanceKey = reactInternalInstanceKey
    }

    return element[this.reactInternalInstanceKey]
  }

  getUserId(element: Element): string | null {
    const reactInstance = this.getReactInstance(element)
    const reactKey = reactInstance.return.key
    if (!reactKey) return null
    return reactInstance.return.key.split('-').at(0)
  }
}

export const reactInstanceReader = new ReactInstanceReader()
