export function createKey(...args: [unknown, unknown, ...unknown[]]) {
  return args.join(':')
}
