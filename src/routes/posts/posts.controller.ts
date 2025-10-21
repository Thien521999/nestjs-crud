import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.And })
  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @Post()
  @Auth([AuthType.Bearer])
  createPost(@Body() body: any, @ActiveUser('userId') userId: number) {
    return this.postService.createPost(userId, body)
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id)
  }

  @Put('id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postService.updatePost(id, body)
  }

  @Delete('id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id)
  }
}
