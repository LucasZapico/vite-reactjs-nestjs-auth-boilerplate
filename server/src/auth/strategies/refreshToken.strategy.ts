import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { goTry } from "go-try";

type RefreshTokenPayload = {
  sub: string; // User ID or subject
  email: string; // User email
  iat?: number; // Issued at timestamp
  exp?: number; // Expiration timestamp
  [key: string]: any; // Allow additional properties if needed
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  private readonly logger = new Logger(RefreshTokenStrategy.name, {
    timestamp: true,
  });
  constructor(
    private usersService: UsersService, // Inject the UserService to access user data
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_SECRET as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
    console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    this.logger.log("RefreshTokenStrategy: payload", payload);
     const [authUserError, authUser] = await goTry(() => {
      return this.usersService.findUser({ email: payload.email });
    });
    
    if (authUserError) {
      this.logger.error("Error finding user", authUserError);
      throw new UnauthorizedException("Invalid Credentials");
    }

    this.logger.log("AuthUser found", authUser);

    if (!authUser) {
      this.logger.error("User not found");
      throw new UnauthorizedException("User not found");
    }
    this.logger.log("RefreshTokenStrategy: validate", payload);
    const refreshToken = req.headers["authorization"].split(" ")[1];

    this.logger.log(
      "RefreshTokenStrategy: validate",
      `Refresh token: ${refreshToken}`,
    );

    return { ...authUser, refreshToken };
  }
}
