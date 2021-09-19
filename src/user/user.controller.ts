import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }
}
