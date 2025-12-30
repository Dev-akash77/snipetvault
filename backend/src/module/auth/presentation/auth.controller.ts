import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { successMessage } from '../../../common/decorators/success-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ! CREAT USER
  @successMessage('User Registered successfully')
  @Post()
  creatUser(@Body() data: any) {
    return this.authService.register(data);
  }
  // ! GET SPECEFIC USER
  @successMessage('User Get successfully')
  @Get(':email')
   getUser(@Param('email') email:string){
    return this.authService.validateUser(email);
  }
}
