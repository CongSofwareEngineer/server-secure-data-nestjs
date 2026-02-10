import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'

@Schema({ collection: DB_COLLECTION.AccountCloud, versionKey: false })
export class AccountCloud {
  _id?: Types.ObjectId

  @Prop({ type: String, unique: true, required: true, trim: true })
  userName: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: false })
  pinCode?: string

  @Prop({ type: String, required: false })
  stk?: string

  @Prop({ type: String, required: false })
  pinCodeBackup?: string
}

export type AccountCloudDocument = HydratedDocument<AccountCloud>;
export const AccountCloudSchema = SchemaFactory.createForClass(AccountCloud)
