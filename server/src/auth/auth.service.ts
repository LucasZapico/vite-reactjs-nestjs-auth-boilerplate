import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";
import { goTry } from "go-try";
import { User } from "src/schemas/user.schema";
import { LoginDto, SignupDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private usersService: UsersService) {}
  // hansh item
  async hashData(data: string) {
    return await argon2.hash(data);
  }
  /**
   * LOGIN
   */
  async login(userDto: LoginDto) {
    this.logger.log("User logged in");
    // Logic for user login
    // hash password
    const [hashError, hashedPassword] = await goTry(() => {
      return this.hashData(userDto.password);
    });
    // check if user exists

    if (hashError) {
      this.logger.error("Error hashing password", hashError);
      throw new UnauthorizedException("Invalids Credentials");
    }
    // create user
    const user = await this.usersService.createUser(userDto);

    // const tokenPayload = {
    //   sub: user._id,
    //   email: user.email,
    //   username: user.username,
    //   role: user.role || "USER"
    // }
  }
  /**
   * LOGOUT
   */
  /**
   * SIGNUP
   */
  async signUp(signupDto: SignupDto) {
    this.logger.log("User signed up", signupDto);
    // check if user exists
    const [userExistsError, userExists] = await goTry(() => {
      return this.usersService.findUser({ email: signupDto.email });
    });


    if (userExistsError) {
      this.logger.error("Error finding user", userExistsError);
      throw new UnauthorizedException("Invalid Credentials");
    }

    // hash password


    this.logger.verbose("User does not exist");
    return this.usersService.createUser(signupDto);
  }
}
