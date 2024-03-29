import React, {
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { observer, Observer } from 'mobx-react-lite'

const Runner = React.memo(
  observer(function Runner<DataItem, Arg>({
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
    const isParentRender = isParentRenderRef.current
    useLayoutEffect(() => {
      if (!isParentRender) {
        updateParent()
      }
    })
    return null
  }),
)

function Renderer<Data>({
  dataRef,
  render,
}: {
  dataRef: MutableRefObject<Data>
  render: (data: Data) => any
}) {
  return <Observer render={() => render(dataRef.current)} />
}

// eslint-disable-next-line @typescript-eslint/ban-types
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

  const dataRef = useRef(
    Array.isArray(hooks) ? [] : {},
  ) as MutableRefObject<DataItem>

  const isParentRenderRef = useRef(true)

  const [, updateParent] = useReducer((x) => x + 1, 0)

  isParentRenderRef.current = true
  useLayoutEffect(() => {
    isParentRenderRef.current = false
  })

  const hooksNode = useMemo(
    () =>
      Object.entries(hooks).map(([key, hook]) => (
        <Runner
          key={key}
          {...{
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
