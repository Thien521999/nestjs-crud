export class PostModal {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<PostModal>) {
    Object.assign(this, partial)
  }
}
