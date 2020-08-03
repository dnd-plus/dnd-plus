import React, { MutableRefObject, ReactNode } from 'react'

function Runner<DataItem, Arg>({
  dataRef,
  index,
  hook,
  arg,
  isParentRenderRef,
  updateParent,
}: {
  dataRef: MutableRefObject<Record<any, DataItem>>
  arg?: Arg
  hook: (arg?: Arg) => DataItem
  index: number | string
  isParentRenderRef: MutableRefObject<boolean>
  updateParent: () => void
}) {
  dataRef.current[index] = hook(arg)
  if (!isParentRenderRef.current) {
    updateParent()
  }
  return null
}

function Renderer<Data>({
  dataRef,
  render,
}: {
  dataRef: MutableRefObject<Data>
  render: (data: Data) => any
}) {
  return render(dataRef.current)
}

export function MapHooks<Arg, Hooks extends object>({
  arg,
  hooks,
  render,
}: {
  arg?: Arg
  hooks: Hooks
  render: (
    results: {
      [K in keyof Hooks]: Hooks[K] extends (arg?: Arg) => any
        ? ReturnType<Hooks[K]>
        : Hooks[K]
    },
  ) => ReactNode
}) {
  type DataItem = typeof render extends (arg: infer T) => any ? T : never

  const dataRef = React.useRef(
    Array.isArray(hooks) ? [] : {},
  ) as MutableRefObject<DataItem>

  const isParentRenderRef = React.useRef(true)

  const [, updateParent] = React.useReducer((x) => x + 1, 0)

  isParentRenderRef.current = true
  React.useLayoutEffect(() => {
    isParentRenderRef.current = false
  })

  const hooksNode = React.useMemo(
    () =>
      Object.entries(hooks).map(([key, hook]) => (
        <Runner
          {...{
            key,
            arg,
            index: key,
            hook,
            dataRef,
            isParentRenderRef,
            updateParent,
          }}
        />
      )),
    [hooks, arg, dataRef],
  )

  return (
    <>
      {hooksNode}
      <Renderer {...{ dataRef, render }} />
    </>
  )
}
