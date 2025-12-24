import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserController],
  imports:[DatabaseModule],
  providers: [UserService] 
})
export class UserModule {}
