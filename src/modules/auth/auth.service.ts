import { Injectable, Logger } from '@nestjs/common';
import { FieldError } from 'src/error-handler/field-exception';
import { UserRepository } from 'src/repositories/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository) { }

  register(registerDto: RegisterDto) {
    return this.userRepository.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ email: loginDto.email });

    if (!user)
      throw new FieldError({ email: 'Email number not found. Please register first.' });


    return {
      message: 'User logged',
    };

  }

}
