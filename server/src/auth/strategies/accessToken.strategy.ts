import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  private readonly logger = new Logger(AccessTokenStrategy.name, {
    timestamp: true,
  });
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SERVER_SECRET as string,

    });

    if (!process.env.SERVER_SECRET) {
      this.logger.error(
        "SERVER_SECRET is not defined in the environment variables",
      );
      throw new Error("SERVER_SECRET is not defined");
    }

    this.logger.log("AccessTokenStrategy: constructor");
    this.logger.log("SERVER_SECRET:", process.env.SERVER_SECRET);
  }

  validate(payload: JwtPayload) {
    this.logger.log("AccessTokenStrategy: validate", payload);
    return payload;
  }
}
