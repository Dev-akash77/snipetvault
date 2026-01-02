import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { successMessage } from '../../../../../common/decorators/success-message.decorator';
import { RegisterUseCase } from '../../../application/use-cases/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  // ! CREAT USER
  @successMessage('User Registered successfully')
  @Post()
  register(@Body() data: any) {
    return this.registerUseCase.execute(data);
  }

}
