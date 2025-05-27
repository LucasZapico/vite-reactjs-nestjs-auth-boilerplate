import { Post, HttpCode, Controller, Logger, HttpStatus, Body } from '@nestjs/common';
import { SignupDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authSerice: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signup(@Body() SignupDto: SignupDto) {
        this.logger.log('User signed up');
        // Logic for user signup
        return this.authSerice.signUp(SignupDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login() { 
        this.logger.log('User logged in');
        // Logic for user login
    }
}
