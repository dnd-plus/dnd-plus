export function createRoute<N extends string[] | true | undefined = undefined>(
  ...paths: string[]
) {
  const path = paths[paths.length - 1]
  const linkPath = paths.join('/').replace(/\/\/+/g, '/')

  type Link = N extends string[]
    ? (params: { [K in N[number]]: string }) => string
    : N extends true
    ? (id: string) => string
    : () => string

  type LinkParams = Link extends (arg: infer A) => any ? A : never

  return {
    path: path,
    linkPath,
    toString: () => path,
    link: ((params: LinkParams) => {
      if (!params) {
        return linkPath
      }
      if (typeof params === 'string') {
        return linkPath.replace(/:\w+/i, params)
      }
      return Object.entries(params as Record<string, string>).reduce(
        (link, [key, value]) => link.replace(':' + key, value),
        linkPath,
      )
    }) as Link,
  }
}
