export function reactInstanceReader() {
  let reactInstanceKey: string

  function getReactInstance(element: any) {
    if (!reactInstanceKey) {
      const elementKeys = Object.keys(element)
      if (!elementKeys.length) {
        throw new Error('ReactInstance is not defined')
      }

      reactInstanceKey = elementKeys[0]!
    }

    return element[reactInstanceKey]
  }

  return {
    getUserId(element: Element): string {
      const reactInstance = getReactInstance(element)
      return reactInstance.return.key.split('-').at(0)
    }
  }
}
