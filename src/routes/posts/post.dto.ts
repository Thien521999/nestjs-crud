import { Type } from 'class-transformer'
import { PostModal } from 'src/shared/models/post.model'
import { UserModal } from 'src/shared/models/user.model'

export class GetPostItemDTO extends PostModal {
  @Type(() => UserModal)
  author: Omit<UserModal, 'password'>

  constructor(partial: Partial<GetPostItemDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}
