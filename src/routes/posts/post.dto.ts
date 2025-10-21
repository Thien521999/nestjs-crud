import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
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

export class CreatePostBodyDTO {
  @IsString()
  title: string

  @IsString()
  content: string
}

export class UpdatePostBodyDTO extends CreatePostBodyDTO {}
