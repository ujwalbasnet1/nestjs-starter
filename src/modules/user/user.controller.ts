import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { User } from 'src/repositories/user/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Patch(":id")
    ediUser(@Param("id") id: string, @Body() user: UpdateUserDto): Promise<User> {
        return this.userService.update(id, user);
    }
}
