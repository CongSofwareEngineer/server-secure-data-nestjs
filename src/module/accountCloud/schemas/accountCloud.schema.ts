import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'

@Schema({ collection: DB_COLLECTION.AccountCloud, versionKey: false, timestamps: false })
export class AccountCloud {
  _id?: Types.ObjectId

  @Prop({ type: String, required: false, unique: false })
  nameApp?: string

  @Prop({ type: String, required: true, unique: false })
  userName: string

  @Prop({ type: String, required: true, unique: false })
  password: string

  @Prop({ type: String, required: false, unique: false })
  pinCode?: string

  @Prop({ type: String, required: false, unique: false })
  stk?: string

  @Prop({ type: String, required: false, unique: false })
  pinCodeBackup?: string

  @Prop({ type: String, required: false, unique: false })
  type?: string
}

export type AccountCloudDocument = HydratedDocument<AccountCloud>;
export const AccountCloudSchema = SchemaFactory.createForClass(AccountCloud)
