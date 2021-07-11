type Rec = Record<string | number | symbol, unknown>

type Entry<T extends Rec> = T extends any
  ? { [K in keyof T]-?: [K, T[K]] }[keyof T]
  : never

export function entries<T extends Rec>(obj: T | undefined) {
  return obj ? (Object.entries(obj) as Array<Entry<T>>) : []
}

export function keys<T extends Rec>(obj: T | undefined) {
  return obj ? (Object.keys(obj) as Array<keyof T>) : []
}

export function mapValues<T extends Rec, R>(
  obj: T | undefined,
  mapper: (key: keyof T, value: T[keyof T], index: number) => R,
) {
  return keys(obj).reduce((res, key, index) => {
    res[key] = mapper(key, obj![key], index)
    return res
  }, {} as Record<keyof T, R>)
}
