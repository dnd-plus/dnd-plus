import { useState } from 'react'
import Fuse from 'fuse.js'

export function useFuse<T>(
  data: ReadonlyArray<T>,
  options?: Fuse.IFuseOptions<T>,
) {
  const [term, setTerm] = useState('')

  const fuseOptions = {
    threshold: options?.threshold || 0.4,
    ...options,
  }

  const fuse = new Fuse(data, fuseOptions)

  const result = term ? fuse.search(`${term}`).map(({ item }) => item) : data

  const reset = () => setTerm('')

  return { result, search: setTerm, term, reset }
}
