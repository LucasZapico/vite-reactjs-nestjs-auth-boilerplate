import { Body, Controller, Delete, HttpCode, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto, UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async getUsers(){
    this.logger.log('Fetching all users');
    // Logic for fetching all users
    return "get all users";
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async getUser(@Body() userDto: UserDto) {
    this.logger.log('User fetched', userDto);
    return "get users"
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
