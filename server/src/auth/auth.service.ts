import {
  Injectable,
  Logger,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import * as argon2 from "argon2";
import { goTry } from "go-try";
import { User } from "src/schemas/user.schema";
import { LoginDto, SignupDto } from "src/users/dto/user.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

export type TokenPayload = {
  sub: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // hansh item
  async hashData(data: string) {
    return await argon2.hash(data);
  }

  // refresh tokens
  async refreshTokens(email: string, refreshToken: string) {
    this.logger.log("refreshTokens", email, refreshToken);
    const [userExistsError, user] = await goTry(() => {
      return this.usersService.findUser({ email: email });
    });

    this.logger.log("User found", user);

    if (userExistsError) {
      this.logger.error("Error finding user", userExistsError);
      throw new UnauthorizedException("Invalid Credentials");
    }
    
    if (!user || !user.refreshToken) {
      this.logger.error("AuthService: refreshTokens: user found", user);
      throw new ForbiddenException("Access Denied");
    }

    // verify the refresh token
    this.logger.log("refresh token", refreshToken);
    this.logger.log("user refresh token", user.refreshToken, refreshToken);
    // const hashedRefreshToken = refreshToken as string
    // const refreshTokenMatches = await argon2.verify(
    //   hashedRefreshToken,
    //   user.refreshToken,
    // );

    // if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens({
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    await this.updateToken(user.id, tokens.refreshToken);
    return tokens;
  }

  /**
   * Update the refresh token for a user
   */
  async updateToken(email: string, tokens: any) {
    // TODO: does this need gotry
    // const hashedRefreshToken = await this.hashData(tokens.refreshToken);
    // const hashedAccessToken = await this.hashData(tokens.accessToken);
    // const hashedRefreshToken = refreshToken;
    // this.logger.log(
    //   "AuthService: updateRefreshToken: hashed refresh token",
    //   hashedRefreshToken,
    // );
    await this.usersService.updateUser({
      query: {
        email: email,
      },
      data: {
        $set: {
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken,
        },
      },
    });
  }

  // get tokens
  async getTokens(tokenPayload: TokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(tokenPayload, {
        secret: process.env.SERVER_SECRET,
        expiresIn: "3d",
      }),
      this.jwtService.signAsync(
        {
          sub: tokenPayload.sub,
          email: tokenPayload.email,
        },
        {
          secret: process.env.REFRESH_SECRET,
          expiresIn: "20d",
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async authenticate(input: { email: string; password: string }) {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.login({ ...user });
  }

  // TODO: align types jwtpaylog and this type
  async validateUser({ password, email }: any) {
    const user = await this.usersService.findUser({
      query: {
        email: email,
      },
    });
    return user;
  }

  /**
   * LOGIN
   */
  async login(userDto: LoginDto) {
    this.logger.log("User logged in");
    const [userExistsError, user] = await goTry(() => {
      return this.usersService.findUser({ email: userDto.email });
    });

    this.logger.log("User found", user);

    if (userExistsError) {
      this.logger.error("Error finding user", userExistsError);
      throw new UnauthorizedException("Error finding user");
    }
    if (!user) {
      this.logger.error("User does not exist");
      throw new UnauthorizedException("User does not exist");
    }

    // validate password
    const [passwordError] = await goTry(() => {
      if (!user.password) {
        this.logger.error("AuthService: login: password not found");
        throw new UnauthorizedException("Invalid credentials");
      }
      const crtPw = user.password;
      return argon2.verify(crtPw, userDto.password);
    });

    if (passwordError) {
      this.logger.error("AuthService: login: password error", passwordError);
      throw new UnauthorizedException("Invalid credentials");
    }

     const tokenPayload = {
      sub: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "USER",
    } as any;

    const [tokenErr, tokens] = await goTry(() => {
      return this.getTokens(tokenPayload);
    });
    if (tokenErr) {
      this.logger.error("AuthService: signup: token error", tokenErr);
      throw new UnauthorizedException("Invalid credentials");
    }
    const [updateRefreshToeknErr] = await goTry(() => {
      return this.updateToken(user.email, tokens);
    });
    if (updateRefreshToeknErr) {
      this.logger.error(
        "signup: update refresh token error",
        updateRefreshToeknErr,
      );
      throw new UnauthorizedException("Invalid credentials");
    }

    return { user, ...tokens };
  }
  /**
   * LOGOUT
   */
  async logout(userDto: LoginDto) {
    const [userExistsError, user] = await goTry(() => {
      return this.usersService.findUser({ email: userDto.email });
    });

    this.logger.log("User found", user);

    if (userExistsError) {
      this.logger.error("Error finding user", userExistsError);
      throw new UnauthorizedException("Error finding user");
    }
    if (!user) {
      this.logger.error("User does not exist");
      throw new UnauthorizedException("User does not exist");
    }
    return this.usersService.updateUser({
      query: { email: userDto.email },
      data: { refreshToken: null, accessToken: null },
    });
  }

  /**
   * SIGNUP
   */
  async signUp(signUpDto: SignupDto) {
    this.logger.log("User signed up", signUpDto);
    // check if user exists
    const [userExistsError, userExists] = await goTry(() => {
      return this.usersService.findUser({ email: signUpDto.email });
    });

    if (userExists) {
      this.logger.error("Error finding user", userExistsError);
      throw new UnauthorizedException("user already exists");
    }

    // hash password
    this.logger.log("password check", signUpDto.password);

    // hash password
    const [hashError, hashedPassword] = await goTry(() => {
      return this.hashData(signUpDto.password);
    });
    this.logger.log("hashed password", hashedPassword);
    if (hashError) {
      this.logger.error("signup: hash error", hashError);
      throw new UnauthorizedException("Invalid credentials");
    }

    this.logger.verbose("User does not exist");
    const [createUserError, user] = await goTry(() => {
      return this.usersService.createUser({
        ...signUpDto,
        password: hashedPassword,
      });
    });
    if (createUserError) {
      this.logger.error(
        "AuthService: signup: create user error",
        createUserError,
      );
      throw new UnauthorizedException("Invalid credentials");
    }
    this.logger.log("User created", user);
    const tokenPayload = {
      sub: user._id,
      email: user.email,
      username: user.username,
      role: user.role || "USER",
    } as any;

    const [tokenErr, tokens] = await goTry(() => {
      return this.getTokens(tokenPayload);
    });
    if (tokenErr) {
      this.logger.error("AuthService: signup: token error", tokenErr);
      throw new UnauthorizedException("Invalid credentials");
    }
    const [updateRefreshToeknErr] = await goTry(() => {
      return this.updateToken(user.email, tokens);
    });
    if (updateRefreshToeknErr) {
      this.logger.error(
        "signup: update refresh token error",
        updateRefreshToeknErr,
      );
      throw new UnauthorizedException("Invalid credentials");
    }

    return { user, ...tokens };
  }
}
