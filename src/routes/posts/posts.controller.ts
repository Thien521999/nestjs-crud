import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(APIKeyGuard)
  @Get()
  getPosts() {
    return this.postService.getPosts()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postService.createPost(body)
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
