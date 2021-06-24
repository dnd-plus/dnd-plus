import { mapValues } from 'lodash-es'
import { isObservable, toJS } from 'mobx'

export function deepToJS<T extends unknown>(value: T): T {
  if (isObservable(value)) {
    return toJS(value)
  } else if (typeof value === 'object' && value) {
    if (Array.isArray(value)) {
      return value.map(deepToJS) as T
    } else {
      return mapValues(value as any, deepToJS) as T
    }
  } else {
    return value
  }
}
