import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){};


// ! CREAT POST
 @Post()
 creatUser(@Body() data:any){
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
 @Delete(":id")
 deletePost(@Param('id') id:string){
    return this.userService.deletePost(id);
 }


}
