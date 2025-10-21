import { Exclude } from 'class-transformer'

export class UserModal {
  id: number
  email: string
  name: string
  @Exclude() password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<UserModal>) {
    Object.assign(this, partial)
  }
}
