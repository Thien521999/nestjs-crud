import {
  Body,
  Controller,
  Post,
  // SerializeOptions
} from '@nestjs/common'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    // console.log('controller...')
    return new RegisterResDTO(await this.authService.register(body))
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }
}
