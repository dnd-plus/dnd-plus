import { Either } from 'fp-ts/Either'
import { isRight } from 'fp-ts/These'

export function rightOrValue<R, V>(either: Either<any, R>, value: V) {
  return isRight(either) ? either.right : value
}
