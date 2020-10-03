import PQueue from 'p-queue'

export class EntityQueue {
  private entityMap = new Map<string, PQueue>()

  waitCurrentTasks(id: string) {
    const currentPQueue = this.entityMap.get(id)

    if (currentPQueue) {
      const nextPQueue = new PQueue()
      nextPQueue.add(() => currentPQueue.onIdle())
      this.entityMap.set(id, nextPQueue)

      return currentPQueue.onIdle()
    } else {
      return Promise.resolve()
    }
  }

  createTask(id: string) {
    let done = () => {}

    const promise = new Promise((r) => {
      done = r
    })

    let pQueue = this.entityMap.get(id)
    if (!pQueue) {
      pQueue = new PQueue()
      this.entityMap.set(id, pQueue)
    }

    pQueue.add(() => promise)

    return done
  }
}
