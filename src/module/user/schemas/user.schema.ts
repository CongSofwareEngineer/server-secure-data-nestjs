import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: Types.ObjectId

  @Prop({ type: String, unique: true, required: true })
  phone: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: true })
  name: string
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User)
