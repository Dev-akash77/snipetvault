import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { successMessage } from '../../../../../common/decorators/success-message.decorator';
import { RegisterUseCase } from '../../../application/usecases/register.use-case';
import { RegisterDto } from '../dtos/register.dto';
import { LoginUsecase } from '../../../application/usecases/login.use-caes';
import { LoginDto } from './../dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../../../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase,private readonly loginUseCase:  LoginUsecase) {}

  // ! CREAT USER
  @successMessage('User Registered successfully')
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  // ! Login USER
  @successMessage('User Login successfully')
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  // ! CURRENT USER DATA
@Get('profile')
  @UseGuards(AuthGuard('jwt')) // Authentication Check
  async getProfile(@CurrentUser() user: any) {
    return { message: 'This is your profile', user };

  }

}
 