import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto, UserDto } from './dto/user.dto';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async getUsers(@Body() data: any){
    this.logger.log('Fetching all users');
    // Logic for fetching all users
    return this.usersService.getUsers(data);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post("profile")
  async getUser(@Body() userDto: UserDto) {
    this.logger.log('User fetched', userDto);
    return this.usersService.findUser({ email: userDto.email });
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
