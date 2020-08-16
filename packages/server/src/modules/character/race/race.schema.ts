import { modelOptions, mongoose, prop } from '@typegoose/typegoose'
import { dateUTCNow } from 'common/utils/dateUTCNow'

@modelOptions({
  schemaOptions: {
    timestamps: {
      currentTime: dateUTCNow,
    },
  },
})
export class RaceSchema {
  @prop({ required: true })
  type!: string

  @prop({ type: mongoose.Schema.Types.Mixed })
  choices?: any

  @prop()
  createdAt?: number

  @prop()
  updatedAt?: number
}
