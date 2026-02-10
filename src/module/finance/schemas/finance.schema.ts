import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'

export enum FinanceStatus {
  Withdraw = 'Withdraw',
  Deposit = 'Deposit',
}

@Schema({ collection: DB_COLLECTION.Finance, versionKey: false, timestamps: { createdAt: true, updatedAt: false } })
export class Finance {
  _id?: Types.ObjectId


  @Prop({ type: Number, required: true })
  usdAmount: number

  @Prop({ type: Number, required: true })
  vndAmount: number

  @Prop({ type: String, enum: FinanceStatus, required: true })
  status: FinanceStatus
}

export type FinanceDocument = HydratedDocument<Finance>;
export const FinanceSchema = SchemaFactory.createForClass(Finance)
