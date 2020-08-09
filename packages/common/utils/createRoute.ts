export function createRoute<N extends string[] | true | undefined = undefined>(
  path: string,
) {
  type Link = N extends string[]
    ? (params: { [K in N[number]]: string }) => string
    : N extends true
    ? (id: string) => string
    : () => string

  type LinkParams = Link extends (arg: infer A) => any ? A : never

  return {
    path,
    toString: () => path,
    link: ((params: LinkParams) => {
      if (!params) {
        return path
      }
      if (typeof params === 'string') {
        return path.replace(/:\w+/i, params)
      }
      return Object.entries(params as Record<string, string>).reduce(
        (link, [key, value]) => link.replace(':' + key, value),
        path,
      )
    }) as Link,
  }
}
