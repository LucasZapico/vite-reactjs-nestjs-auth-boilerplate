import { Body, Controller, Delete, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto, UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() userDto: SignupDto) {
    this.logger.log('User signed up');

    const user = {
      email: userDto.email,
      password: userDto.password,
      username: userDto.username,
      role: userDto?.role || 'USER',
    }

    // Logic for user signup
    return this.usersService.createUser(user);
  }

  @Post('login')
  async login() {
    this.logger.log('User logged in');
    // Logic for user login
  }

  @Delete('remove')
  async remove() {
    this.logger.log('User removed');
    // Logic for user removal
  }
  @Post('update')
  async update() {
    this.logger.log('User updated');
    // Logic for user update
  }
  @Post('forgot-password')
  async forgotPassword() {    
    this.logger.log('Password reset link sent');
    // Logic for sending password reset link
  }

}
