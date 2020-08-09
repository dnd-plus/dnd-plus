import ObjectID from 'bson-objectid'
import { nanoid } from '@reduxjs/toolkit'

export function createObjectId(): string {
  return new ObjectID(nanoid(12)).str
}
