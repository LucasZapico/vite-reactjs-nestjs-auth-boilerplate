import {
  Post,
  HttpCode,
  Controller,
  Logger,
  HttpStatus,
  Body,
  UseGuards,
  Req,
} from "@nestjs/common";
import { LoginDto, SignupDto } from "src/users/dto/user.dto";
import { AuthService } from "./auth.service";
import { AccessTokenGuard } from "./guards/accessToken.guard";
import { Request } from "express";
import { RefreshTokenGuard } from "./guards/refreshToken.guard";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    this.logger.log("User signed up");
    const user = {
      email: signupDto.email,
      password: signupDto.password,
      username: signupDto.username,
      role: signupDto?.role || "USER",
    };

    // Logic for user signup
    return this.authService.signUp(user);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    this.logger.log("User logged in");
    // Logic for user login
    return this.authService.login(loginDto);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refreshTokens(
    @Body() loginDto: LoginDto, @Req() req: Request
  ) {
    const refreshToken = req["refreshToken"];
    this.logger.log("User refreshed tokens", req);
    // Logic for refreshing tokens
   
    return this.authService.refreshTokens(loginDto.email, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@Body() loginDto: LoginDto) {
    this.logger.log("User logged out");
    // Logic for user logout
    return this.authService.logout(loginDto);
  }
}
