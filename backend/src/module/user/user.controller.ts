import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { successMessage } from '../../common/decorators/success-message.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){};


// ! CREAT POST
@successMessage('Task created successfully') 
 @Post()
 creatUser(@Body() data:CreateTaskDto){
    return this.userService.createUser(data);
 };
// ! GET ALL POST
 @Get()
 getUser(){
    return this.userService.getUser();
 };
//  ! GET SPECIFIC POST
 @Get(":id")
 getUserById(@Param('id') id:string){
    return this.userService.getUserById(id);
 }
//  ! DELETE POST
@successMessage('Task Deleted successfully')
 @Delete(":id")
 deletePost(@Param('id') id:string){
    return this.userService.deletePost(id);
 }


}
