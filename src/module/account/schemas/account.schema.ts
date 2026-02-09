import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'

@Schema({ collection: DB_COLLECTION.Account, versionKey: false })
export class Account {
  _id?: Types.ObjectId

  @Prop({ type: String, required: false })
  privateKey?: string

  @Prop({ type: String, required: false })
  seedPhrase?: string

  @Prop({ type: String, required: false })
  address?: string

  @Prop({ type: String, required: false })
  name?: string
}

export type AccountDocument = HydratedDocument<Account>;
export const AccountSchema = SchemaFactory.createForClass(Account)
