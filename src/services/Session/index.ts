import { ClientSession, Model } from 'mongoose'

class SessionService<T> {
  private session: ClientSession
  private readonly model: Model<T>
  constructor(model: any) {
    this.model = model
  }

  async startSession(): Promise<void> {
    this.session = await this.model.startSession()
    this.session.startTransaction()
  }

  async endSession(): Promise<void> {
    await this.session.commitTransaction()
    await this.session.endSession()
  }

  async abortSession(): Promise<void> {
    await this.session.abortTransaction()
    await this.session.endSession()
  }

  getSession(): ClientSession {
    return this.session
  }
}

export default SessionService